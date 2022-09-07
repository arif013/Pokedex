console.log("Here we go");

let pokebox = document.getElementById("pokebox");
const fetchPokemon=()=>{
    const promises=[];
    for(let i=1;i<21;i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((response) => response.json()));
    }
    Promise.all(promises).then((result) => {
        const pokemon=result.map((data)=>({
            name: data.name,
            weight: data.weight,
            height:data.height,
            image: data.sprites.front_default,
            type: data.types.map((type)=>type.type.name).join('')
        }))
        displayPokemon(pokemon);
    })
}
const displayPokemon=(pokemon)=>{
    console.log(pokemon);
    const PokemonHtml =pokemon.map((poke)=> `
        <li>
        <h2 class="heading"><strong>${poke.name.toUpperCase()}</strong></h2>
        <img class="img" src="${poke.image}" alt="" srcset="">
        <p>Weight: ${poke.weight}</p>
        <p>Height: ${poke.height}</p>
        <p>Type: ${poke.type}</p>
        </li>`).join('');
        pokebox.innerHTML+=PokemonHtml;
}

fetchPokemon();

let current_page=1;
let rows = 10;

function DisplayList(items,wrapper,rows_per_page,page){
    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    for(let j=0; j<paginatedItems.length; j++){
        let item = paginatedItems[j];
        let item_element = document.createElement('div');
        item_element.classList.add('item');
        item_element.innerText = item;

        wrapper.appendChild(item_element);
        console.log(item_element);
    }
}