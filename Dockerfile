#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS setupEnvironment
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://raw.githubusercontent.com/nodesource/distributions/master/deb/setup_14.x| bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm



FROM setupEnvironment AS movedFiles
WORKDIR /src
COPY . .
WORKDIR /src/Infatuation.Project.Web
RUN npm install



FROM movedFiles as build
WORKDIR /src/Infatuation.Project.Web
RUN npx webpack --progress
WORKDIR /src
RUN dotnet build "Infatuation.sln" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Infatuation.sln" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Infatuation.Project.Web.dll"]