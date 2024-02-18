import React, { useState, useEffect } from "react";
import { db } from "./Firebase";
import { collection, addDoc, setDoc,updateDoc,getDocs,query,where } from 'firebase/firestore';
import nada from './assets/sin_nada.png'
import Acero from './assets/tipos/tipoAcero.svg'
import Agua from './assets/tipos/tipoAgua.svg'
import Bicho from './assets/tipos/tipoBicho.svg'
import Dragon from './assets/tipos/tipoDragon.svg'
import Electrico from './assets/tipos/tipoElectrico.svg'
import Fantasma from './assets/tipos/tipoFantasma.svg'
import Fuego from './assets/tipos/tipoFuego.svg'
import Hada from './assets/tipos/tipoHada.svg'
import Hielo from './assets/tipos/tipoHielo.svg'
import Lucha from './assets/tipos/tipoLucha.svg'
import Normal from './assets/tipos/tipoNormal.svg'
import Planta from './assets/tipos/tipoPlanta.svg'
import Psiquico from './assets/tipos/tipoPsiquico.svg'
import Roca from './assets/tipos/tipoRoca.svg'
import Siniestro from './assets/tipos/tipoSiniestro.svg'
import Tierra from './assets/tipos/tipoTierra.svg'
import Veneno from './assets/tipos/tipoVeneno.svg'
import Volador from './assets/tipos/tipoVolador.svg'

import { useAuth } from './ConfiguracionUsuario';
import './Juego.css';

function Juego() {

    const [pokemon,setPokemon] = useState();
    const [imagen, setImagen] = useState(true);
    const [tipo1, setTipo1] = useState("");
    const [tipo2, setTipo2] = useState("");
    const [acierto1,setAcierto1] =useState(false);
    const [acierto2,setAcierto2] =useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true)
    const [vidas, setVidas] = useState(3);

    const { usuario } = useAuth(); 
    const uid = usuario.uid;
    const email =usuario.email;
     function guardarPuntuacion(uid,email) {
        try {
            const userQuery = query(collection(db, 'puntuaciones'), where("uid", "==", uid));
            getDocs(userQuery).then((data)=>{
                
                if (data.size > 0) {
                    // Documento encontrado, actualiza la puntuación
                    const userDoc = data.docs[0].ref;
                    const existingPoints = data.docs[0].data().score;

                    if (score > existingPoints) {
                        return updateDoc(userDoc, { score: score });
                    }
                } else {
                    return addDoc(collection(db, 'puntuaciones'), {
                        uid: uid,
                        email:email,
                        score: score
                    });
                }
            })
        } catch (error) {
            console.error('Error al guardar la puntuación:', error);
        }
    }
    
    function tipoSeleccionado(e) {
        let tipo= e.target.parentNode.id
        comprobacion(tipo)
    }
    function comprobacion(tipo) {
        let correcto=false
        if (pokemon.types[0].type.name==tipo) {
            
            correcto=true
            colocarTipo(tipo,1)
        }
        if (pokemon.types[1] && pokemon.types[1].type.name==tipo) {
            
            correcto=true
            colocarTipo(tipo,2)
        }
        if (!correcto) {
           console.log("fallo") 
           setVidas(vidas-1)
        }
    }
    function colocarTipo(tipo,posicion) {
        let imagen =<div className="tipos">{tipoPokemonImagen(tipo)}</div>
        if (posicion==1) {
            setTipo1(imagen)
            setAcierto1(true)
        }else if (posicion==2) {
            setTipo2(imagen)
            setAcierto2(true)
        }
        if (!pokemon.types[1]) {
            setAcierto2(true)
        }
    }
    async function volverAIntentar() {
        await siguientePokemon()
        setVidas(3)
        setScore(0)
    }
    function numeroRandom() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    function tipoPokemonImagen(tipo) {
        let resultado="";
        switch (tipo) {
            case "fairy":
                resultado= <img className="w-100 h-100" src={Hada}/>
                break;
            case "bug":
                resultado= <img className="w-100 h-100" src={Bicho}/>
                break;
            case "normal":
                resultado= <img className="w-100 h-100" src={Normal}/>
                break;
            case "flying":
                resultado= <img className="w-100 h-100" src={Volador}/>
                break;
            case "poison":
                resultado= <img className="w-100 h-100" src={Veneno}/>
                break;
            case "grass":
                resultado= <img className="w-100 h-100" src={Planta}/>
                break;
            case "water":
                resultado= <img className="w-100 h-100" src={Agua}/>
                break;
            case "fire":
                resultado= <img className="w-100 h-100" src={Fuego}/>
                break;
            case "ghost":
                resultado= <img className="w-100 h-100" src={Fantasma}/>
                break;
            case "fighting":
                resultado= <img className="w-100 h-100" src={Lucha}/>
                break;
            case "dark":
                resultado= <img className="w-100 h-100" src={Siniestro}/>
                break;
            case "rock":
                resultado= <img className="w-100 h-100" src={Roca}/>
                break;
            case "ground":
                resultado= <img className="w-100 h-100" src={Tierra}/>
                break;
            case "electric":
                resultado= <img className="w-100 h-100" src={Electrico}/>
                break;
            case "steel":
                resultado= <img className="w-100 h-100" src={Acero}/>
                break;
            case "dragon":
                resultado= <img className="w-100 h-100" src={Dragon}/>
                break;
            case "psychic":
                resultado= <img className="w-100 h-100" src={Psiquico}/>
                break;
            case "ice":
                resultado= <img className="w-100 h-100" src={Hielo}/>
                break;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
            default:
                break;
        }
        return resultado
    }

    function mostrarTodosLosTipos() {
        return <div className="d-flex flex-wrap w-100 g-5">
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="fairy">{tipoPokemonImagen("fairy")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="ice">{tipoPokemonImagen("ice")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="rock">{tipoPokemonImagen("rock")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="fire">{tipoPokemonImagen("fire")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="psychic">{tipoPokemonImagen("psychic")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="dragon">{tipoPokemonImagen("dragon")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="steel">{tipoPokemonImagen("steel")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="electric">{tipoPokemonImagen("electric")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="ground">{tipoPokemonImagen("ground")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="dark">{tipoPokemonImagen("dark")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="fighting">{tipoPokemonImagen("fighting")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="ghost">{tipoPokemonImagen("ghost")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="water">{tipoPokemonImagen("water")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="grass">{tipoPokemonImagen("grass")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="poison">{tipoPokemonImagen("poison")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="flying">{tipoPokemonImagen("flying")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="bug">{tipoPokemonImagen("bug")}</div>
            <div className="contenedor__tipo" onClick={tipoSeleccionado} id="normal">{tipoPokemonImagen("normal")}</div>
        </div>
        
    }
    function siguientePokemon() {
        setScore(score+1)
        
        setAcierto1(false)
        setAcierto2(false)
        setLoading(true)
        setTipo1(<div className="imagenBlanco"><img className="w-100 h-100" src={nada}/></div>)
        setTipo2(<div className="imagenBlanco"><img className="w-100 h-100" src={nada}/></div>)
                
        let id=numeroRandom()
        const fetchData = async () => {
            try {
              const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
                const datosPokemon = await response.json();
                console.log(datosPokemon);
                setPokemon(datosPokemon);
                setTipo1(<div className="imagenBlanco"><img className="w-100 h-100" src={nada}/></div>)
                setTipo2(<div className="imagenBlanco"><img className="w-100 h-100" src={nada}/></div>)
                setLoading(false)
            } catch (error) {
              console.log(error.message)
            }
        };
        fetchData();
    }
    function mostrarImagen1() {
        setImagen(false);
    }
    function mostrarImagen2() {
        setImagen(true);
    }
    useEffect(() => {
        let id=numeroRandom()
        const fetchData = async () => {
            try {
              const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
                const datosPokemon = await response.json();
                console.log(datosPokemon);
                setPokemon(datosPokemon);
                setTipo1(<div className="imagenBlanco"><img className="w-100 h-100" src={nada}/></div>)
                setTipo2(<div className="imagenBlanco"><img className="w-100 h-100" src={nada}/></div>)
                setLoading(false)
            } catch (error) {
              console.log(error.message)
            }
        };
        fetchData();
    }, []);
    let resultado=<div className=" total w-100 h-100 d-flex justify-content-center align-items-center">
                    <div className="spinner-border text-success " role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
    if (!loading) {
        let todosLosTipos= mostrarTodosLosTipos()
        let tipo1Y2=""
        let mostrarVidas=""
        let mensaje=""
        if (vidas==3) {
            mostrarVidas=<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#198754" d="m12 21.35l-1.45-1.32C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5c0 3.77-3.4 6.86-8.55 11.53z"/></svg>
        }else if (vidas==2) {
            mostrarVidas=<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="#198754" d="M12.025 21.925q-3.35-3.375-5.337-5.45t-3.025-3.45q-1.038-1.375-1.35-2.35T2 8.5q0-2.3 1.6-3.9T7.5 3q1.125 0 2.175.412T11.55 4.6L10 10h3l-.85 8.375L15 9h-3l1.775-5.3q.625-.35 1.313-.525T16.5 3q2.3 0 3.9 1.6T22 8.5q0 1.2-.325 2.2T20.3 13.088q-1.05 1.387-3.025 3.45t-5.25 5.387"/></svg>
        }else if (vidas==1) {
            mostrarVidas=<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256"><g fill="#198754"><path d="M232 94c0 66-104 122-104 122S24 160 24 94a54 54 0 0 1 54-54c22.59 0 41.94 12.31 50 32c8.06-19.69 27.41-32 50-32a54 54 0 0 1 54 54" opacity=".2"/><path d="M178 32c-20.65 0-38.73 8.88-50 23.89C116.73 40.88 98.65 32 78 32a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 220.66 240 164 240 94a62.07 62.07 0 0 0-62-62m-50 174.8C109.74 196.16 32 147.69 32 94a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8"/></g></svg>
        }else{
            mostrarVidas=<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256"><path fill="#198754" d="M221.6 58.38a56.06 56.06 0 0 0-79.12-.08L128 71.78L113.52 58.3a56 56 0 0 0-79.15 79.25l89.36 90.66a6 6 0 0 0 8.54 0l89.33-90.62a56 56 0 0 0 0-79.21m-8.52 70.75L128 215.45L42.89 129.1a44 44 0 0 1 62.22-62.23a1.07 1.07 0 0 0 .16.14l18.64 17.36a6 6 0 0 0 8.18 0L150.73 67a1.07 1.07 0 0 0 .16-.14a44 44 0 1 1 62.19 62.26Z"/></svg>
            mensaje=<h1>Derrota</h1>
            todosLosTipos=<button onClick={volverAIntentar} className="btn btn-success">Volver a intentar</button>
            guardarPuntuacion(uid,email)
        }
        if (acierto1 && acierto2) {
            
            mensaje=<h1>Bien hecho</h1>
            setTimeout(() => {
                
                siguientePokemon()
            }, 1000);
        }
        if (pokemon.types[1]) {
            tipo1Y2 = <div className="d-flex justify-content-center align-items-center gap-3">{tipo1}{tipo2}</div>
        }else{
            
            tipo1Y2=<div className="d-flex justify-content-center align-items-center gap-3">{tipo1}</div>
            
        }
        resultado= <div className="total d-flex flex-column justify-content-center align-items-center">
            <div className="mensaje">
                {mensaje}
            </div>
            <div className="d-flex  justify-content-center align-items-center gap-3">
                <h1 className="otroH1">Dificultad</h1>
                <div className="d-flex justify-content-center w-50 gap-2">
                    <button className={imagen ? "btn nuevoBoton": "btn btn-success"} onClick={mostrarImagen2}>Normal</button>
                    <button className={!imagen ? "btn nuevoBoton": "btn btn-success"} onClick={mostrarImagen1}>Dificil</button>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center gap-3">
                <p className="p">{score}</p>
                <h1 className="h1">Adivina el tipo </h1>
                {mostrarVidas}   
            </div>
                    
                    <div className="imagenPokemon"><img className="h-100 w-100" src={imagen ? pokemon.sprites.other["official-artwork"].front_default : pokemon.sprites.other["official-artwork"].front_shiny} alt="Pokemon Artwork" /></div>
                    {tipo1Y2}
                    <span className="linea"></span>
                    {todosLosTipos}
                </div>
        
    }
    
    return resultado;
}

export default Juego;
