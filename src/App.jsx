import './App.css'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import InputName from './components/InputName.jsx'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
import ProtectedRoutes from './components/ProtectedRoutes'
import imgPokedex from './assets/pokedex.svg'
import imgPokebola from './assets/pokebola.png'


function App() {

  return (
    <div className="App">
      <HashRouter>
        <div className='banner'>
          <Link to={"/"}>
            <img className='banner_img' src={imgPokedex} alt="banner link" />
          </Link>
          <img className='banner_poke'src={imgPokebola} alt="pokebola banner" />
        </div>

        <Routes>
          <Route path="/" element={<InputName />}/>

          <Route element={<ProtectedRoutes />}>
            <Route path='/pokedex' element={<Pokedex />}/>
            <Route path='/pokedex/:id' element={<Pokemon />}/>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
