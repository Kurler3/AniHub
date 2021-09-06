import React from 'react';
import { useSelector } from 'react-redux';

const FrontAnimes = () => {

    const animes = useSelector((state) => state.frontAnimes);

    console.log(animes);

    return (
        <div>
            ANIMES
        </div>
    )
}

export default FrontAnimes;
