import { useState, useEffect } from "react"
import Error from "./Error"

const Formulario = ( { pacientes, setPacientes, paciente, setPaciente }) => {
    //nombre de la variable, y funcion que modifica dicha variable
    //Hook => valor inicial
    const [ nombre, setNombre ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fecha, setFecha ] = useState('');
    const [ sintomas, setSintomas ] = useState('');

    const [ error, setError ] = useState(false);

    //se ejecuta solo cuando paciente haya cambiado
    useEffect(()=>{
        if (Object.keys(paciente).length > 0){
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]) 

    const generarID = () => {
        const random = Math.random().toString().substr(2)
        const fecha = Date.now().toString(36)

        return random + fecha
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        if ([ nombre, propietario, email, fecha, sintomas ].includes('')) {
            setError(true)
            return
        }

        setError(false)

        //obj Pacientes
        const objPacientes = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            // id:generarID()
        }

        if (paciente.id) {
            //Edit Registro
            objPacientes.id = paciente.id

            const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objPacientes : pacienteState )
            setPacientes(pacientesActualizados)

            setPaciente({})
        }else{
            //New Registro
            objPacientes.id = generarID()
            setPacientes([...pacientes, objPacientes]);

        }

        //reset form
        setNombre('')
        setPropietario('')
        setEmail('')
        setFecha('')
        setSintomas('')
    }
    

    return (
        <div className="md:w-1/2 lg:w-2/5 mx-5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''} 
                <span className="text-indigo-600 font-bold">
                    Administralos
                </span>
            </p>

            {   error && <Error> <p>Todos los campos son obligatorios</p> </Error> }


            <form onSubmit={ handleSubmit } className="bg-white shadow-md rounded-lg py-10 px-5 mb-10">
                <div className="mb-5">
                    <label className="block text-gray-700  font-bold uppercase" htmlFor="mascota">Nombre Mascota</label>

                    <input type="text" placeholder="Nombre Mascota" value={ nombre } onChange={ (e)=> setNombre(e.target.value) }
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="mascota" />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700  font-bold uppercase" htmlFor="Propietario">Nombre del Propietario</label>

                    <input type="text" placeholder="Nombre del Propietario" value={ propietario } onChange={ (e)=> setPropietario(e.target.value) }
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="Propietario" />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700  font-bold uppercase" htmlFor="email">E-mail del Propietario</label>

                    <input type="email" placeholder="E-mail del Propietario" value={ email } onChange={ (e)=> setEmail(e.target.value) }
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="email" />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700  font-bold uppercase" htmlFor="alta">Fecha de alta</label>

                    <input type="date" value={ fecha } onChange={ (e)=> setFecha(e.target.value) }
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md" id="alta" />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700  font-bold uppercase" htmlFor="sintomas">Describe los síntomas</label>

                    <textarea rows={8} type="text" placeholder="Describe los síntomas" value={ sintomas } onChange={ (e)=> setSintomas(e.target.value) }
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md resize-none" id="sintomas" />
                </div>

                <input type="submit" 
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors" 
                    value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}/>
            </form>
        </div>
    )
}

export default Formulario