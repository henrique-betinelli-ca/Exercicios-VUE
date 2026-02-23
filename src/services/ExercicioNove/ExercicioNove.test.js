import { describe, it, expect, vi } from 'vitest';
import * as resource from './Resource.js';
import * as service from './Service.js';

describe('service', () => {
    describe('getWelcomeMessage', () => {
        it('should return the welcomeMessage constant', () => {
            expect(service.getWelcomeMessage()).toEqual({
                TITLE: "Bem-vindo ao Countries Explorer",
                FIRST_MESSAGE: "Explore países, regiões e descubra curiosidades do mundo.",
                SECOND_MESSAGE: "Escolha uma opção abaixo e comece a explorar!"
            });
        });
    });
    describe('getRoutes', () => {
        it('should return the routes constant', () => {
            expect(service.getRoutes()).toEqual({
                SEARCH_ROUTES: [
                    { LABEL: "Buscar País", TO: "/ExercicioNove/BuscarPaises" },
                    { LABEL: "Buscar Região", TO: "/ExercicioNove/BuscarRegiao" },
                    { LABEL: "Comparar Países", TO: "/ExercicioNove/CompararPaises" }
                ],
                HOME_ROUTE: {
                    LABEL: "Voltar ao Início", TO: "/ExercicioNove"
                }
            });
        });
    });
    describe('getRegions', () => {
        it('should return the regions constant', () => {
            expect(service.getRegions()).toEqual([
                "Europe", 
                "Americas", 
                "Asia", 
                "Africa", 
                "Antarctic", 
                "Oceania"
            ]);
        });
    });
    describe('getCountryInfoFields', () => {
        it('should return the countryInfoFields constant', () => {
            expect(service.getCountryInfoFields()).toEqual([
                { KEY: "capital", ICON: "mdi-map-marker", LABEL: "Capital" },
                { KEY: "region", ICON: "mdi-earth", LABEL: "Region" },
                { KEY: "population", ICON: "mdi-account-group", LABEL: "Population" },
                { KEY: "area", ICON: "mdi-map", LABEL: "Area" }
            ]);
        });
    });
    describe('getComparisonResulTitles', () => {
        it('should return the comparisonResulTitles constant', () => {
            expect(service.getComparisonResulTitles()).toEqual({
                AREA: "Maior Área Territorial",
                POPULATION: "Maior População"
            });
        });
    });
    describe('getSearchMode', () => {
        it('should return the searchMode constant', () => {
            expect(service.getSearchMode()).toEqual({
                REGION : "REGION",
                NAME: "NAME",
                COMPARISON: "COMPARISON"
            });
        });
    });
    describe('getAlertMessageByType', () => {
        it('should return the alertMessageByType constant', () => {
            expect(service.getAlertMessageByType("COUNTRIES_NAMES_NOT_FOUND")).toEqual({
                TITLE: "Falha ao buscar países.",
                MESSAGE: "Por favor, tente novamente mais tarde.",
                TYPE: "error"
            });
            expect(service.getAlertMessageByType("COUNTRY_NOT_FOUND")).toEqual({
                TITLE: "País não encontrado.",
                MESSAGE: "Não foi possível encontrar um país com o nome informado. Por favor, tente novamente.",
                TYPE: "error"
            });
            expect(service.getAlertMessageByType("REGION_NOT_FOUND")).toEqual({
                TITLE: "Região não encontrada.",
                MESSAGE: "Não foi possível encontrar a região informado. Por favor, tente novamente.",
                TYPE: "error"
            });
            expect(service.getAlertMessageByType("NOT_ENOUGH_COUNTRIES")).toEqual({
                TITLE: "Quantidade insuficiente.",
                MESSAGE: "Selecione pelo menos dois países para comparar.",
                TYPE: "info"
            });
        });
    });
    describe('getSearchLabels', () => {
        it('should return the searchLabels constant', () => {
            expect(service.getSearchLabels("REGION")).toEqual("Informe a Região");
            expect(service.getSearchLabels("NAME")).toEqual("Informe o País");
            expect(service.getSearchLabels("COMPARISON")).toEqual("Selecione os Países");
        });
    });
    describe('getCountriesNames', () => {
        it('should fetch the countries and map the result to return only their names', async () => {
            vi.spyOn(resource, 'fetchCountriesNames').mockResolvedValue([
                { name: { common: "United Kingdom", official: "United Kingdom of Great Britain and Northern Ireland" } },
                { name: { common: "Guinea-Bissau", official: "Republic of Guinea-Bissau" } }
            ]);
            expect(await service.getCountriesNames()).toEqual([
                "United Kingdom",
                "Guinea-Bissau"
            ]);
            expect(resource.fetchCountriesNames).toHaveBeenCalledOnce();
        });
    });
    describe('getMainCountryData', () => {
        it('should fetch country data and map it correctly', async () => {
            vi.spyOn(resource, 'fetchCountryData').mockResolvedValue({
                name: { common: "Brazil" },
                capital: [ "Brasília" ],
                region: "Americas",
                languages: { por: "Portuguese" },
                area: 8515767,
                population: 213421037,
                continents: [ "South America" ],
                flags: { png: "https://flagcdn.com/w320/br.png", svg: "https://flagcdn.com/br.svg" }
            });
            expect(await service.getMainCountryData("Brazil")).toEqual({ 
                name: "Brazil",
                capital: "Brasília",
                region: "Americas",
                area: 8515767,
                population: 213421037,
                flag: "https://flagcdn.com/w320/br.png"
            });
            expect(resource.fetchCountryData).toHaveBeenCalledOnce();
            expect(resource.fetchCountryData).toHaveBeenCalledWith("Brazil");
        });
    });
    describe('mapCountryToCardData', () => {
        it('should filter the API response to return only the required data', () => {
            const countryData = {
                name: { common: "Brazil" },
                capital: [ "Brasília" ],
                region: "Americas",
                languages: { por: "Portuguese" },
                area: 8515767,
                population: 213421037,
                continents: [ "South America" ],
                flags: { png: "https://flagcdn.com/w320/br.png", svg: "https://flagcdn.com/br.svg" }
            };
            expect(service.mapCountryToCardData(countryData)).toEqual({ 
                name: "Brazil",
                capital: "Brasília",
                region: "Americas",
                area: 8515767,
                population: 213421037,
                flag: "https://flagcdn.com/w320/br.png"
            });
        });
    });
    describe('getCountriesByRegion', () => {
        it('should fetch countries by region', async () => {
            const mockResponse = [
                { name: { common: 'Brazil' } },
                { name: { common: 'Argentina' } }
            ];
            vi.spyOn(resource, 'fetchCountriesByRegion').mockResolvedValue(mockResponse);
            expect(await service.getCountriesByRegion('americas')).toEqual(mockResponse);
            expect(resource.fetchCountriesByRegion).toHaveBeenCalledWith('americas');
            expect(resource.fetchCountriesByRegion).toHaveBeenCalledOnce();
        });
    });
    describe('compareCountries', () => {
        it('should return the country with the largest area and the largest population', async () => {
            vi.spyOn(resource, 'fetchCountryData').mockResolvedValueOnce({
                flags: { png: "https://flagcdn.com/w320/ca.png" }, 
                name: { common: "Canada" },
                capital: ["Ottawa"],
                region: "Americas", 
                population: 41651653, 
                area: 9984670 
            }).mockResolvedValueOnce({
                flags: { png: "https://flagcdn.com/w320/ng.png" },
                name: { common: "Nigeria" },
                capital: ["Abuja"],
                region: "Africa", 
                population: 223800000, 
                area: 923768
            });
            const result = await service.compareCountries(["Canada", "Nigeria"]);
            expect(result.largestAreaCountry.name).toEqual("Canada");
            expect(result.largestPopulationCountry.name).toEqual("Nigeria");
        });
    });
    describe('calculateLargestArea', () => {
        it('should calculate which country has the largest territorial area and return it', () => {
            const countriesData = [
                { name: "Guinea-Bissau", area: 36125 },
                { name: "New Zealand", area: 268838 }
            ];
            expect(service.calculateLargestArea(countriesData)).toEqual({ 
                name: "New Zealand", 
                area: 268838 
            });
        });
    });
    describe('calculateLargestPopulation', () => {
        it('should calculate which country has the largest population and return it', () => {
            const countriesData = [
                { name: "Bolivia", population: 11365333 },
                { name: "Croatia", population: 3866233 }
            ];
            expect(service.calculateLargestPopulation(countriesData)).toEqual({ 
                name: "Bolivia", 
                population: 11365333
            });
        });
    });
});