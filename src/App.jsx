import { useState } from "react"

export const App = () => {
  const baseUrl = 'https://pokeapi.co/api/v2/pokemon'
  const [busqueda, setBusqueda] = useState('')
  const [pokeData, setPokeData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchInput = document.getElementById('search-input')

  const handleSubmit = (e) => {
    e.preventDefault()
    if(busqueda.length > 0){
      fetchPokemon()
      
    }else {
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
        throw new error('El servidor no responde!')
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
        <div style={modalStyles.overlay}>
          <div style={modalStyles.content}>
            <h2>{pokeData.name}</h2>
            <img src={pokeData.sprites.front_default} alt={pokeData.name} />
            <p>Altura: {pokeData.height}</p>
            <p>Peso: {pokeData.weight}</p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}


    </>
  )
}

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    background: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
  },
};
