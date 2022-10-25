#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS setup-environment
RUN apt-get update -yq && apt-get upgrade -yq && apt-get install -yq curl git nano
RUN curl -sL https://raw.githubusercontent.com/nodesource/distributions/master/deb/setup_14.x| bash - && apt-get install -yq nodejs build-essential
RUN npm install -g npm



FROM setup-environment AS moved-files
WORKDIR /src
COPY . .
WORKDIR /src/Infatuation.Project.Web
RUN npm install


FROM moved-files as build
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