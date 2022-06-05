import React, { useState } from 'react'
import AgregarBusqueda from './AgregarBusqueda'

const GifApp = () => {
    const [busqueda, setBusqueda] = useState(['Simpsons'])
  return (
    <>
        <h2>Aplicacion de Gif</h2>
        <AgregarBusqueda/>
    </>
  )
}

export default GifApp