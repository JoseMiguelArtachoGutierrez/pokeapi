import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Pokedex from './Pokedex.jsx'
import DetallesPokemon from './DetallesPokemon.jsx'
import Navegacion from './Navegacion.jsx'
import Juego from './Juego.jsx'
import Usuario from './Usuario.jsx'
import { AuthProvider } from './ConfiguracionUsuario.jsx';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <Navegacion></Navegacion>
      <App></App>
    </>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  },
  {
    path: "/pokedex",
    element: 
    <>
      <Navegacion></Navegacion>
      <Pokedex></Pokedex>
    </>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  },
  {
    path: "/detalles/:id",
    element: 
    <>
      <Navegacion></Navegacion>
      <DetallesPokemon></DetallesPokemon>
    </>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  },
  {
    path: "/juego",
    element: 
    <>
      <Navegacion></Navegacion>
      <Juego></Juego>
    </>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  },
  {
    path: "/usuario",
    element: 
    <>
      <Navegacion></Navegacion>
      <Usuario></Usuario>
    </>,
    errorElement: <h1 className='text-center'>Ruta no válida</h1>
  }
  
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
)
