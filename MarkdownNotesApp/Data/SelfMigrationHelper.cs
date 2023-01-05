using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore;

namespace MarkdownNotesApp.Data
{
    public class SelfMigrationHelper
    {
        public void Migrate<TContext>(WebApplication app) where TContext : DbContext
        {
            using var scope = app.Services.CreateScope();
            using var ctx = scope.ServiceProvider.GetRequiredService<TContext>();

            var sp = ctx.GetInfrastructure();

            var modelDiffer = sp.GetRequiredService<IMigrationsModelDiffer>();
            var migrationsAssembly = sp.GetRequiredService<IMigrationsAssembly>();

            var modelInitializer = sp.GetRequiredService<IModelRuntimeInitializer>();
            var sourceModel = modelInitializer.Initialize(migrationsAssembly.ModelSnapshot!.Model);

            var designTimeModel = sp.GetRequiredService<IDesignTimeModel>();
            var readOptimizedModel = designTimeModel.Model;

            var diffsExist = modelDiffer.HasDifferences(
                sourceModel.GetRelationalModel(),
                readOptimizedModel.GetRelationalModel());

            if (diffsExist)
            {
                throw new InvalidOperationException("There are differences between the current database model and the most recent migration. You forgot to create a new migration file.");
            }

            ctx.Database.Migrate();
        }
    }
}
