namespace API.Extensions
{
    public static class MiddlewareExtensions
    {
        public static void ConfigureMiddleware(
            this IApplicationBuilder app,
            IWebHostEnvironment env
        )
        {
            // Exception handling
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
                    c.RoutePrefix = string.Empty;
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

            // Apply CORS before routing
            app.UseCustomCors("AllowFrontend");

            // Routing
            app.UseRouting();

            // Authentication and Authorization
            app.UseAuthentication();
            app.UseAuthorization();

            // Session
            app.UseSession(); // Enable session management

            // Endpoint mapping
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        public static void UseCustomCors(this IApplicationBuilder app, string policyName)
        {
            app.UseCors(policyName); // Apply CORS policy
        }
    }
}
