using MarkdownNotesApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://jolly-cliff-05f03e503.2.azurestaticapps.net")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<SelfMigrationHelper>();
//In memory implementation
//builder.Services.AddDbContext<NotesApiDbContext>(options => options.UseInMemoryDatabase("NotesDb"));

//Sql server implementation
//builder.Services.AddDbContext<NotesApiDbContext>(options => 
//    options.UseSqlServer(builder.Configuration.GetConnectionString("NotesApiConnectionString")));

//Sqlite database implementation
builder.Services.AddDbContext<NotesApiDbContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("NotesApiConnectionString")));



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var selfMigrationHelper = services.GetRequiredService<SelfMigrationHelper>();
        var db = services.GetRequiredService<NotesApiDbContext>();
        selfMigrationHelper.Migrate<NotesApiDbContext>(app);
        db.Database.EnsureCreated();
    }
    catch (Exception e)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(e, "An error occurred while seeding the database.");
    }
}


app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
