import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import PokemonCard from './PokemonCard';
import { useNavigate } from 'react-router-dom';

const Pokedex = () => {

    const user = useSelector(state => state.name);

    const [pokemons, setPokemons] = useState([]);
    // console.log(pokemons);

    const [inputValue, setInputValue] = useState("");

    const [pokemonsType, setPokemonsType] = useState([])
    // console.log(pokemonsType);

    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const pokemonsPerPage = 6
    const lastIndex = page * pokemonsPerPage
    const firstIndex = lastIndex - pokemonsPerPage
    const pokemonPaginated =  pokemons.slice(firstIndex, lastIndex)
    const totalPages = Math.ceil(pokemons.length/pokemonsPerPage)
    const numberOfPages = []
    for(let i = 1; i <= totalPages; i++){
        numberOfPages.push(i)
    }

    console.log(totalPages);
    console.log(page);
    // usar cuando haya paginado 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154'
    useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon/')
            .then(res => {
                setPokemons(res.data.results)
            })
        axios.get('https://pokeapi.co/api/v2/type')
            .then(res=> setPokemonsType(res.data.results))
    }, [])

    const searchPokemon = ()=>{
        navigate(`/pokedex/${inputValue.toLocaleLowerCase()}`)
    }

    const filterPokemonsByType = (e) => {
        axios.get(e.target.value)
            .then(res => setPokemons(res.data.pokemon))
        setPage(1)
    }

    return (
        <div>
            <h1 className='pokedex_h1'>Pokedex</h1>
            <h2 className='pokedex_h2'>Welcome! {user} </h2>
            <div className='pokedex_input_container'>
                <input
                    type="text"
                    value={inputValue}
                    placeholder={"Pokemon name"}
                    onChange={e => setInputValue(e.target.value)}
                />
                <button onClick={searchPokemon}><i className="fa-solid fa-magnifying-glass"></i></button>
                <select onChange={filterPokemonsByType} name="" id="">
                    {pokemonsType.map(type => (
                        <option
                            key={type.name}
                            value={type.url}
                        >
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='btn_container'>

                <button 
                    onClick={()=> setPage(page - 1)}
                    disabled={page === 1}
                >Prev</button>
                {numberOfPages.map(number =>(
                    <button onClick={()=> setPage(number)}>{number}</button>
                ))}
                <button 
                    onClick={()=> setPage(page + 1)}
                    disabled={page === totalPages}
                >Next</button>

            </div>
            <ul className='pokedex_list'>
                {pokemonPaginated.map(pokemon => (
                    <li 
                        className='pokemon_List_item'
                        key={pokemon.url ? pokemon.url : pokemon.pokemon.url}>
                        <PokemonCard url={pokemon.url ? pokemon.url : pokemon.pokemon.url}/>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pokedex;