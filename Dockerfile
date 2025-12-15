FROM node:20 AS frontend
WORKDIR /app/frontend

# Install CA certificates
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy and install NetFree certificate for frontend build
COPY certs/ca.crt /usr/local/share/ca-certificates/netfree.crt
RUN chmod 644 /usr/local/share/ca-certificates/netfree.crt && \
    update-ca-certificates

# Set SSL environment variables for npm
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/ca-certificates.crt \
    NODE_TLS_REJECT_UNAUTHORIZED=0

COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS backend
WORKDIR /app/backend

# Install CA certificates for .NET SDK
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy and install NetFree certificate
COPY certs/ca.crt /usr/local/share/ca-certificates/netfree.crt
RUN chmod 644 /usr/local/share/ca-certificates/netfree.crt && \
    update-ca-certificates

COPY backend/server/*.csproj ./server/
RUN dotnet restore ./server/*.csproj
COPY backend/ ./
RUN dotnet publish ./server/*.csproj -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app

# Install CA certificates for runtime
RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates && \
    rm -rf /var/lib/apt/lists/*

# Copy and install NetFree certificate for runtime
COPY certs/ca.crt /usr/local/share/ca-certificates/netfree.crt
RUN chmod 644 /usr/local/share/ca-certificates/netfree.crt && \
    update-ca-certificates

# Set SSL certificate path for .NET
ENV SSL_CERT_FILE=/etc/ssl/certs/ca-certificates.crt \
    SSL_CERT_DIR=/etc/ssl/certs

COPY --from=backend /app/out ./
COPY --from=frontend /app/frontend/dist/frontend/browser ./wwwroot

EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENTRYPOINT ["dotnet", "server.dll"]
