// pokemon elements container
const pokemonsContainer = document.querySelector(".pokemons");

function renderPokemons(pokemons) {
  while (pokemonsContainer.firstChild) pokemonsContainer.removeChild(pokemonsContainer.lastChild); //pokemon container cleared

  pokemons = pokemons.sort((pok1, pok2) => {return pok1["id"] - pok2["id"];}) //pokemons sorted by id

  for(let i=0; i<pokemons.length;i++){
    // Elements for a pokemon
    const pokemon = document.createElement("div");
    const pokemon_image = document.createElement("img");
    const pokemon_name = document.createElement("div");
    // Name + image
    pokemon_name.innerHTML = pokemons[i]["name"];
    pokemon_image.src = pokemons[i]["image"];
    pokemon_image.width = "96";
    pokemon_image.height = "96";
    // Classes
    let pokemon_types = "pokemon ";
    let num_types = pokemons[i]["types"].length;
    for(let j=0; j<num_types; j++){
      pokemon_types += pokemons[i]["types"][j];
      if(j+1<num_types) pokemon_types += " ";
    }
    pokemon.className = pokemon_types;
    // Pokemon type dependent colors of border
    let str = "linear-gradient(135deg, "
    pokemon.style.borderImage = str.concat(pokemon_type_colors[pokemons[i]["types"][0]],", ",
    pokemon_type_colors[pokemons[i]["types"][pokemons[i]["types"].length-1]],") 30");
    // Added to html
    pokemonsContainer.appendChild(pokemon);
    pokemon.appendChild(pokemon_image);
    pokemon.appendChild(pokemon_name);
  }
}

renderPokemons(pokemons);     //render before filtering

// Filtering function
function filterPokemons(pokemons) {
  // Filtering by type
  const pokemon_types = Array.from(document.querySelectorAll("input[type=checkbox]:checked")).map(type => type["id"]);
  pokemons = pokemons.filter(pok => {return pok["types"].some(typ => {return pokemon_types.includes(typ)}) ? true : false;})
  // Filtering by name
  const pokemon_name = document.querySelector("input[type=text]").value;
  pokemons = pokemons.filter(pok => {return pok["name"].toLowerCase().includes(pokemon_name.toLowerCase());})
  
  return pokemons;
}

//Filtering pokemons
function submitForm(event) {
  event.preventDefault();
  renderPokemons(filterPokemons(pokemons));
}
const form = document.querySelector("form");
form.addEventListener("submit", submitForm);