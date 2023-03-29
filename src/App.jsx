import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'

import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'

import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'
import { SpinProvider } from './context/SpinProvider'

function App() {
    

    return (
        <BrowserRouter>
            <SpinProvider>
                <AuthProvider>
                    <Routes>
                        {/* public */}
                        <Route path='/' element={<AuthLayout></AuthLayout>}>
                            <Route index element={<Login />} />
                            <Route path='registrar' element={<Registrar/>} />
                            <Route path='olvide-password' element={<OlvidePassword/>} />
                            <Route path='olvide-password/:token' element={<NuevoPassword/>} />
                            <Route path='confirmar/:id' element={<ConfirmarCuenta/>} />
                        </Route>
                        {/* private */}
                        <Route path='/admin' element={<RutaProtegida></RutaProtegida>}>
                            <Route index element={<PacientesProvider><AdministrarPacientes /></PacientesProvider>} />
                            <Route path='perfil' element={<EditarPerfil />} />
                            <Route path='cambiar-password' element={<CambiarPassword />} />
                        </Route>
                    </Routes>
                </AuthProvider>
            </SpinProvider>
        </BrowserRouter>
    )
}

export default App
