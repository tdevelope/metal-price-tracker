# ?? Metal Price Tracking API

A modern .NET 9 Web API server providing real-time precious metal price data with historical analysis capabilities.

## ? Overview

Professional-grade REST API that delivers comprehensive metal pricing data sourced from Yahoo Finance. Built with enterprise-level architecture patterns and optimized for client-side applications requiring financial market data.

## ?? Key Features

- **Real-time Price Data** - Current prices for Gold, Silver, Platinum, and Copper
- **Historical Analysis** - Price trends over multiple time periods
- **Performance Optimized** - Rate limiting and efficient data processing
- **Production Ready** - Comprehensive error handling and monitoring
- **Developer Friendly** - OpenAPI/Swagger documentation included

## ??? Technical Architecture

```
???????????????????    ????????????????????    ???????????????????
?   Client App    ??????   ASP.NET Core   ?????? Yahoo Finance   ?
?   (Angular)     ?    ?   Web API        ?    ?     API         ?
???????????????????    ????????????????????    ???????????????????
```

### Stack
- **.NET 9** - Latest framework with C# 13
- **ASP.NET Core Web API** - High-performance web framework
- **Dependency Injection** - Clean architecture principles
- **OpenAPI/Swagger** - API documentation and testing

## ?? API Endpoints

### Current Prices
```http
GET /api/MetalPrices/current
```
Returns real-time pricing data with change calculations for all supported metals.

### Price History
```http
GET /api/MetalPrices/history/{metal}/{period}
```
Historical price data for charting and trend analysis.
- **Metals:** Gold, Silver, Platinum, Copper
- **Periods:** Week, Month, SixMonths, Year

### Metadata
```http
GET /api/MetalPrices/metals    # Available metals
GET /api/MetalPrices/periods   # Available time periods
```

## ?? Sample Response

```json
{
  "metal": "Gold",
  "currentPrice": 2045.30,
  "previousPrice": 2038.75,
  "changeAmount": 6.55,
  "changePercent": 0.32,
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

## ? Performance & Reliability

- **Rate Limiting** - 1-second delay between external API calls
- **Concurrent Protection** - SemaphoreSlim prevents request flooding
- **Graceful Error Handling** - Continues operation despite partial failures
- **CORS Enabled** - Ready for cross-origin client applications

## ??? Quick Start

```bash
# Prerequisites: .NET 9 SDK
dotnet restore
dotnet run

# Server runs on: http://localhost:5045
# API Documentation: http://localhost:5045/swagger
```

## ?? Configuration

The server is pre-configured for development with:
- **CORS** enabled for Angular clients (port 4200)
- **Swagger UI** available in development mode
- **JSON serialization** optimized for web clients

## ?? Data Source

Powered by **Yahoo Finance API** with proper rate limiting and error handling to ensure reliable data delivery.

---

*Built for modern web applications requiring real-time financial data integration.*