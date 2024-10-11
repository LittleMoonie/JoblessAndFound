import { UserDTO } from "../API/Api";

// src/Router/apiClientWrapper.tsx
class ApiClientWrapper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Helper function to safely handle JSON parsing
  private async parseJSON(response: Response) {
    try {
      // Check if the response has content before attempting to parse
      const contentLength = response.headers.get("content-length");
      const contentType = response.headers.get("content-type");

      // If content-length is 0 or status is 204, no content to parse
      if (contentLength === "0" || response.status === 204) {
        return null; // No content to parse
      }

      // Parse JSON only if content-type is application/json
      if (contentType && contentType.includes("application/json")) {
        const jsonData = await response.json(); // Parse the JSON
        console.log("Parsed JSON response:", jsonData); // Debug log
        return jsonData;
      }

      console.error("Invalid content type or empty response.");
      return null;
    } catch (error) {
      console.error("Failed to parse JSON response:", error);
      return null;
    }
  }

  async authentication_login(email: string, password: string): Promise<{ message: string } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/authentication/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies in the request
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log("Login successful. No JSON body to parse.");
        return { message: "Logged in successfully." }; // Return a default message
      } else {
        const errorData = await this.parseJSON(response);
        console.error('Login Error:', errorData);
        return null;
      }
    } catch (error) {
      console.error('Login Exception:', error);
      return null;
    }
  }

  async authentication_logout(): Promise<{ message: string } | null> {
    try {
      const response = await fetch(`${this.baseUrl}/authentication/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        console.log("Logout successful. No JSON body to parse.");
        return { message: "Logout successful." }; // Return a default message
      } else {
        const errorData = await this.parseJSON(response);
        console.error('Logout Error:', errorData);
        return null;
      }
    } catch (error) {
      console.error('Logout Exception:', error);
      return null;
    }
  }

  async authentication_status(): Promise<UserDTO | null> {
    try {
      const response = await fetch(`${this.baseUrl}/authentication/status`, {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        console.log("Status check successful. No JSON body to parse.");
        return { message: "User is authenticated." } as unknown as UserDTO; // Return a default response or null
      } else if (response.status === 401) {
        // Unauthorized, possibly redirect to login
        console.warn('Unauthorized access.');
        return null;
      } else {
        const errorData = await this.parseJSON(response);
        console.error('Status Error:', errorData);
        return null;
      }
    } catch (error) {
      console.error('Status Exception:', error);
      return null;
    }
  }

  // Add more methods here to wrap other API calls...
}

const apiClientWrapper = new ApiClientWrapper('http://localhost:5000/api');
export default apiClientWrapper;
