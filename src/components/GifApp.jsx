import React from 'react'
import { useState } from 'react'
import AgregarBusqueda from './AgregarBusqueda';
import GifContenedor from './GifContenedor';
import Formulario from './Formulario';

const GifApp = ({ categorias = ['simpson'] }) => {
  const [categoriasBusqueda, setCategoriasBusqueda] = useState(categorias);
  return (
    <>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
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