//import { useEffect } from "react"
import Pacientes from '../components/Paciente'

const ListadoPacientes = ( { pacientes, setPaciente, eliminarPaciente }) => {

    /* useEffect(()=>{
        if (pacientes.length > 0) {
            console.log('New Paciente');
        }
    }, [pacientes]) */

    return(
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
            { pacientes && pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Administra tus {''}
                        <span className="text-indigo-600 font-bold">Administra tus pacientes y citas</span>
                    </p>
                    { pacientes.map((p) => <Pacientes paciente={ p } key={ p.id } setPaciente={ setPaciente } eliminarPaciente={ eliminarPaciente }/> )}
                </>

            ) : 
                <>
                    <h2 className="font-black text-3xl text-center">No hay Pacientes</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agrefando pacientes {''}
                        <span className="text-indigo-600 font-bold">y se listaran en este apartado.</span>
                    </p>
                </> 
            }
        </div>
    )
}

export default ListadoPacientes