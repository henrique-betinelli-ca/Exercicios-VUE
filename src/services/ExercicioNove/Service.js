import { fetchCountriesNames, fetchCountryData, fetchCountriesByRegion } from "./Resource.js";
import { WELCOME_MESSAGE, ROUTES, REGIONS, ALERT_MESSAGES, COUNTRY_INFO_FIELDS, COMPARISON_RESULT_TITLES, SEARCH_LABELS, SEARCH_MODE } from "./Constants.js";

export function getWelcomeMessage() {
    return WELCOME_MESSAGE;
}
export function getRoutes() {
    return ROUTES;
}
export function getRegions() {
    return REGIONS;
}
export function getCountryInfoFields() {
    return COUNTRY_INFO_FIELDS;
}
export function getComparisonResulTitles() {
    return COMPARISON_RESULT_TITLES;
}
export function getSearchMode() {
    return SEARCH_MODE;
}
export function getAlertMessageByType(alertType) {
    return ALERT_MESSAGES[alertType];
}
export function getSearchLabels(mode) {
    return SEARCH_LABELS[mode];
}
export async function getCountriesNames() {
    const countriesList = await fetchCountriesNames();
    return countriesList.map(country => country.name.common);
}
export async function getMainCountryData(country) {
    const countryData = await fetchCountryData(country);
    return mapCountryToCardData(countryData);
}
export function mapCountryToCardData(countryData) {
    return {
        flag: countryData.flags.png,
        name: countryData.name.common,
        capital: countryData.capital[0],
        region: countryData.region,
        population: countryData.population,
        area: countryData.area
    };
}
export async function getCountriesByRegion(region) {
    return fetchCountriesByRegion(region);
}
export async function compareCountries(countries) {
    const countriesData = await Promise.all(countries.map(country => fetchCountryData(country)));
    return {
        largestAreaCountry: mapCountryToCardData(calculateLargestArea(countriesData)),
        largestPopulationCountry: mapCountryToCardData(calculateLargestPopulation(countriesData))
    }
}
export function calculateLargestArea(countries) {
    return countries.reduce((previous, current) => current.area > previous.area ? current : previous);
}
export function calculateLargestPopulation(countries) {
    return countries.reduce((previous, current) => current.population > previous.population ? current : previous);
}