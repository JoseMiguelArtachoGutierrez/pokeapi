import { useState,useEffect } from 'react'
import { db,auth } from './Firebase';
import { collection, addDoc, setDoc,updateDoc,getDocs,query,where,orderBy,limit } from 'firebase/firestore';
import todoLosJuegos from './assets/todoLosJuegos.jpeg'
import './App.css'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ranking, setRanking] = useState(false);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, 'puntuaciones'), orderBy('score', 'desc'), limit(5)); // B
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => doc.data());
        setPokemonData(data);
      } catch (error) {
        console.error('Error al obtener los datos de Firestore:', error);
      }
    };

    fetchData();
  }, []);

  function rankingSi() {
    setRanking(true)
  }
  function rankingNo() {
    setRanking(false)
  }
  let resultado=""
  if (!ranking) {
    resultado=<div className='contenedorTexto_Inicio d-flex flex-column   align-items-center'>
    <h1 className='titulo text-center w-100 h-25'>La mejor web </h1>
    <p className='w-75'>Explora nuestra Pokédex completa, donde podrás descubrir detalles fascinantes sobre tus Pokémon favoritos. Encontrarás información detallada sobre cada criatura, incluyendo su tipo, habilidades especiales, evoluciones y mucho más.</p>
  </div>
  }else{
    let rankingTotal=pokemonData.map((pokemon, index) => {
        let email= pokemon.email.split('@')[0]
      return(
          <tr key={index} className='w-100 d-flex justify-content-between'>
            <td className='w-50 text-center small'>{email}</td>
            <td className='w-50 text-center'>{pokemon.score}</td>
          </tr>
      )
      
  })
    resultado=<div className='w-80'>
      <h2 className='text-center h-25'>Ranking</h2>
      <table className='h-75 d-flex flex-column align-items-space '>
        <tr className='w-100 d-flex justify-content-between'>
          <th className='w-50 text-center'>Usuario</th>
          <th className='w-50 text-center'>Puntuacion</th>
        </tr>
      {rankingTotal}
      </table>
    </div>
  }
  return (
    <section className='w-100 d-flex justift-content-center align-items-center flex-column'>
      <div className='d-flex absoluta'>
        <button className="boton posicionabsoluta"  onClick={rankingNo}><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="w-100 h-100 posicionabsoluta svg" viewBox="0 0 24 24"><path fill="#ffffff" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"/></svg></button>
        {resultado}
        <button className="boton posicionabsoluta" onClick={rankingSi}><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" className="w-100 h-100 posicionabsoluta svg" viewBox="0 0 24 24"><path fill="#ffffff" d="M8.025 22L6.25 20.225L14.475 12L6.25 3.775L8.025 2l10 10z"/></svg></button>
        
      </div>
      <img className='imagenfondo' src={todoLosJuegos}/>
    </section>
  )
}

export default App
