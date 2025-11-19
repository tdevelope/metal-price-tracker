using server.DTOs;
using server.Models;

namespace server.Services.Interfaces
{
    public interface IYahooFinanceService
    {
        Task<YahooFinanceResponse?> GetMetalDataAsync(MetalType metal, TimeRange period);
    }
}
