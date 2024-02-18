import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Chart from 'chart.js/auto';
import './DetallesPokemon.css';

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

function DetallesPokemon() {
    const {id} = useParams();
    const [pokemon,setPokemon] = useState();
    const [imagen, setImagen] = useState(true);
    const [loading, setLoading] = useState(true)
    const [listaH,setListaH] =useState("")

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
    function detallesHabilidad(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
        
        
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+id);
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
                const datosPokemon = await response.json();
                console.log(datosPokemon);
                setPokemon(datosPokemon);
                renderRadarChart(datosPokemon.stats);
            } catch (error) {
              console.log(error.message)
            }
        };
        fetchData();
    }, []);
    
    const renderRadarChart = (stats) => {
        const ctx = document.getElementById('radarChart').getContext('2d');
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: stats.map(stat => stat.stat.name),
                datasets: [{
                    label: 'Stats',
                    data: stats.map(stat => stat.base_stat),
                    backgroundColor: 'rgba(25, 135, 84, 0.2)',
                    borderColor: 'rgba(15, 84, 52, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
        setLoading(false);
    };
    function mostrarImagen1() {
      setImagen(false);
    }
    function mostrarImagen2() {
      setImagen(true);
    }
    let listaT=""
    if (!loading) {
        let tipo1=tipoPokemonImagen(pokemon.types[0].type.name)
        if (pokemon.types[1]!=null) {
            let tipo2=tipoPokemonImagen(pokemon.types[1].type.name)
            listaT=<div className="d-flex">
                <div className="tipo">{tipo1}</div><div className="tipo">{tipo2}</div>
            </div>
        }else{
            listaT=<div className="contenedorTipos">{tipo1}</div>
        }

        /* MAPA */
        Promise.all(pokemon.abilities.map(async (habilidad, index) => {
            try {
                let p = "";
                let detalle = await detallesHabilidad(habilidad.ability.url);
                let efecto = "";
                detalle.effect_entries.forEach(element => {
                    if (element.language.name === "en") {
                        efecto = element.effect;
                    }
                });
                if (habilidad.is_hidden) {
                    p = <p >{habilidad.ability.name.toUpperCase()} [Oculta]</p>;
                } else {
                    p = <p >{habilidad.ability.name.toUpperCase()}</p>;
                }
                return (
                    <div className="d-flex justify-content-center align-items-center" key={index}>
                        {p}
                        <div className="dropdown">
                            <button className="dropdown-toggle contenedorInterrogacion"  id={"dropdownMenuButton" + index} data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="w-100 h-100" viewBox="0 0 24 24"><g fill="none"><circle cx="12" cy="12" r="10" stroke="#198754" strokeWidth="1.5" opacity="0.5" /><path stroke="#198754" strokeLinecap="round" strokeWidth="1.5" d="M10.125 8.875a1.875 1.875 0 1 1 2.828 1.615c-.475.281-.953.708-.953 1.26V13" /><circle cx="12" cy="16" r="1" fill="#198754" /></g></svg>
                            </button>
                            <ul className="dropdown-menu bg-success" aria-labelledby={"dropdownMenuButton" + index}>
                                <li className="prueba text-white">{efecto}</li>
                                
                            </ul>
                        </div>
                    </div>
                );
            } catch (error) {
                console.error('Error:', error);
                return null;
            }
        }))
        .then(resultados => {
            setListaH(resultados);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }

    return (
        <section className=" contenedor-global d-flex flex-column">

            <div className="d-flex justify-content-evenly align-items-center" >
                <h1 >Nº {id}</h1>
                <h1>{pokemon && pokemon.name.toUpperCase()}</h1>
            </div>
            <div className="d-flex contenedor align-items-center justify-content-evenly">
                <div className="d-flex justify-content-center align-items-center ">
                <button className="boton"  onClick={mostrarImagen2}><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="w-100 h-100" viewBox="0 0 24 24"><path fill="#157347" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"/></svg></button>
                <div className="imagen"><img className="h-100 w-100" src={pokemon && (imagen ? pokemon.sprites.other["official-artwork"].front_default : pokemon.sprites.other["official-artwork"].front_shiny)} alt="Pokemon Artwork" /></div>
                <button className="boton" onClick={mostrarImagen1}><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="w-100 h-100" viewBox="0 0 24 24"><path fill="#157347" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"/></svg></button>
                </div>
                <div className="radar">
                    <canvas className="h-100 w-100" id="radarChart"></canvas>
                </div>
                
            </div>
            <div className="d-flex justify-content-evenly w-100">
                <div className="w-50 d-felx flex-column justify-content-center align-items-center">
                    <h4 className="text-center">Habilidades</h4>
                    <div className="w-100">
                        {listaH}
                    </div>
                </div>
                <div className="w-50">
                    <h4 className="text-center">Tipos</h4>
                    {listaT}

                </div>
                
            </div>
            

            
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </section>
    );
}

export default DetallesPokemon;
