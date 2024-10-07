using API;
using Core.Repository;
using Infrastructure.Data;
using Infrastructure.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register application services
builder.Services.AddApplicationServices();

// Configure DbContext
builder.Services.AddDbContext<DataContext>(options =>
    options
        .UseLazyLoadingProxies()
        .UseMySql(
            builder.Configuration.GetConnectionString("DefaultConnection"),
            new MySqlServerVersion(new Version(8, 0, 21))
        )
);

// Register generic repository
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddControllers();

// Register AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile));

// Add CORS policy to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
        }
    );
});

// Add session support
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.None; // Allow cross-origin cookies
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Set to Always to meet SameSite=None requirements
    options.IdleTimeout = TimeSpan.FromMinutes(30);
});

// Configure authentication and OAuth2 for Discord
builder
    .Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = "Discord";
    })
    .AddCookie(options =>
    {
        options.Cookie.SameSite = SameSiteMode.None;
        options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    });

var app = builder.Build();

// Apply pending migrations on startup
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<DataContext>();
    dbContext.Database.Migrate(); // Applies any pending migrations
}

// Exception handling
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();

    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Pas d'emploi API v1");
        c.RoutePrefix = string.Empty; // Swagger UI at root
    });
}
else
{
    app.UseExceptionHandler("/error"); // Global error handling middleware
    app.UseHsts();
}

// HTTPS redirection and static files
app.UseHttpsRedirection();
app.UseStaticFiles();

// Routing
app.UseRouting();

// CORS
app.UseCors("AllowFrontend"); // Apply CORS policy after routing

// Authentication and Authorization
app.UseAuthentication();
app.UseAuthorization();

// Session
app.UseSession(); // Enable session management

// Endpoint mapping
app.MapControllers();

app.Run();
