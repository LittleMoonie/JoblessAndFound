# Setup

Follow these steps to set up the API solution on your local machine.

## 1. Clone the Repository

First, clone the repository to your local machine using Git.

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository
```

## 2. Install Dependencies
.NET Dependencies
Ensure all necessary NuGet packages are installed. You can restore them using the following command:

```bash
dotnet restore
```

Node.js Dependencies (if applicable)
If your project includes a frontend, navigate to the frontend directory and install dependencies:

```bash
cd frontend
npm install
cd ..
```

## 3. Configure Environment Variables
Create a .env file in the root directory of the project and populate it with the required environment variables:

```plaintext
DB_USER=your_db_username
DB_PASSWORD=your_db_password
JWT_KEY=your_jwt_secret_key
JWT_ISSUER=http://localhost
JWT_AUDIENCE=JobApplication
```
Note: Ensure that the .env file is listed in .gitignore to prevent sensitive information from being committed to version control.

## 4. Setup the Database
Using MySQL
Create Database:

Log into your MySQL server and create a new database:
```sql
CREATE DATABASE testingdb;
```

# Migrations
Migrations allow you to create and manage the database schema using code. Run the following command to create a new migration.

Create Migrations:
```bash
EntityFrameworkCore\Add-Migration InitialCreate -Context DataContext
```

Apply Migrations:
Navigate to the project root and run the following commands to apply database migrations (in our case it is in Infrastructure):

```bash
dotnet ef database update
```
Note: Ensure that the connection string in appsettings.json correctly references your MySQL server and credentials.

## 5. Build the Project
Build the project to ensure all dependencies are correctly installed and there are no compilation errors.

```bash
dotnet build
```

## 6. Running the Application
Once the setup is complete, you can run the application using:

```bash
dotnet run
```
The API should now be running at https://localhost:5001 or the specified port in your configuration.

Proceed to Project Structure to understand the organization of the project files.
---

### Project_Structure.md


# Project Structure

Understanding the project structure is crucial for navigating and maintaining the API solution. Below is an overview of the key directories and files.

your-repository/
                |── API/
                │   ├── Controllers/
                │   │   └── Authentification/
                │   │       └── AuthenticationController.cs
                │   ├── Extensions/
                │   │   ├── MiddlewareExtensions.cs
                |   |   └── ServiceExtensions.cs
                │   ├── Middleware/
                │   │   ├── ApiResponseMiddleware.cs
                │   │   └── CustomMiddleware.cs
                │   ├── Program.cs
                │   └── appsettings.json
                ├── Infrastructure/
                │   ├── Services/
                │   │   ├── Authentifaction/
                │   │   │   └── IAuthenticationService.cs
                │   │   └── IServices/
                │   │       └── Authentification/
                │   ├── Data/
                │   │   └── DataContext.cs
                │   ├── Mapping/
                |   |   └── Mapping.cs
                │   ├── Repository/
                │   │   └── Repository.cs
                │   └── DTO/
                │       └── Authentication/
                │           └── LoginRequestDTO.cs
                |   ├── Migrations/
                ├── Core/
                │   └── [Entities, Enums, Constants]
                │   ├── Exceptions/
                |   |   └── NotFoundException.cs
                │   ├── Mapping/
                |   |   └── IMapping.cs
                │   ├── Repository/
                |   |   └── IRepository.cs


## Key Components

- **API/**: Contains all API-related code, including controllers, middleware, extensions, and configuration files.
  
  - **Controllers/**: Houses the API controllers that handle HTTP requests.
  
  - **Middleware/**: Custom middleware classes that handle request and response processing.
  
  - **Extensions/**: Extension methods for configuring services and middleware.
  
  - **Program.cs**: The main entry point of the application.
  
  - **appsettings.json**: Configuration file for application settings.

- **Infrastructure/**: Contains core services, data access layers, mappings, repositories, and DTOs.
  
  - **Services/**: Business logic and service interfaces.
  
  - **Data/**: Database context and migrations.
  
  - **Mapping/**: AutoMapper profiles for object-object mapping.
  
  - **Repository/**: Generic repository implementations.
  
  - **DTO/**: Data Transfer Objects for API requests and responses.

  - **Migrations/**: Contains database migration files.

- **Core/**: Contains core entities, enums, constants, exceptions, mappings, and repository interfaces.
    
  - **Exceptions/**: Custom exception classes.
      
  - **Mapping/**: Interfaces for object-object mapping.
      
  - **Repository/**: Repository interfaces for data access.

## Additional Directories

- **Tests/**: Contains unit and integration tests.

- **.env**: Environment variables file (ensure it's in `.gitignore`).

---

With the project structure outlined, let's delve into the specific configurations and components in the subsequent sections.
