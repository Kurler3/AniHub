import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCertificate, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {MEDIA_POST_FILTERS} from '../../utils/constants';


const MediaFilters = () => {

    const [selectedFilter, setSelectedFilter] = useState(MEDIA_POST_FILTERS[0]);

    const onPopularFilterClick = () => {
        if(selectedFilter !== MEDIA_POST_FILTERS[1]){
            // Set the current filter
            setSelectedFilter(MEDIA_POST_FILTERS[1])
            // Dispatch action to reducer
            // Changing the data in the store
        }
    }

    const onNewestFilterClick = () => {
        if(selectedFilter !== MEDIA_POST_FILTERS[0]){
            setSelectedFilter(MEDIA_POST_FILTERS[0]);
        }
    }

    const onMostUpvotedFilterClick = () => {
        if(selectedFilter !== MEDIA_POST_FILTERS[2]){
            setSelectedFilter(MEDIA_POST_FILTERS[2]);
        }
    }

    return (
        <div className="filters-container"> 
                <div onClick={onNewestFilterClick}  className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[0] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faCertificate} />
                    <p className="text">Newest </p>
                </div>
                <div onClick={onPopularFilterClick} className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[1] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faRocket} />
                    <p className="text">Most Popular</p>
                </div>
                <div onClick={onMostUpvotedFilterClick} className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[2] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faArrowUp} />
                    <p className="text">Most Upvoted</p>
                </div>
            </div>
    )
}

export default MediaFilters;
