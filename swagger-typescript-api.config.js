module.exports = {  
    // Path to the output directory
    output: "./src/API",
  
    // TypeScript HTTP client to generate (axios or fetch)
    httpClientType: "fetch",
  
    // Generate only types (without client)
    generateClient: true,
  
    // Override spec
    override: {
      mutator: {
        // Path to custom axios or fetch wrapper
        path: './src/utils/customHttp.ts',
        name: 'customHttp'
      },
    },
  
    // Ignore SSL certificate errors (useful for local development)
    httpOptions: {
      verifySsl: false,
    },
  
    // Use modular imports
    modular: true,
  
    // Add prettier config
    prettier: true,
  };
  