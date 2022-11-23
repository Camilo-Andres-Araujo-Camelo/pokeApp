import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Pokemon = () => {

    const [pokemonRender, setPokemonRender] = useState({});

    const { id } = useParams();

    // console.log(pokemonRender);
    const [moves, setMoves] = useState([]);
    console.log(moves);

    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                setPokemonRender(res.data)
                setMoves(res.data.moves)
            })
    }, [])

    return (
        <div className='pokemon_container'>
            <img 
                className='centralImage'
                src={`${pokemonRender?.sprites?.other.dream_world.front_default}`}
                alt="pokemon image"
            />
            <div className='pokemon_text'>
                <h2>{pokemonRender.weight}<br/><br/><span>Weight </span></h2>
                <h1>{pokemonRender.name}</h1>
                <h2>{pokemonRender.height}<br/><br/><span>Height </span></h2>
            </div>
            <div className='movements_container'>
                <h2>Movements</h2>
                <ul className='movements_list'>
                    {moves.map(move => (
                        <li>{move.move.name}</li>
                    ))}
                </ul>
            </div>
            <div className='pokemon_type'>
                <h2>Type</h2>
                <span>{pokemonRender.types?.[0]?.type.name}</span>
                <span>{pokemonRender.types?.[1]?.type.name}</span>
            </div>
            <div className='pokemon_abilities'>
                <h2>Abilities</h2>
                <span>{pokemonRender.abilities?.[0]?.ability.name}</span>
                <span>{pokemonRender.abilities?.[1]?.ability.name}</span>
            </div>
        </div>
    );
};

export default Pokemon;