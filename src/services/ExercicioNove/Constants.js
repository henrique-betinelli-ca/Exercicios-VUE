export const WELCOME_MESSAGE = {
    TITLE: "Bem-vindo ao Countries Explorer",
    FIRST_MESSAGE: "Explore países, regiões e descubra curiosidades do mundo.",
    SECOND_MESSAGE: "Escolha uma opção abaixo e comece a explorar!"
};
export const ROUTES = {
    SEARCH_ROUTES: [
        { LABEL: "Buscar País", TO: "/ExercicioNove/BuscarPaises" },
        { LABEL: "Buscar Região", TO: "/ExercicioNove/BuscarRegiao" },
        { LABEL: "Comparar Países", TO: "/ExercicioNove/CompararPaises" }
    ],
    HOME_ROUTE: {
        LABEL: "Voltar ao Início", TO: "/ExercicioNove"
    }
};
export const REGIONS = [
    "Europe", 
    "Americas", 
    "Asia", 
    "Africa", 
    "Antarctic", 
    "Oceania"
];
export const ALERT_MESSAGES = {
    COUNTRIES_NAMES_NOT_FOUND: {
        TITLE: "Falha ao buscar países.",
        MESSAGE: "Por favor, tente novamente mais tarde.",
        TYPE: "error"
    },
    COUNTRY_NOT_FOUND: {
        TITLE: "País não encontrado.",
        MESSAGE: "Não foi possível encontrar um país com o nome informado. Por favor, tente novamente.",
        TYPE: "error"
    },
    REGION_NOT_FOUND: {
        TITLE: "Região não encontrada.",
        MESSAGE: "Não foi possível encontrar a região informado. Por favor, tente novamente.",
        TYPE: "error"
    },
    NOT_ENOUGH_COUNTRIES: {
        TITLE: "Quantidade insuficiente.",
        MESSAGE: "Selecione pelo menos dois países para comparar.",
        TYPE: "info"
    }
};
export const COUNTRY_INFO_FIELDS = [
    { KEY: "capital", ICON: "mdi-map-marker", LABEL: "Capital" },
    { KEY: "region", ICON: "mdi-earth", LABEL: "Region" },
    { KEY: "population", ICON: "mdi-account-group", LABEL: "Population" },
    { KEY: "area", ICON: "mdi-map", LABEL: "Area" }
];
export const COMPARISON_RESULT_TITLES = {
    AREA: "Maior Área Territorial",
    POPULATION: "Maior População"
};
export const SEARCH_LABELS = {
    REGION: "Informe a Região",
    NAME: "Informe o País",
    COMPARISON: "Selecione os Países"
};
export const SEARCH_MODE = {
    REGION : "REGION",
    NAME: "NAME",
    COMPARISON: "COMPARISON"
};