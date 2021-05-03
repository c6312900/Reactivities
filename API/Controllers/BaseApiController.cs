using Microsoft.AspNetCore.Mvc;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace API.Controllers
{   [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        private  IMediator _meaditor;

        protected IMediator Mediator => _meaditor ??= HttpContext.RequestServices.GetService<IMediator>();
        
    }
}