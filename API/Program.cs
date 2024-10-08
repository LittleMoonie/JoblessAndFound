using API.Extensions;
using API.Extensions.API.Extensions;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register services using extension methods
builder.Services.AddCustomServices(builder.Configuration);
builder.Services.AddCustomCors("AllowFrontend", "http://localhost:3000");
builder.Services.AddCustomSession();
builder.Services.AddCustomAuthentication();

builder.Services.AddControllers();
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
app.UseCustomCors("AllowFrontend");

app.Run();
