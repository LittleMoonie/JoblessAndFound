// Program.cs
using System.Reflection;
using System.Text;
using API;
using API.Extensions; // Namespace for service extensions like AddCustomServices
using API.Middleware;
using AspNetCoreRateLimit;
using Infrastructure.Services.Authentifaction;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Register IP rate limiting and other services
builder.Services.AddOptions();
builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.Configure<IpRateLimitPolicies>(
    builder.Configuration.GetSection("IpRateLimitingPolicies")
);
builder.Services.AddInMemoryRateLimiting();
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();

// Register application services
builder.Services.AddCustomServices(builder.Configuration); // Calls AddCustomServices method from Extensions folder

// Register CORS, Session, and other services
builder.Services.AddCustomCors(
    "AllowFrontendOrigin",
    "http://localhost:3000",
    "https://localhost:3000"
);
builder.Services.AddCustomSession();

// Register IHttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Add JWT Authentication
builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        // JWT Configuration
        var jwtKey = builder.Configuration["JwtSettings:Key"];
        var jwtIssuer = builder.Configuration["JwtSettings:Issuer"];
        var jwtAudience = builder.Configuration["JwtSettings:Audience"];

        if (
            string.IsNullOrEmpty(jwtKey)
            || string.IsNullOrEmpty(jwtIssuer)
            || string.IsNullOrEmpty(jwtAudience)
        )
        {
            throw new InvalidOperationException(
                "JWT settings are not configured correctly in appsettings or environment variables."
            );
        }

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
        };

        // Read JWT token from the "Authorization" cookie
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var token = context.Request.Cookies["Authorization"];
                if (!string.IsNullOrEmpty(token))
                {
                    context.Token = token;
                }
                return Task.CompletedTask;
            },
        };
    });

// Register Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy(
        "AdminPolicy",
        policy =>
        {
            policy.RequireClaim("UserTypeId", "4"); // Allow only users with UserTypeId = 4
        }
    );

    options.AddPolicy(
        "UserPolicy",
        policy =>
        {
            policy.RequireClaim("UserTypeId", "1", "2", "3"); // Allow regular users with UserTypeId 1, 2, or 3
        }
    );
});

// Register Swagger Configuration
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "JWT Authorization header using the Bearer scheme.",
        }
    );
    c.AddSecurityRequirement(
        new OpenApiSecurityRequirement
        {
            {
                new OpenApiSecurityScheme
                {
                    Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer",
                    },
                },
                Array.Empty<string>()
            },
        }
    );
});

var app = builder.Build();

// Apply pending migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<Infrastructure.Data.DataContext>();
    dbContext.Database.Migrate();
}

app.UseRouting();

// Apply CORS before authentication
app.UseCors("AllowFrontendOrigin");

// Apply authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

// Enable Swagger (in development only)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Jobless & Found V1");
        c.RoutePrefix = string.Empty; // Swagger UI will be available at the root
    });

    app.UseDeveloperExceptionPage(); // Enable detailed error pages
}

app.UseMiddleware<ApiResponseMiddleware>();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    Console.WriteLine("Registered endpoints:");
    foreach (var endpoint in endpoints.DataSources.SelectMany(source => source.Endpoints))
    {
        Console.WriteLine($" - {endpoint.DisplayName}");
    }
});

app.Run();
