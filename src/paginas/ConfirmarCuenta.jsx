import {useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import Spinner from '../components/Spinner'
import clienteAxios from '../config/axios'
import useSpin from '../hooks/useSpin'

const ConfirmarCuenta = () => {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})
    const {spinning, setSpinning} = useSpin()
    const params = useParams()
    const {id} = params

    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                setSpinning(true)
                const url = `/veterinarios/confirmar/${id}`
                const {data} = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg
                })
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            } finally {
                setSpinning(false)
            }
            setCargando(false)
        }
        confirmarCuenta()
    }, [])
    
    return (
      <>
            <div>
                <h1 className="text-indigo-600 font-black text-6xl">Confirma tu Cuenta y Comienza a Administrar {""} <span className="text-black">tus pacientes</span></h1>
            </div>
            <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
                {!cargando && <Alerta 
                    alerta={alerta}
                />}
                {cuentaConfirmada && (
                    <Link to="/" className='block text-center my-5 text-gray-500 hover:text-gray-800'>Iniciar Sesión</Link>
                )}
            </div>
            {spinning && <Spinner />}
      </>
    )
  }
  
  export default ConfirmarCuenta