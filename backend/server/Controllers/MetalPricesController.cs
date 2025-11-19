using Microsoft.AspNetCore.Mvc;
using server.Models;
using server.Services.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MetalPricesController : ControllerBase
    {
        private readonly IMetalPriceService _metalPriceService;

        public MetalPricesController(IMetalPriceService metalPriceService)
        {
            _metalPriceService = metalPriceService;
        }

        [HttpGet("current")]
        public async Task<ActionResult<List<MetalPrice>>> GetCurrentPrices()
        {
            try
            {
                var currentPrices = await _metalPriceService.GetCurrentPricesAsync();

                if (!currentPrices.Any())
                {
                    return NotFound("No current price data available");
                }

                return Ok(currentPrices);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("history/{metal}/{period}")]
        public async Task<ActionResult<PriceHistory>> GetPriceHistory(MetalType metal, TimeRange period)
        {
            try
            {
                var priceHistory = await _metalPriceService.GetPriceHistoryAsync(metal, period);

                if (priceHistory == null)
                {
                    return NotFound($"No price history found for {metal} - {period}");
                }

                return Ok(priceHistory);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}.");
            }
        }

        [HttpGet("metals")]
        public ActionResult<string[]> GetAvailableMetals()
        {
            var metals = Enum.GetNames<MetalType>();
            return Ok(metals);
        }

        [HttpGet("periods")]
        public ActionResult<string[]> GetAvailablePeriods()
        {
            var periods = Enum.GetNames<TimeRange>();
            return Ok(periods);
        }
    }
}
