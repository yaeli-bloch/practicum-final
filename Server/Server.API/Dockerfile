#See https://aka.ms/customizecontainer to learn how to customize your debug container and how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
RUN apt-get update && apt-get install -y \
    apt-transport-https \
    gnupg2 \
    lsb-release \
    software-properties-common \
    wget \
    libc6-dev \
    libgdiplus \
    libx11-dev \
    libleptonica-dev\
    libopencv-dev

# העתקת מפתח ההתקנה של notesalexp
COPY Server.API/alexp_key.asc /tmp/alexp_key.asc

# הוספת המפתח למערכת המפתחות
RUN apt-key add /tmp/alexp_key.asc && rm /tmp/alexp_key.asc

# הוספת מאגר notesalexp + התקנת Tesseract
RUN echo "deb https://notesalexp.org/tesseract-ocr5/$(lsb_release -cs)/ $(lsb_release -cs) main" \
    > /etc/apt/sources.list.d/notesalexp.list && \
    apt-get update && apt-get install -y \
    tesseract-ocr \
    tesseract-ocr-heb
COPY Server.API/runtimes /app/runtimes
# קישורים לספריות ש-Tesseract .NET מצפה להן
RUN mkdir -p /app/x64 && \
    ln -s /usr/lib/x86_64-linux-gnu/liblept.so.5 /app/x64/libleptonica-1.82.0.so && \
    ln -s /usr/lib/x86_64-linux-gnu/libtesseract.so.5 /app/x64/libtesseract51.so && \
    ln -s /usr/lib/x86_64-linux-gnu/libtesseract.so.5 /app/x64/libtesseract50.so && \
    ln -s /lib/x86_64-linux-gnu/libdl.so.2 /app/x64/libdl.so
RUN ln -s /app/runtimes/ubuntu.22.04-x64/native/libOpenCvSharpExtern.so /app/x64/OpenCvSharpExtern.so
# משתנים סביבתיים
ENV TESSDATA_PREFIX=/usr/share/tesseract-ocr/5/tessdata
#ENV LD_LIBRARY_PATH=/app/x64:/usr/local/lib:/usr/lib:/usr/lib/x86_64-linux-gnu:/lib/x86_64-linux-gnu
ENV LD_LIBRARY_PATH=/app/x64:/app/runtimes/ubuntu.22.04-x64/native:/usr/local/lib:/usr/lib:/usr/lib/x86_64-linux-gnu:/lib/x86_64-linux-gnu


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
COPY Server.API/runtimes /app/runtimes
ENTRYPOINT ["dotnet", "Server.API.dll"]