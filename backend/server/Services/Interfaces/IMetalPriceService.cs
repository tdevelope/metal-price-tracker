using server.Models;

namespace server.Services.Interfaces
{
    public interface IMetalPriceService
    {
        Task<List<MetalPrice>> GetCurrentPricesAsync();
        Task<PriceHistory> GetPriceHistoryAsync(MetalType metal, TimeRange period);
    }
}
