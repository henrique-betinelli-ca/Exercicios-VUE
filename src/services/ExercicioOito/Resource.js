export async function getCategories() {
    const resp = await fetch("https://opentdb.com/api_category.php");
    const data = await resp.json();
                    
    return data.trivia_categories;
}
export async function getQuestions(questionFilters) {
    const resp = await fetch(queryGenerator(questionFilters));
    const data = await resp.json();
    
    return data.results;
}
function queryGenerator(questionFilters) {
    const params = new URLSearchParams();

    Object.entries(questionFilters).forEach(([key, value]) => {
        if (value) params.append(key, value);
    });

    return `https://opentdb.com/api.php?${params.toString()}`;
}