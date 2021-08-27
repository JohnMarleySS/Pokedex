const fetchPokemon = () => {
    const getUrlPokemon = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []


    for (let i = 1; i <= 150; i++) {
        pokemonPromises.push(fetch(getUrlPokemon(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
        .then(pokemons => {

            const lisPokemons = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typesInfo => typesInfo.type.name)
                const habilidades = pokemon.abilities.map(habilidadeInfo => habilidadeInfo.ability.name)
                console.log(pokemon)
                accumulator += `
                <div class="card">
                    <h2>${pokemon.id}. ${pokemon.name} ${habilidades}</h2>
                    <img class=${types[0]}"alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon.id}.png" />
                    <h2>${types.join(' | ')}</h2>
                </div>
                `
                return accumulator
            }, '')

            const ul = document.querySelector('#pokedex')
            ul.innerHTML = lisPokemons;
        })
}

fetchPokemon();