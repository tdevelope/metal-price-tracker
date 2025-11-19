namespace server.Models
{
    public class PriceHistory
    {
        public MetalType Metal { get; set; }
        public TimeRange Period { get; set; }
        public List<PricePoint> Data { get; set; }
        public DateTime GeneratedAt {get; set; }
    }
}
