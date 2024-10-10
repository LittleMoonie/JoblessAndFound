# Prerequisites

Before setting up the API solution, ensure that your development environment meets the following requirements.

## Software Requirements

- **.NET 6 SDK or later**
  - Download from [Official .NET Website](https://dotnet.microsoft.com/download)

- **Visual Studio 2022 or later** (or any preferred IDE)
  - Download from [Visual Studio Downloads](https://visualstudio.microsoft.com/downloads/)

- **MySQL Server**
  - Download from [MySQL Downloads](https://dev.mysql.com/downloads/mysql/)

- **Node.js** (if frontend setup is required)
  - Download from [Node.js Official Site](https://nodejs.org/)

- **Git**
  - Download from [Git Downloads](https://git-scm.com/downloads)

## Tools and Extensions

- **Postman** (for API testing)
  - Download from [Postman Official Site](https://www.postman.com/downloads/)

- **Visual Studio Extensions** (optional but recommended)
  - **C# Extensions**
  - **.NET Core Tools**

## Environment Variables

Ensure that the following environment variables are set:

- `DB_USER`: Your MySQL database username
- `DB_PASSWORD`: Your MySQL database password
- `JWT_KEY`: Secret key for JWT authentication
- `JWT_ISSUER`: Issuer for JWT
- `JWT_AUDIENCE`: Audience for JWT

You can set these variables in your system settings or use a `.env` file in the project root (ensure it's added to `.gitignore`).

---

Once all prerequisites are met, proceed to the [Setup](Setup.md) section.
