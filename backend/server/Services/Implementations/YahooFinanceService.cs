using System.Text.Json;
using server.DTOs;
using server.Models;
using server.Services.Interfaces;

namespace server.Services.Implementations
{
    public class YahooFinanceService : IYahooFinanceService
    {
        private readonly HttpClient _httpClient;
        private readonly Dictionary<MetalType, string> _metalSymbols;
        private readonly Dictionary<TimeRange, string> _timeRangeParams;
        private static readonly SemaphoreSlim _semaphore = new(1, 1);

        public YahooFinanceService(HttpClient httpClient)
        {
            _httpClient = httpClient;

            _httpClient.DefaultRequestHeaders.Add("User-Agent", "MetalPriceApp/1.0 (.NET 9)");

            _metalSymbols = new Dictionary<MetalType, string>
            {
                { MetalType.Gold, "GC=F" },
                { MetalType.Silver, "SI=F" },
                { MetalType.Platinum, "PL=F" },
                { MetalType.Copper, "HG=F" }
            };

            _timeRangeParams = new Dictionary<TimeRange, string>
            {
                { TimeRange.Week, "interval=1d&range=7d" },
                { TimeRange.Month, "interval=1d&range=1mo" },
                { TimeRange.SixMonths, "interval=1d&range=6mo" },
                { TimeRange.Year, "interval=1d&range=1y" }
            };
        }

        public async Task<YahooFinanceResponse?> GetMetalDataAsync(MetalType metal, TimeRange period)
        {
            await _semaphore.WaitAsync();

            try
            {
                var symbol = _metalSymbols[metal];
                var parameters = _timeRangeParams[period];
                var url = $"https://query1.finance.yahoo.com/v8/finance/chart/{symbol}?{parameters}";

                await Task.Delay(1000);

                var response = await _httpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var jsonContent = await response.Content.ReadAsStringAsync();

                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                var yahooResponse = JsonSerializer.Deserialize<YahooFinanceResponse>(jsonContent, options);
                return yahooResponse;
            }
            catch (HttpRequestException)
            {
                return null;
            }
            catch (JsonException)
            {
                return null;
            }
            catch (Exception)
            {
                return null;
            }
            finally
            {
                _semaphore.Release();
            }
        }
    }
}
