console.log("Here we go");

let pokebox = document.getElementById("pokebox");
const fetchPokemon=()=>{
    const promises=[];
    for(let i=1;i<=200;i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}?`;
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
let prev = document.getElementById("button_prev");
let next = document.getElementById("button_next");
let start = 0;
let pageSize = 12;
const displayPokemon=(pokemon)=>{
    pokebox.innerHTML='';
    console.log(pokemon);
    let item = pokemon.slice (start, start+pageSize);
    console.log(item);
    const PokemonHtml =item.map((poke)=> `
        <li>
        <h2 class="heading"><strong>${poke.name.toUpperCase()}</strong></h2>
        <img class="img" src="${poke.image}" alt="" srcset="">
        <p>Weight: ${poke.weight}</p>
        <p>Height: ${poke.height}</p>
        <p>Type: ${poke.type}</p>
        </li>`).join('');
        pokebox.innerHTML+=PokemonHtml;
        prev.addEventListener('click', ()=>{
            if(start>=pageSize){
                start = start - pageSize;
                displayPokemon(pokemon);
            }
        })
        next.addEventListener('click', ()=>{
            if(start+pageSize<pokemon.length){
                start = start + pageSize;
                displayPokemon(pokemon);
            }
        })
        
    }
fetchPokemon();

