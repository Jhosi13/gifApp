import React, { useState } from 'react'

const GifContenedor = ({valorBusqueda}) => {
  const [listaGifs, setListasGifs] = useState([])
  
  const obtenerGifs = async(valorBusqueda)=>{
    const url = 'https://api.giphy.com/v1/gifs/search?api_key=pYoqpLq4uejVNc1pTJmSSgHC8s8QgRFH&q=simpsons&limit=5'
    const resp = await fetch(url);
    const {data} = await resp.json();
    return data;
  }

  const traerGifs = ()=>{
    setListasGifs(obtenerGifs);
  }
  return (
    <>
      <h3> Busqueda {valorBusqueda}</h3>
      <button onClick={traerGifs()}>Traer gifts</button>
      <div>
        <ul>
        {
          listaGifs.map(img => (
            <li>img.id</li>
          ))
        }
        </ul>
        
      </div>
    </>
  )
}

export default GifContenedor