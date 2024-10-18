using Ardalis.Specification;
using Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Core.Repository
{
    public interface IRepository<T>
        where T : class
    {
        Task<T> FindByIdAsync(int id);
        Task<TResult> FindByIdAsync<TResult>(int id) where TResult : class;
        Task<T> FindAsync(Expression<Func<T, bool>> predicate);
        Task<TResult> FindAsync<TResult>(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> FindAllAsync(Expression<Func<T, bool>> predicate);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate);
        Task<int> CountAsync(Expression<Func<T, bool>> predicate = null);
        //Task LoadRelatedEntitiesAsync<TProperty>(T entity, Expression<Func<T, IEnumerable<TProperty>>> navigationProperty) where TProperty : class;
        Task<TResult> FindAsync<TResult>(
                Expression<Func<T, bool>> predicate,
                params Expression<Func<T, object>>[] includes) where TResult : class;

        Task<IEnumerable<T>> FindAllAsync<T>(Expression<Func<T, bool>> predicate) where T : class;
    }
}
