import React, { useState, useEffect } from 'react';
import { useAuth } from './ConfiguracionUsuario'; // Importa el hook useAuth para acceder al contexto de autenticación
import { useNavigate } from "react-router-dom";
import './Usuario.css';

function Usuario() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [sesion, setSesion] = useState(true);
    const [registroCompletado, setRegistroCompletado] = useState(false); // Estado para controlar si el registro se ha completado
    const { iniciarSesionConGoogle, iniciarSesionConCorreoElectronico, registrarUsuarioConCorreoElectronico, cerrarSesion } = useAuth();

    function handleRegistro() {
        setSesion(false);
    }

    function handleInicioSesion() {
        setSesion(true);
    }

    async function handleGoogleLogin() {
        try {
            await iniciarSesionConGoogle();
            navigate("/")
            // Aquí podrías realizar acciones adicionales después de iniciar sesión con Google
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error.message);
        }
    }

    async function handleEmailLogin() {
        try {
            await iniciarSesionConCorreoElectronico(email, password);
            navigate("/")
            // Aquí podrías realizar acciones adicionales después de iniciar sesión con correo electrónico
        } catch (error) {
            console.error('Error al iniciar sesión con correo electrónico y contraseña:', error.message);
        }
    }

    async function handleEmailRegister() {
        try {
            await registrarUsuarioConCorreoElectronico(email, password);
            setRegistroCompletado(true);
            setEmail("")
            setPassword("")
            setSesion(true) // Actualiza el estado para indicar que el registro se ha completado
            // Aquí podrías realizar acciones adicionales después de registrar un nuevo usuario con correo electrónico
        } catch (error) {
            console.error('Error al registrar usuario con correo electrónico y contraseña:', error.message);
        }
    }

    useEffect(() => {
        let timer;
        if (registroCompletado) {
            timer = setTimeout(() => {
                setRegistroCompletado(false); // Oculta el mensaje después de 2 segundos
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [registroCompletado]);

    let resultado;
    let titulo;
    if (sesion) {
        titulo = <h1 className='h1'>Inicio de Sesión</h1>;
        resultado = <button className='btn btn-success' onClick={handleEmailLogin}>Iniciar Sesión</button>;
    } else {
        titulo = <h1 className='h1'>Registro</h1>;
        resultado = <button className='btn btn-success' onClick={handleEmailRegister}>Registrarse</button>;
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center gap-3'>
            <div className='divTotal d-flex flex-column justify-content-center align-items-center gap-3'>
                {titulo}
                <div className='d-flex gap-3'>
                    <button className={sesion ? 'btn nuevoBoton' : 'btn btn-success'} onClick={handleInicioSesion}>Log in</button>
                    <button className={!sesion ? 'btn nuevoBoton' : 'btn btn-success'} onClick={handleRegistro}>Sign up</button>
                </div>
                <div className='d-flex w-100 flex-column justify-content-center align-items-center gap-3'>
                    <div onClick={handleGoogleLogin} className='cursor'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 256 256"><path fill="#198754" d="M128 24a104 104 0 1 0 104 104A104 104 0 0 0 128 24m0 184a80 80 0 1 1 53.34-139.63a8 8 0 0 1-10.67 11.92A64 64 0 1 0 191.5 136H128a8 8 0 0 1 0-16h72a8 8 0 0 1 8 8a80.09 80.09 0 0 1-80 80"/></svg>
                    </div>
                    <div className='d-flex flex-column w-100 justify-content-center align-items-center gap-3'>
                        <input className='input' type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className='input' type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {resultado}
                    </div>
                </div>
                {registroCompletado && <p className="registro-completado">Registro completado. ¡Bienvenido!</p>} {/* Muestra el mensaje si el registro se ha completado */}
            </div>
        </div>
    );
}

export default Usuario;
