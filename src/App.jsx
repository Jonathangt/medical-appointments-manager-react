import { useState, useEffect } from "react";

import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"

function App() {
  //const [count, setCount] = useState(0)

  //all
  const [ pacientes, setPacientes ] = useState([])
  //edit
  const [ paciente, setPaciente ] = useState([])

  //cuando se le pasa un arreglo vacio se ejecuta solo una vez
  useEffect(() => {
    const getLocalStorage = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? [];
      setPacientes(pacientesLS);
    }

    getLocalStorage()
  }, [])

  //se ejecutara cada vez que haya un cambio en pacientes
  useEffect(()=>{
    localStorage.setItem('pacientes', JSON.stringify( pacientes ))
  }, [pacientes])


  const eliminarPaciente = (id) => {
    const pacientesActualizados = pacientes.filter( p => p.id !== id)
    setPacientes(pacientesActualizados);
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      
      <div className="mt-12 md:flex">
        <Formulario pacientes={ pacientes } setPacientes={ setPacientes } paciente={ paciente } setPaciente={ setPaciente } />
        <ListadoPacientes pacientes={ pacientes } setPaciente={ setPaciente } eliminarPaciente={ eliminarPaciente }/>
      </div>
    </div>
  )
}

export default App
