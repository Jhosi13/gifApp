import React  from 'react'
import {nanoid} from 'nanoid'
import {firebase} from '../firebase';

const Formulario = () => {
    const [usuario, setUsuario] = React.useState('')
    const [correo, setCorreo] = React.useState('')
    const [contra, setContra] = React.useState('')

    const [listaPersonas, setListaPersonas] = React.useState([])
    
    const [id, setId] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
         const obtenerDatos= async () =>{
             try{
                 const db = firebase.firestore()
                 const data = await db.collection('usuarios').get()
                 const arrayData= data.docs.map(item => (
                     {
                         id:item.id, ...item.data()
                     }
                 ))
                 //console.log(arrayData)

                 listaPersonas(arrayData)

             }catch(error){
                 console.log(error)
             }
         }

         obtenerDatos();
    })


    const guardarInfo = async (e) =>{
        e.preventDefault()

        if(!usuario.trim()){
           setError('Escriba el usuario')
            return
        }

        if(!correo.trim()){
            setError('Escriba su correo')
            return
        }
        if(!contra.trim()){
          setError('Escriba su contraseña')
          return
        }
        try{
            const db = firebase.firestore()
            const nuevaPersona = {
                Usuario: usuario,
                Correo: correo,
                Contra: contra
            }

            await db.collection('usuarios').add(nuevaPersona)

            setListaPersonas([
                ...listaPersonas,
                {id:nanoid(), Usuario: usuario,
                    Correo: correo,
                    Contra: contra}
            ])

            e.target.reset()
            setUsuario('')
            setCorreo('')
            setContra('')
            
            setError(null)
        }catch(error){
            console.log(error)
        }
        
    }

    const editar = item =>{
        setUsuario(item.Usuario)
        setCorreo(item.Correo)
        setContra(item.Contra)
        
        setModoEdicion(true)
        setId(item.id)
    }

    const editarPersonas = async e =>{
        e.preventDefault()
        
         if(!usuario.trim()){
            setError('Escriba el usuario')
             return
         }
 
         if(!correo.trim()){
             setError('Escriba su correo')
             return
         }
         if(!contra.trim()){
           setError('Escriba su contraseña')
           return
         }
         
         try{
             const db = firebase.firestore()
             await db.collection('usuarios').doc(id).update({
                Usuario: usuario,
                Correo: correo,
                Contra: contra
             })
        
             const arrayEditado = listaPersonas.map(
                item => item.id ===id ? {id:id, Usuario: usuario,
                    Correo: correo,
                    Contra: contra}: item
            )
    
            setListaPersonas(arrayEditado)
            setUsuario('')
            setCorreo('')
            setContra('')
            setId('')
            setModoEdicion(false)
            setError(null)

         }catch(error){
             console.log(error)
         }
    }

    const eliminar = async id =>{
        try{
            const db = firebase.firestore()
            await db.collection('usuarios').doc(id).delete()
            const aux = listaPersonas.filter(item => item.id !== id)
            setListaPersonas(aux)
        }catch(error){
            console.log(error)
        }

        
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setUsuario('')
        setId('')
        setCorreo('')
        setContra('')
        setError(null)
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'> </h1>

        <hr/>
        <div className='row'>
            <div className='col-8'>
                
                <ul className='list-group'>
                    {
                        listaPersonas.map(item=>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.Usuario}-{item.Correo}-
                                {item.Contra}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>
                                Eliminar
                                </button>
                                <button className='btn btn-warning btn-sm float-end' onClick={() => editar(item)}>
                                Editar
                                </button>
                            </li>    
                        ))
                    }
                </ul>
            </div>
            <div className='col-4'>
                <form onSubmit ={modoEdicion ? editarPersonas: guardarInfo}>
                    {
                        error ? <span className='text-danger'>{error}</span> : null
                    }
                    <input 
                    className='form-control mb-2'
                    type = "text"
                    placeholder='Ingrese usuario'
                    onChange={(e)=> setUsuario(e.target.value)}
                    value = {usuario}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese correo electronico'
                    type="text"
                    onChange={(e)=> setCorreo(e.target.value)}
                    value={correo}
                    />
                    <input 
                    className='form-control mb-2'
                    type = "password"
                    placeholder='Ingrese contraseña'
                    onChange={(e)=> setContra(e.target.value)}
                    value = {contra}
                    />    
                    {
                        modoEdicion ?
                        (
                            <>
                                <button 
                                className='btn btn-warning btn-block'
                                type='submit'
                                >Editar</button>
                                <button 
                                className='btn btn-dark btn-block mx-2'
                                onClick={() => cancelar()}
                                >Cancelar</button>
                            </>
                        )
                        :
                            <button 
                            className='btn btn-primary btn-block'
                            
                            >Registrarse!</button>
                            
                            
                        }
                </form>
            </div>
        </div>
    </div>
  )   
}

export default Formulario