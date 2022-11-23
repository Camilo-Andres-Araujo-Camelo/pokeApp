import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';
import { useDispatch } from 'react-redux'
import imgAsh from '../assets/ash.png'

const InputName = () => {

    const [userName, setUserName] = useState("");
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const enterUserName = () => {
        dispatch(changeName(userName))
        navigate("/pokedex")
    }

    return (
        <div className='userName_input_container'>
            <label htmlFor="userName">Hello Trainer! </label>
            <input
                type="text"
                id="userName"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                placeholder='Give me your name to start'
            />
            <button 
                onClick={enterUserName}>
                Go!
            </button>
            <img className='ash' src={imgAsh} alt="Ash" />
        </div>
    );
};

export default InputName;