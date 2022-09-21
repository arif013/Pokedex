console.log("Let's start the game")

let pokebox = document.getElementById("pokebox");
var pokemon;
const promises =[];

// Data is fetched from URL 
for(let i=1;i<51;i++){
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then((response) => response.json()));
}

// Data is mapped in required format
Promise.all(promises).then(result =>{
     pokemon = result.map(data=>({
        name: data.name,
        weight: data.weight,
        height:data.height,
        image: data.sprites.front_default,
        type: data.types.map((type)=>type.type.name).join('')
    }))
    displayPokemon(pokemon);
})

// Buttons and number of elements shown
let prev = document.getElementById("button_prev");
let next = document.getElementById("button_next");
let start = 0;
let pageSize = 12;

// Pokemons displayed
const displayPokemon = (pokemon)=>{
        pokebox.innerHTML='';
    let item = pokemon.slice (start, start+pageSize);
    const PokemonHtml =item.map((poke)=> `
        <li>
        <h2 class="heading"><strong>${poke.name.toUpperCase()}</strong></h2>
        <img class="img" src="${poke.image}" alt="" srcset="">
        <p>Weight: ${poke.weight}</p>
        <p>Height: ${poke.height}</p>
        <p>Type: ${poke.type}</p>
        </li>`).join('');
        pokebox.innerHTML+=PokemonHtml;
    }
    
// Previous button function
prev.addEventListener('click', ()=>{
    if(start>=pageSize){
        start = start - pageSize;
        displayPokemon(pokemon);
        console.log(start)
    }else{
        button.disabled = true
    }
})

// Next button function
next.addEventListener('click', ()=>{
    if(start+pageSize<pokemon.length){
        start = start + pageSize;
        displayPokemon(pokemon);
        console.log(start)
    }
})
    


