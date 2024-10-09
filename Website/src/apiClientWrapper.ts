import { Api, LoginRequestDTO } from "./API/Api";


class ApiClientWrapper {
  private apiClient: Api<unknown>;

  constructor(baseUrl: string) {
    this.apiClient = new Api<unknown>({ baseUrl });
  }

  async authentication_login(email: string, password: string) {
    const data: LoginRequestDTO = {
      email,
      password,
    };

    // Since authenticationLoginCreate returns a promise, we just await it here and return the result.
    return await this.apiClient.api.authenticationLoginCreate(data);
  }

  async authentication_logout() {
    return await this.apiClient.api.authenticationLogoutCreate();
  }

  async authentication_status() {
    return await this.apiClient.api.authenticationStatusList();
  }

  // Add more methods here to wrap other API calls...
}

const apiClientWrapper = new ApiClientWrapper('https://localhost:5001');
export default apiClientWrapper;
