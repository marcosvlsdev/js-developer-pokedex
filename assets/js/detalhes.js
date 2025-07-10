function getParam(param) {
    const urlSearch = new URLSearchParams(window.location.search)
    return urlSearch.get(param)
}

const nomeOuId = getParam("number")

if (nomeOuId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nomeOuId}/`)
        .then((res) => res.json())
        .then((pokemonDetails) => {
            const pokemon = convertPokeApiDetailToPokemon(pokemonDetails)

            document.getElementById("pokemon-detalhes").innerHTML += `
                <h1>${pokemon.name} (#${pokemon.number})</h1>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
                <div>
                    ${pokemon.types.map(type => `<span class="type ${type}">${type}</span>`).join('')}
                </div>
                <br>
                <a href="index.html">← Voltar para lista</a>
            `
        })
        .catch(() => {
            document.getElementById("pokemon-detalhes").innerHTML = `<p>Pokémon não encontrado.</p>`
        })
} else {
    document.getElementById("pokemon-detalhes").innerHTML = `<p>Nenhum parâmetro encontrado na URL.</p>`
}