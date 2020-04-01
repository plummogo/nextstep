using System.Threading.Tasks;
using BusinessLogicLibrary.Model;
using BusinessLogicLibrary.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace NextStep.AspNetCoreReact.Controllers
{
    [Route("api/[controller]")]
    public class PositionController : Controller
    {
            private readonly IPositionService _posiService;
            public PositionController(IPositionService posiService)
            {
                _posiService = posiService;
            }

            [EnableCors]
            [HttpGet]
            [Route("Positions")]
            public async Task<IActionResult> Positions()
            {
                return Ok(await _posiService.GetPositions());
            }

            [EnableCors]
            [HttpPost]
            [Route("SavePosition")]
            public async Task<IActionResult> SavePosition([FromBody] PositionModel model)
            {
                return Ok(await _posiService.SavePosition(model));
            }

            [EnableCors]
            [HttpDelete]
            [Route("DeletePosition/{id}")]
            public async Task<IActionResult> DeletePosition(int id)
            {   
                return Ok(await _posiService.DeletePosition(id));
            }
        }
}