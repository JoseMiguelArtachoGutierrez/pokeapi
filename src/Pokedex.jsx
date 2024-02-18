import { useState, useEffect } from "react";
import './Pokedex.css';
import { useNavigate } from "react-router-dom";

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
let url
function Pokedex() {
    const navigate = useNavigate();
    const [listaPokemon,setListaPokemon] = useState([])
    /* CARGAR MAS */
    function cargarMas() {
        const fetchData = async () => {
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const datosPokemon = await response.json();
              url=datosPokemon.next
              datosPokemon.results.forEach(element => {
                  cargarDatosPokemon(element.url);
              });
            } catch (error) {
              console.log(error.message)
            }
        };
        fetchData();
    }
    /* ME DEVUELVE UNA IMAGEN CON EL TIPO */
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
    /* DATOS POKEMON */
    function cargarDatosPokemon(urlCargar) {
        const fetchData = async () => {
            try {
              const response = await fetch(urlCargar);
              if (!response.ok) {
                throw new Error('Failed to fetch data');
              }
              const detallesPokemon = await response.json();
              let detalle=detallesPokemon
                console.log(detallesPokemon)
                setListaPokemon((data)=>[...data,detalle])
                console.log("listaPokemon")
            } catch (error) {
              console.log(error.message)
            }
        };
        fetchData();
    }
    function prueba() {
        console.log(listaPokemon)
    }
    /* PRIMEROS 9 POKEMON */
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const datosPokemon = await response.json();
            console.log(datosPokemon)
            url=datosPokemon.next
            datosPokemon.results.forEach(element => {
                cargarDatosPokemon(element.url);
            });
          } catch (error) {
            console.log(error.message)
          }
        };
        fetchData();
      }, []);

      /* MAP */
    let lista = listaPokemon.map((pokemon,index) =>{
        let tipo1="";
        let tipo2=undefined;
        tipo1=pokemon.types[0].type.name
        tipo1=tipoPokemonImagen(tipo1)
        if (pokemon.types[1]!=null) {
            tipo2=pokemon.types[1].type.name
            tipo2=tipoPokemonImagen(tipo2)
        }
        /* onClick={navigate("/detalles/"+)} */
        return  (
            <li className="card" key={index} onClick={()=>{navigate("/detalles/"+pokemon.id)}}>
                
                <div className="card-img-top"><img className="v-100 h-100" src={pokemon.sprites.other["official-artwork"].front_default}/></div>
                <div className="card-body">
                    <h3 className="card-title text-center">{pokemon.name}</h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">{tipo1}</li>
                        <li className="list-group-item">{tipo2? tipo2: ""}</li>
                    </ul>
                </div>
            </li>
        )
    });
    return (
        <>
            <div className=" pokedex d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-center">Pokedex</h1>
                <ul className="d-flex flex-wrap gap-3 justify-content-center">
                    {lista} 
                </ul>
                <button className="btn btn-success w-25 " onClick={cargarMas}>Cargar Mas</button>
            </div>
        </>
    )
}

export default Pokedex