import React, {useState} from 'react'

const AgregarBusqueda = () => {

  const [valorBusqueda, setValorBusqueda] = useState('');
  const [listaGifs, setListaGifs] = useState([])
  
  const editarBusqueda = (e)=>{
    setValorBusqueda(e.target.value)
}
const envioBusqueda = async(e)=>{
    e.preventDefault();
    const gifs = await obtenerGifs();
    setListaGifs(gifs);
    
}
  
  const obtenerGifs = async()=>{
    const url = `https://api.giphy.com/v1/gifs/search?api_key=pYoqpLq4uejVNc1pTJmSSgHC8s8QgRFH&q=${valorBusqueda}&limit=5`;
    const resp = await fetch(url);
    const {data} = await resp.json();
    return data;
  }

 
    
  return (
    <>
        <form onSubmit={envioBusqueda}>
        <input
        type= "text"
        value={valorBusqueda}
        onChange={editarBusqueda}>
        </input>
    </form>
     <div>
       <ul>
       {
         listaGifs.map(({id, images}) => (
           <li key={id}>
             <img src={images.downsized_medium.url } alt={'test'}/>
            </li>
         ))
       }
       </ul>
     </div>
    </>

  )
}

export default AgregarBusqueda