using System.Reflection;
using System.Text;
using API.Extensions; // Namespace for service extensions like AddCustomServices
using API.Middleware;
using AspNetCoreRateLimit;
using Infrastructure.Services.IServices.Authentification;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
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

// Register IP rate limiting and other services (optional)
builder.Services.AddOptions();
builder.Services.AddCustomServices(builder.Configuration); // Calls AddCustomServices method from Extensions folder

// Register CORS, Session, and other services
builder.Services.AddCustomCors(
    "AllowFrontendOrigin",
    "http://localhost:3000", // For frontend in development mode (HTTP)
    "https://localhost:3000" // In case you're using HTTPS in development
);

builder.Services.AddCustomSession(); // Optional, for adding session management

// Register IHttpContextAccessor for accessing HTTP context in services
builder.Services.AddHttpContextAccessor();

// Add JWT Authentication
var jwtSettings = builder.Configuration.GetSection("Jwt");

builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"], // Use the issuer from appsettings.json
            ValidAudience = jwtSettings["Audience"], // Use the audience from appsettings.json
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtSettings["Key"])
            ) // Use the key from appsettings.json
            ,
        };

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

builder.Services.AddAuthorization();

// Register Authorization Policies
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminPolicy", policy => policy.RequireClaim("UserTypeId", "4")); // Allow only users with UserTypeId = 4
    options.AddPolicy("UserPolicy", policy => policy.RequireClaim("UserTypeId", "1", "2", "3")); // Allow regular users with UserTypeId 1, 2, or 3
});

// Register Swagger Configuration (optional)
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    c.AddSecurityDefinition(
        "Bearer",
        new OpenApiSecurityScheme
        {
            Name = "Authorization",
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Description = "Enter 'Bearer' followed by your JWT token in the text input below.",
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
                new string[] { }
            },
        }
    );
});

var app = builder.Build();

// Apply pending migrations if applicable
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<Infrastructure.Data.DataContext>();
    dbContext.Database.Migrate();
}

// Configure the HTTP request pipeline
app.UseRouting();

// Apply CORS before authentication and authorization
app.UseCors("AllowFrontendOrigin"); // Must come before UseAuthentication and UseAuthorization

// Add authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

// Enable Swagger in development mode
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

// Add your custom middlewares after authentication/authorization
app.UseMiddleware<JwtCookieMiddleware>();

// Configure the endpoints
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers(); // Map your controllers
});
app.Run();
