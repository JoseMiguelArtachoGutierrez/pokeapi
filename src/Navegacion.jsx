import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './ConfiguracionUsuario'; // Importa useAuth
import { useNavigate } from "react-router-dom";
import logo from './assets/292.png'
import './Navegacion.css';

function Navegacion() {
    const { usuario, cerrarSesion } = useAuth(); // Obtén el usuario del contexto de autenticación y la función de cerrar sesión
    const navigate = useNavigate();
    async function cerrarSesionSeguro() {
        navigate("/");
        await cerrarSesion()
    }
    return (
        <header className="contenedor__header d-flex w-100 justify-content-between align-items-center">
            <div className="logo"><img className="h-100 w-100" src={logo}/></div>
            <ul className="d-flex w-75 justify-content-between align-items-center">
                <li><Link to="/">Inicio</Link></li>
                {usuario ? <li><Link to="/juego">Juego</Link></li> : ""}
                <li><Link to="/pokedex">Pokedex</Link></li>
                <li>
                    {usuario ? (
                        <div className="dropdown">
                            <button className="btn btn-success dropdown-toggle logueado" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                {usuario.photoURL ? (
                                    <img src={usuario.photoURL} alt="Imagen de perfil" className="imagenPerfil" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" className='svgUsuario' viewBox="0 0 24 24"><g fill="none" stroke="#198754" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6"/><path d="M2 12h7m6 0h7"/></g></svg>
                                )}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li><button className="dropdown-item" onClick={cerrarSesionSeguro}>Cerrar Sesión</button></li>
                            </ul>
                        </div>
                    ) : (
                        <Link to="/usuario">
                            <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="usuario" viewBox="0 0 24 24">
                                <path fill="#ffffff" d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/>
                            </svg>
                        </Link>   
                    )}
                </li>
            </ul>
        </header>
    );
}

export default Navegacion;

