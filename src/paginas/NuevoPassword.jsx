import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import Spinner from "../components/Spinner"
import clienteAxios from "../config/axios"
import useSpin from "../hooks/useSpin"

const NuevoPassword = () => {
    const [password, setPassword] = useState('')
    const[alerta, setAlerta] = useState({})
    const [tokenValido, setTokenValido] = useState(false)
    const [passwordModificado, setPasswordModificado] = useState(false)
    const {spinning, setSpinning} = useSpin()
    const params = useParams()

    const {token} = params

    useEffect(() => {
        const comprobarToken = async () => {
            try {
                setSpinning(true)
                await clienteAxios(`/veterinarios/olvide-password/${token}`)
                setAlerta({
                    msg: 'Coloca tu nuevo Password'
                })
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: 'Hubo un error con el enlace',
                    error: true
                })
            } finally {
                setSpinning(false)
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(password.length < 6) {
            setAlerta({
                msg: 'El Password debe ser mínimo de 6 caracteres',
                error: true
            })
            return
        }
        try {
            setSpinning(true)
            const url = `/veterinarios/olvide-password/${token}`
            const {data} = await clienteAxios.post(url,{password})
            setAlerta({
                msg: data.msg
            })
            setPasswordModificado(true)
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setSpinning(false)
        }
    }
    const {msg} = alerta
    return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra {""} <span className="text-black">tus pacientes</span></h1>
        </div>
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
            {msg && <Alerta 
                alerta={alerta}
            />}
            {tokenValido && 
            <>
            <form onSubmit={handleSubmit}>
                <div className="my-5">
                    <label htmlFor="" className="uppercase text-gray-600 block text-xl font-bold">Nuevo Password</label>
                    <input type="password" placeholder="Tu Password" className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <input type="submit" value="Guardar Nuevo Password" className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto" />
            </form>
            {passwordModificado && 
            <Link to="/" className='block text-center my-5 text-gray-500 hover:text-gray-800'>Iniciar Sesión</Link>
            }
            </>
            }
        </div>
        {spinning && <Spinner />}
    </>
    )
}

export default NuevoPassword