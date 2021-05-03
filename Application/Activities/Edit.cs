using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest 
        {
            public Activity Activity {get; set;}
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context,IMapper mapper)
          {
                _context = context;
                _mapper = mapper;
            }

         public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
         {   //activity 代表查詢來自資料庫的activity物件,查詢條件式用request.Activity.Id 從client端來的
             var activity = await _context.Activities.FindAsync(request.Activity.Id);
                 _mapper.Map(request.Activity,activity);
              // activity.Title = request.Activity.Title ?? activity.Title;
               await _context.SaveChangesAsync();
               return Unit.Value;
         }
        }
    }
}