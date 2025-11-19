namespace server.DTOs
{
    public class Result
    {
        public List<long> Timestamp { get; set; } = new List<long>();
        public Indicators Indicators { get; set; } = new Indicators();
    }

    public class Indicators
    {
        public List<Quote> Quote { get; set; } = new List<Quote>();
    }

    public class Quote
    {
        public List<decimal?> Close { get; set; } = new List<decimal?>();
    }
}
