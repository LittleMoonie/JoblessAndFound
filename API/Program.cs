using API;
using API.Extensions;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register services using extension methods
builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddApplicationServices(); // Ensure application services are included
builder.Services.AddCustomCors("AllowFrontend", "http://localhost:3000");
builder.Services.AddCustomSession();
builder.Services.AddCustomAuthentication();

builder
    .Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System
            .Text
            .Json
            .Serialization
            .ReferenceHandler
            .Preserve;
        options.JsonSerializerOptions.MaxDepth = 64; // Adjust as necessary
    });

builder.Services.AddSwaggerGen();

var app = builder.Build();

// Apply pending migrations on startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dbContext.Database.Migrate(); // Applies any pending migrations
}

// Use custom middleware extensions
app.ConfigureMiddleware(app.Environment);
app.UseCustomCors("AllowFrontend"); // Ensure CORS is applied before routing

app.Run();
