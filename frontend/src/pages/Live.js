import React from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { URL_STREAM } from '../config';

const Live = () => {
    const { id } = useParams();

    return(
        <div>
            <h1>TRANSMISION EN VIVO</h1>
            <ReactPlayer
                url={`${URL_STREAM}/livestream/${id}.flv`}
                width="640px"
                height="360px"
                controls // Mostrar controles de reproducción (pausa, reproducción, etc.)
            />
        </div>
    )
}

export default Live