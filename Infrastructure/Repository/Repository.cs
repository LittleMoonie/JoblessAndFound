using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repository
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Threading.Tasks;
    using Ardalis.Specification;
    using AutoMapper;
    using AutoMapper.QueryableExtensions;
    using Core.Entities;
    using Core.Repository;
    using Microsoft.EntityFrameworkCore;

    public class Repository<T> : IRepository<T>
        where T : class
    {
        protected readonly DataContext _context;
        private readonly IMapper _mapper;
        protected readonly DbSet<T> _dbSet;

        public Repository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _dbSet = _context.Set<T>();
        }

        public virtual async Task<T> FindByIdAsync(int id)
        {
            return await _dbSet.FindAsync(id);
        }

        public virtual async Task<TResult> FindByIdAsync<TResult>(int id) where TResult : class
        {
            // Retrieve the entity from the database
            var entity = await _dbSet.FindAsync(id);

            // If the entity is not found, return null or handle it accordingly
            if (entity == null)
            {
                return null; // or throw an exception if preferred
            }

            // Map the entity to the desired DTO type
            return _mapper.Map<TResult>(entity);
        }

        public virtual async Task<T> FindAsync(Expression<Func<T, bool>> predicate)
        {
            try
            {
                return await _dbSet.FirstOrDefaultAsync(predicate);
            }
            catch (Exception ex)
            {
                // Log the exception and handle it
                throw new Exception("An error occurred while retrieving data.", ex);
            }
        }

        public async Task<TResult> FindAsync<TResult>(Expression<Func<T, bool>> predicate)
        {
            try
            {
                return await _dbSet
                    .Where(predicate)
                    .ProjectTo<TResult>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();
            }
            catch (Exception ex)
            {
                // Log the exception and handle it
                throw new Exception("An error occurred while retrieving data.", ex);
            }
        }

        public virtual async Task<TResult> FindAsync<TResult>(
                Expression<Func<T, bool>> predicate,
                params Expression<Func<T, object>>[] includes) where TResult : class
        {
            // Créer une requête de base
            IQueryable<T> query = _dbSet;

            // Appliquer le critère
            query = query.Where(predicate);

            // Appliquer les inclusions
            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            // Utiliser la projection vers le type TResult désiré
            return await query
                .AsNoTracking() // Optionnel : permet une meilleure performance si l'entité n'est pas modifiée
                .Select(entity => (TResult)Activator.CreateInstance(typeof(TResult), entity)) // Assurez-vous que le constructeur de TResult correspond
                .FirstOrDefaultAsync();
        }

        public virtual async Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> predicate)
        {
            // Utiliser IQueryable pour permettre la traduction de la requête par Entity Framework
            return await _dbSet.Where(predicate).ToListAsync();
        }


        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task AddAsync(T entity)
        {
            await _dbSet.AddAsync(entity);
            await _context.SaveChangesAsync();
        }

        public virtual async Task UpdateAsync(T entity)
        {
            _dbSet.Update(entity);
            await _context.SaveChangesAsync();
        }

        public virtual async Task DeleteAsync(int id)
        {
            var entity = await FindByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate)
        {
            return await _dbSet.AnyAsync(predicate);
        }

        public virtual async Task<int> CountAsync(Expression<Func<T, bool>> predicate = null)
        {
            return predicate == null
                ? await _dbSet.CountAsync()
                : await _dbSet.CountAsync(predicate);
        }

        public async Task LoadRelatedEntitiesAsync<TProperty>(T entity, Expression<Func<T, IEnumerable<TProperty>>> navigationProperty) where TProperty : class
        {
            await _context.Entry(entity).Collection(navigationProperty).LoadAsync();
        }
    }
}
