export async function fetchCountriesNames() {
    const resp = await fetch(`https://restcountries.com/v3.1/all?fields=name`);
    if(!resp.ok) throw { type: "COUNTRIES_NAMES_NOT_FOUND" };
    return resp.json();
}
export async function fetchCountryData(country) {
    const resp = await fetch(`https://restcountries.com/v3.1/name/${country}`);
    if(!resp.ok) throw { type: "COUNTRY_NOT_FOUND" };
    const data = await resp.json();
    return data[0];
}
export async function fetchCountriesByRegion(region) {
    const resp = await fetch(`https://restcountries.com/v3.1/region/${region}`);
    if(!resp.ok) throw { type: "REGION_NOT_FOUND" };
    return resp.json();
}