import {useState, useEffect, createContext} from 'react'
import clienteAxios from '../config/axios'
import useSpin from '../hooks/useSpin'

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
    const {setSpinning} = useSpin()

    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token')
            if(!token) {
                setCargando(false)
                return
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config)
                setAuth(data)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            } 
            setCargando(false)
        }
        autenticarUsuario()
    }, [])

    const cerrarSesion = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const actualizarPerfil = async datos => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            setSpinning(true)
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)
            return {
                msg: 'Almacenado correctamente'
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        } finally {
            setSpinning(false)
        }
    }

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem('token')
        if(!token) {
            setCargando(false)
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            setSpinning(true)
            const url = '/veterinarios/actualizar-password'
            const {data} = await clienteAxios.put(url, datos, config)
            console.log(data)
            return {
                msg: data.msg
            }
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        } finally {
            setSpinning(false)
        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext