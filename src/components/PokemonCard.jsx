import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({url}) => {

    const [pokemon, setPokemon] = useState();

    useEffect(()=>{
        axios.get(url)
            .then(res => setPokemon(res.data))
    }, [])

    return (
        <Link to={`/pokedex/${pokemon?.id}`}>
            <div className='imgCard_container'>
                <img 
                    className='pokemonCardImg'
                    src={`${pokemon?.sprites.other.dream_world.front_default}`}
                    alt="pokemon image"
                />
            </div>
            <div className='textCard_container'>
                <h2 className='cardName'>{pokemon?.name}</h2>
                <div className='stats'>
                    <span>Type: {pokemon?.types[0].type.name}</span>
                    <span>hp: {pokemon?.stats[0].base_stat}</span>
                    <span>Attack: {pokemon?.stats[1].base_stat}</span>
                    <span>Defense: {pokemon?.stats[2].base_stat}</span>
                    <span>Speed: {pokemon?.stats[5].base_stat}</span>
                </div>
            </div>
        </Link>
    );
};

export default PokemonCard;