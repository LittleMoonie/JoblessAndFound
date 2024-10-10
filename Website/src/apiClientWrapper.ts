// apiClientWrapper.tsx
import { LoginRequestDTO, UserDTO } from "./API/Api";

class ApiClientWrapper {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
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
        const data = await response.json();
        return data; // { message: "Logged in successfully." }
      } else {
        const errorData = await response.json();
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
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const data = await response.json();
        return data; // { message: "Logout successful." }
      } else {
        const errorData = await response.json();
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
        credentials: 'include', // Include cookies in the request
      });

      if (response.ok) {
        const data: UserDTO = await response.json();
        return data;
      } else if (response.status === 401) {
        // Unauthorized, possibly redirect to login
        return null;
      } else {
        const errorData = await response.json();
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
