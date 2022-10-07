console.log("Let's start the game")
const searchInput = document.getElementById("data-search")

let pokebox = document.getElementById("pokebox");
let prev = document.getElementById("button_prev");
let next = document.getElementById("button_next");
var pokemon=[];
const promises =[];


// Search event
searchInput.addEventListener("keyup", e=>{
    const value = e.target.value.toLowerCase();
    // console.log(value)
    const filterCharacters = pokemon.filter(character=>{
        return character.name.includes(value) || character.type.includes(value)
    })
    console.log(filterCharacters)
    displayPokemon(filterCharacters)
})
    
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

let start = 0;
let pageSize = 12;

// Pokemons displayed
const displayPokemon = (pokemon)=>{
        pokebox.innerHTML='';
        let item = pokemon.slice (start, start+pageSize);
        const PokemonHtml =item.map((poke)=> `
        <li class="hidden">
        <h2 class="heading"><strong>${poke.name.toUpperCase()}</strong></h2>
        <img class="img" src="${poke.image}" alt="" srcset="">
        <p>Weight: ${poke.weight}</p>
        <p>Height: ${poke.height}</p>
        <p>Type: ${poke.type}</p>
        </li>`).join('');
        pokebox.innerHTML+=PokemonHtml;
    }

// Button disabled function
function checkButton(){
    prev.style.display = 'inline-block'
    next.style.display = 'inline-block'
    if(start===0) {
        prev.style.display = 'none';
    }
    // else{
    //     prev.style.display
    // }
    // if(start+pageSize>pokemon)
}

// Previous button function
    prev.addEventListener('click', ()=>{
        if(start>=pageSize){
            start = start - pageSize;
            displayPokemon(pokemon);
        }
    })

// Next button function
next.addEventListener('click', ()=>{
    console.log(start)
    if(start+pageSize<pokemon.length){
        start = start + pageSize;
        displayPokemon(pokemon);
    }
})

// Proximity hover
//     const anchor = document.getElementById('anchor')
//     const rekt = anchor.getBoundingClientRect();
//     const anchorX = rekt.left + rekt.width /2;
//     const anchorY = rekt.top + rekt.height /2;
//     const eyes = document.querySelectorAll('#eye');

// document.addEventListener('mousemove', (e)=>{
//     // console.log(e) 

//     const mouseX = e.clientX;
//     const mouseY = e.clientY;

//     const angleDeg = angle(mouseX,mouseY,anchorX,anchorY); 
//     // console.log(angleDeg)

//     eyes.array.forEach (eye =>{
//         eye.style.transform = `rotate(${90 + angleDeg}deg)`; 
//         console.log("working")
//         anchor.style.filter = `hue-rotate(${angleDeg}deg)`;
//     });
// })

// function angle(cx, cy, ex, ey){
//     const dy = ey-cy;
//     const dx = ex-cx;
//     const rad = Math.atan2(dy,dx);
//     const deg = rad * 180 / Math.PI;
//     return deg;
// }


// Animation properties
const observer = new IntersectionObserver((entries)=>{
    console.log(entries)
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show')
        }else{
            entry.target.classList.remove('show')
        }
    })
})
const hiddenElements = document.querySelector(".hidden");
// hiddenElements.forEach((el)=> observer.observe(el));




// Toggle button property for mobile layout
const toggleLeft = document.querySelector('.left');
const toggleRight = document.querySelector('.right')
// const toggleShow = document.getElementById('toggle-showcase')

function showMenu(x){
    if(x.matches){
        toggleLeft.style.display='none'
        toggleRight.style.display='none'
        toggle.addEventListener('click',()=>{
            checkFirst();
            console.log("button clicked");
        })
        
        function checkFirst(){
            if(toggleLeft.style.display === 'none'){
                toggleLeft.style.display='block';
                toggleRight.style.display='block'
            }
            else{
                toggleLeft.style.display='none'
                toggleRight.style.display='none'
            }
        }    
    }
    else{
        toggleLeft.style.display='inline-block'
        toggleRight.style.display='inline-flex'
        toggleRight.style='text-align:center'
        console.log('show')
    }
}
const x = window.matchMedia("(max-width:700px)")
showMenu(x)

