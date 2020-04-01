using BusinessLogicLibrary.Model;
using DataAccessLibrary.EntityModels;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BusinessLogicLibrary.Service
{
    public class PositionService : IPositionService
    {
        private readonly NextStepContext _dbContext;
        public PositionService()
        {
            _dbContext = new NextStepContext();
        }

        public async Task<bool> DeletePosition(int posiId)
        {
            Positions posi = _dbContext.Positions.Where(x => x.Id == posiId).FirstOrDefault();
            if (posi != null)
            {
                _dbContext.Positions.Remove(posi);
            }
            return await _dbContext.SaveChangesAsync() >= 1;
        }

        public async Task<List<PositionModel>> GetPositions()
        {
            return await (from a in _dbContext.Positions.AsNoTracking()
                          select new PositionModel
                          {
                              Id = a.Id,
                              Name = a.Name,
                              Description = a.Description,
                              Location = a.Location,
                              Organization = a.Organization
                          }).ToListAsync();
        }

        public async Task<bool> SavePosition(PositionModel posiModel)
        {
            Positions posi = _dbContext.Positions.Where
                            (x => x.Id == posiModel.Id).FirstOrDefault();
            if (posi == null)
            {
                posi = new Positions()
                {
                    Name = posiModel.Name,
                    Description = posiModel.Description,
                    Location = posiModel.Location,
                    Organization = posiModel.Organization
                };
                _dbContext.Positions.Add(posi);

            }
            else
            {
                posi.Name = posiModel.Name;
                posi.Description = posiModel.Description;
                posi.Location = posiModel.Location;
                posi.Organization = posiModel.Organization;
            }

            return await _dbContext.SaveChangesAsync() >= 1;
        }
    }
}