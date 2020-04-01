using BusinessLogicLibrary.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogicLibrary.Service
{
    public interface IPositionService
    {
        Task<List<PositionModel>> GetPositions();
        Task<bool> SavePosition(PositionModel posi);
        Task<bool> DeletePosition(int posiId);
    }
}
