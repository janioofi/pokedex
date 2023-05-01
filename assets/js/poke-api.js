
const pokeApi = {}

pokeApi.getPokemonsDetail = (async (pokemon) => {
    const response = await fetch(pokemon.url)
    return await response.json()
})

pokeApi.getPokemons = async (offset = 0, limit = 45) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    const response = await fetch(url)
    const jsonBody = await response.json()
    const pokemons = jsonBody.results
    const detailRequests = pokemons.map(pokeApi.getPokemonsDetail)
    const pokemonsDetails = await Promise.all(detailRequests)
    return pokemonsDetails
}