import React from 'react';
import { useParams } from 'react-router';

const AnimePage = () => {

    const params = useParams();

    return (
        <div>
            ANIME ID = {params.id}
        </div>
    )
}

export default AnimePage;
