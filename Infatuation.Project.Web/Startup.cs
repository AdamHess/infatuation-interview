using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Infatuation.Foundation.LocalServiceClient;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Octokit;

namespace Infatuation.Project.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddResponseCaching();
            services.AddControllersWithViews();

            services.AddTransient<LocalServiceClient>(m =>
            {
                var logger = m.GetService<ILogger<LocalServiceClient>>();
                return new LocalServiceClient(m.GetRequiredService<IConfiguration>()["LocalServiceUrl"], logger);

            });

            services.AddSingleton(m =>
            {
                var cred = new Credentials((m.GetRequiredService<IConfiguration>()["GitAccessToken"]));
                var client = new GitHubClient(new ProductHeaderValue("InfatSampleApp"))
                {
                    Credentials = cred
                };
                return client;

            });
            services.AddRazorPages().AddRazorRuntimeCompilation();

            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new GithubMappingProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseResponseCaching();
            app.UseRouting();

            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
