import { useState } from "react"
import './styles/styles.css'

export const App = () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
  const [busqueda, setBusqueda] = useState('')
  const [pokeData, setPokeData] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInput = document.getElementById('search-input')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(busqueda.length > 0){
      fetchPokemon()
      
    }else if (isModalOpen) {
      closeModal()
    }else{
      alert("Indica el nombre de algun pokemon")
    }
    clearInput()
  }

  const clearInput = () => {
    searchInput.value = ''
    setBusqueda('')
  }

  const handleSearch = (e) => {
    setBusqueda(e.target.value.toLowerCase())
  }


  const fetchPokemon = async () => {
    try {
      const response = await fetch(`${baseUrl}/${busqueda}`)
      if(!response.ok){
        throw new Error('El servidor no responde!')
      }
      const data = await response.json()
      setPokeData(data)
      setIsModalOpen(true);
      
    } catch (error) {
      alert('Algo "malio sal"', error)
      
    }
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setPokeData(null);
  }

  
  return (
    <>
      <h1>Busqueda Pokemon!</h1>

      <form onSubmit={handleSubmit}>
        <label><strong>Nombre o ID: </strong>
          <input type="text" name="search-input" id="search-input" onChange={handleSearch} placeholder="Ej: pikachu" autoComplete="off" />

        </label>
        <button type="submit">Buscar</button>
      </form>

      {isModalOpen && pokeData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{pokeData.name}</h2>
            <img src={pokeData.sprites.front_default} alt={pokeData.name} />
            <p>Altura: {pokeData.height}</p>
            <p>Peso: {pokeData.weight/10} kg</p>
            <p>Tipo: {pokeData.types[0].type.name}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </>
  );
};
