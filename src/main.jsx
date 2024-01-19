import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App/index.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const callPokemons = async function(){
  const url = "https://pokeapi.co/api/v2/pokemon/?limit=151"

  await fetch(url)
  .then(response => response.json()) 
  .then((json) => {
    
    const pokemon = json.results;
    const root = document.querySelector(".container")
    console.log(pokemon)

    pokemon.forEach(poke => {
       fetch(poke.url)
      .then(res => res.json())
      .then((json)=>{
        console.log(json)
        const img = document.createElement("img")
        img.setAttribute("src", json.sprites.other["official-artwork"].front_default)

        root.appendChild(img)
      })
    });
  })
  .catch(err => console.log(err));
}

//callPokemons()

