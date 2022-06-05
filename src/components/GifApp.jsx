import React from 'react'
import { useState } from 'react'
import AgregarBusqueda from './AgregarBusqueda';
import GifContenedor from './GifContenedor';
import Formulario from './Formulario';

const GifApp = ({ categorias = ['simpson'] }) => {
  const [categoriasBusqueda, setCategoriasBusqueda] = useState(categorias);
  return (
    <>
    
      <div><h1>Gif's Lovers</h1></div>
      <h3>Registre su perfil con su tematica de gifs favorita</h3>
      <div><Formulario /></div>
      <div>
        <AgregarBusqueda setCategoriasBusqueda={setCategoriasBusqueda} />
        <hr />

        <ol>
          {
            categoriasBusqueda.map(categoriaBusqueda => (
              <GifContenedor
                key={categoriaBusqueda}
                valorBusqueda={categoriaBusqueda}
              />
            ))
          }
        </ol>
      </div>
    </>
  )
}

export default GifApp