// src/API/generateApiClient.ts

import { Project, SyntaxKind, ParameterDeclaration, InterfaceDeclaration, PropertyAssignment } from "ts-morph";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Utility function to convert CamelCase or PascalCase to snake_case
 * @param str The string to convert
 * @returns The converted snake_case string
 */
function toSnakeCase(str: string): string {
  return str
    .replace(/([A-Z])/g, '_$1') // Insert underscore before capital letters
    .replace(/__/g, '_')         // Replace double underscores with single
    .replace(/^_/, '')           // Remove leading underscore if present
    .toLowerCase();
}

// Recreate __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirnameESM = dirname(__filename);

// Path to your generated Api.ts
const apiPath = path.resolve(__dirnameESM, "Api.ts");

// Initialize ts-morph Project with the correct tsconfig.json path
const project = new Project({
  tsConfigFilePath: path.resolve(__dirnameESM, "../../tsconfig.json"),
});

// Add and parse Api.ts
const source = project.addSourceFileAtPath(apiPath);

// Extract the Api class
const apiClass = source.getClass("Api");
if (!apiClass) {
  throw new Error("Api class not found in Api.ts");
}

// Extract the 'api' property
const apiProperty = apiClass.getProperty("api");
if (!apiProperty) {
  throw new Error("'api' property not found in Api class");
}

// Get the initializer of the 'api' property (the object containing API methods)
const initializer = apiProperty.getInitializer();
if (!initializer || !initializer.isKind(SyntaxKind.ObjectLiteralExpression)) {
  throw new Error("The 'api' property is not initialized with an object literal");
}

const apiObject = initializer.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);

// Prepare to collect API methods
interface ApiMethod {
  originalName: string;      // Original method name from Api.ts (e.g., 'authenticationLoginCreate')
  simplifiedName: string;    // Simplified snake_case name (e.g., 'authentication_login')
  endpoint: string;
  method: string;
  parameters: { name: string; type: string }[];
  returnType: string;
}

const apiMethods: ApiMethod[] = [];

// Helper function to extract fields from 'data' parameter if it's an object
function extractDataFields(params: ParameterDeclaration[]): { name: string; type: string }[] {
  const dataParam = params.find(param => param.getName() === 'data');
  if (!dataParam) return [];

  const dataType = dataParam.getType().getSymbol()?.getName();
  if (!dataType) return [];

  // Find the interface declaration for the dataType
  const interfaceDecl = dataParam.getType().getSymbol()?.getDeclarations().find(decl => decl.getKind() === SyntaxKind.InterfaceDeclaration) as InterfaceDeclaration | undefined;
  if (!interfaceDecl) return [];

  return interfaceDecl.getProperties().map(prop => ({
    name: prop.getName(),
    type: prop.getType().getText(),
  }));
}

// Collect methods from the 'api' object
apiObject.getProperties().forEach((prop) => {
  if (prop.getKind() === SyntaxKind.PropertyAssignment) {
    const propAssignment = prop.asKindOrThrow(SyntaxKind.PropertyAssignment);
    const propName = propAssignment.getName(); // e.g., 'authenticationLoginCreate'
    const simplifiedName = toSnakeCase(propName); // e.g., 'authentication_login_create'

    const initializer = propAssignment.getInitializerIfKind(SyntaxKind.ArrowFunction);
    if (!initializer) return; // Skip if not an ArrowFunction

    const arrowFunc = initializer.asKindOrThrow(SyntaxKind.ArrowFunction);
    const params = arrowFunc.getParameters();

    // Extract data fields if 'data' parameter exists
    const dataFields = extractDataFields(params);

    // Construct the list of parameters for the client function
    let clientParams: { name: string; type: string }[] = [];

    if (dataFields.length > 0) {
      clientParams = clientParams.concat(dataFields);
    } else {
      // If no 'data' parameter, use existing parameters except 'params'
      clientParams = params
        .filter(param => param.getName() !== 'params')
        .map(param => ({
          name: param.getName(),
          type: param.getType().getText(),
        }));
    }

    const returnType = arrowFunc.getReturnType().getText();

    // Extract endpoint and HTTP method from the Api.ts request method
    // This requires parsing the body of the arrow function to extract 'path' and 'method'

    const body = arrowFunc.getBody();
    let endpoint = '';
    let httpMethod = '';

    if (body.getKind() === SyntaxKind.Block) {
      // If the arrow function has a block body
      const returnStatement = body.getFirstDescendantByKind(SyntaxKind.ReturnStatement);
      if (returnStatement) {
        const argument = returnStatement.getExpression();
        if (argument && argument.getKind() === SyntaxKind.ObjectLiteralExpression) {
          const objLiteral = argument.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
          const pathProperty = objLiteral.getProperty("path");
          const methodProperty = objLiteral.getProperty("method");
          if (pathProperty && pathProperty.getKind() === SyntaxKind.PropertyAssignment) {
            endpoint = (pathProperty as PropertyAssignment).getInitializer()?.getText().replace(/['"`]/g, '') || '';
          }
          if (methodProperty && methodProperty.getKind() === SyntaxKind.PropertyAssignment) {
            const methodInitializer = (methodProperty as unknown as ParameterDeclaration).getInitializer();
            if (methodInitializer) {
              httpMethod = methodInitializer.getText().replace(/['"`]/g, '');
            }
          }
        }
      }
    }

    // If not found in block body, try expression body
    if (!endpoint || !httpMethod) {
      if (body.getKind() === SyntaxKind.CallExpression) {
        const callExpr = body.asKindOrThrow(SyntaxKind.CallExpression);
        const args = callExpr.getArguments();
        args.forEach((arg) => {
          if (arg.getKind() === SyntaxKind.ObjectLiteralExpression) {
            const objLiteral = arg.asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
            const pathProperty = objLiteral.getProperty("path");
            const methodProperty = objLiteral.getProperty("method");
            if (pathProperty && pathProperty.getKind() === SyntaxKind.PropertyAssignment) {
              endpoint = (pathProperty as PropertyAssignment).getInitializer()?.getText().replace(/['"`]/g, '') || '';
            }
            if (methodProperty && methodProperty.getKind() === SyntaxKind.PropertyAssignment) {
              httpMethod = (methodProperty as PropertyAssignment).getInitializerIfKind(SyntaxKind.StringLiteral)?.getText().replace(/['"`]/g, '') || '';
            }
          }
        });
      }
    }

    // If still not found, skip this method
    if (!endpoint || !httpMethod) {
      console.warn(`Could not extract endpoint or HTTP method for ${propName}. Skipping.`);
      return;
    }

    // Further simplify the method name by removing trailing verbs like 'Create', 'List', etc.
    const simplifiedBaseName = simplifiedName
      .replace(/_create$/, '')
      .replace(/_list$/, '')
      .replace(/_get$/, '')
      .replace(/_update$/, '')
      .replace(/_delete$/, '');

    // Update the simplifiedName to be consistent
    const finalSimplifiedName = simplifiedBaseName;

    apiMethods.push({
      originalName: propName,
      simplifiedName: finalSimplifiedName,
      endpoint,
      method: httpMethod.toUpperCase(),
      parameters: clientParams,
      returnType,
    });
  }
});

// Generate apiClient.tsx content
let apiClientContent = `/* eslint-disable */
/* tslint:disable */
/*
 * This file was automatically generated by generateApiClient.ts
 */

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'; // Adjust the base URL as necessary

// Helper function to safely handle JSON parsing
async function parseJSON(response: Response) {
  try {
    const contentLength = response.headers.get("content-length");
    const contentType = response.headers.get("content-type");

    if (contentLength === "0" || response.status === 204) {
      return null;
    }

    if (contentType && contentType.includes("application/json")) {
      const jsonData = await response.json();
      return jsonData;
    }

    // If content type is not JSON, return the text
    const textData = await response.text();
    console.error("Non-JSON response:", textData);
    return textData;
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    return null;
  }
}

// Function to get the auth token (if using token-based auth)
async function getAuthToken(): Promise<string | null> {
  return localStorage.getItem('authToken');
}
`;

// Generate functions
apiMethods.forEach((method) => {
  const { simplifiedName, endpoint, method: httpMethod, parameters, returnType } = method;

  const expectsBody = ['POST', 'PUT', 'PATCH'].includes(httpMethod);

  // Construct parameter list for the function
  const paramList = parameters.map((p) => `${p.name}: ${p.type}`).join(", ");

  // Construct body content if needed
  let bodyContent = '';
  if (expectsBody) {
    const paramNames = parameters.map((p) => p.name);
    bodyContent = `
      body: JSON.stringify({ ${paramNames.join(", ")} }),
    `;
  }

  // Determine the return type
  const cleanReturnType = returnType.startsWith("Promise<")
    ? returnType.substring(8, returnType.length - 1)
    : returnType;

  // For token-based auth, include Authorization header
  const authHeader = `
    const token = await getAuthToken();
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = \`Bearer \${token}\`;
    }
  `;

  // For GET requests, 'body' is not needed
  if (!expectsBody) {
    bodyContent = '';
  }

  apiClientContent += `
  /**
   * ${simplifiedName}
   */
  async function ${simplifiedName}(${paramList}): Promise<${cleanReturnType} | null> {
    try {
      ${authHeader}
      const response = await fetch(\`\${baseUrl}${endpoint}\`, {
          method: '${httpMethod}',
          headers,
          credentials: 'include',
          ${bodyContent}
      });
  
      if (response.ok) {
        // Handle different return types based on your API's response
        if (response.status === 204) { // No Content
          return null; // Or any default value you prefer
        }
        const responseData = await parseJSON(response); // Expecting the direct response
        return responseData; // Return the response directly
      } else {
        const errorData = await parseJSON(response);
        console.error(\`${simplifiedName} Error: \${response.status} \${response.statusText}\`, errorData);
        return null;
      }
    } catch (error) {
      console.error('${simplifiedName} Exception:', error);
      return null;
    }
  }
  `;
  
});

// Export all functions as an object
apiClientContent += `
export default {
  ${apiMethods.map((method) => method.simplifiedName).join(",\n  ")},
};
`;

// Format the generated code using Prettier
let formattedContent: string;
try {
  formattedContent = await prettier.format(apiClientContent, {
    parser: "typescript",
    singleQuote: true,
    trailingComma: "all",
  });
} catch (error) {
  console.error("Error formatting the generated code with Prettier:", error);
  throw error;
}

// Write to apiClient.tsx
const outputPath = path.resolve(__dirnameESM, "apiClient.tsx");
fs.writeFileSync(outputPath, formattedContent);

console.log("apiClient.tsx has been generated successfully.");
