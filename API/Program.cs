using API;
using API.Extensions;
using AspNetCoreRateLimit;
using Infrastructure.Services.Authentifaction;
using Microsoft.EntityFrameworkCore;

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
builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddCustomCors("AllowFrontend", "http://localhost:3000");
builder.Services.AddCustomSession();
builder.Services.AddCustomAuthentication(builder.Configuration);

// Register the KeyRotationService
builder.Services.AddHostedService<KeyRotationService>(); // This should be a singleton

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply pending migrations
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<Infrastructure.Data.DataContext>();
    dbContext.Database.Migrate();
}

// Middleware configuration
app.ConfigureMiddleware(app.Environment);
app.UseCustomCors("AllowFrontend");
app.UseIpRateLimiting();

app.Run();
