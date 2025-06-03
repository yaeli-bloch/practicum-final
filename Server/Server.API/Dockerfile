#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
COPY ["Server.API/Server.API.csproj", "Server.API/"]
COPY ["Server.Core/Server.Core.csproj", "Server.Core/"]
COPY ["Server.Data/Server.Data.csproj", "Server.Data/"]
COPY ["Server.Service/Server.Service.csproj", "Server.Service/"]
RUN dotnet restore "Server.API/Server.API.csproj"
COPY . .
WORKDIR "/src/Server.API"
RUN dotnet build "Server.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Server.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Server.API.dll"]