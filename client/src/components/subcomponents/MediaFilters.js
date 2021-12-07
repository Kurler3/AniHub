import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCertificate, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {MEDIA_POST_FILTERS} from '../../utils/constants';
import {useDispatch} from 'react-redux';
import { filterPosts } from '../../actions/mediaActions';


const MediaFilters = () => {

    const dispatch = useDispatch();

    const [selectedFilter, setSelectedFilter] = useState(MEDIA_POST_FILTERS[0]);

    const onPopularFilterClick = () => filterLogic(1);

    const onNewestFilterClick = () => filterLogic(0);

    const onMostUpvotedFilterClick = () => filterLogic(2);

    const filterLogic = (index) => {
        if(selectedFilter !== MEDIA_POST_FILTERS[index]){
            setSelectedFilter(MEDIA_POST_FILTERS[index]);
            dispatch(filterPosts(MEDIA_POST_FILTERS[index]));
        }
    }

    return (
        <div className="filters-container"> 
                <div id="0" onClick={onNewestFilterClick}  className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[0] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faCertificate} />
                    <p className="text">Newest </p>
                </div>
                <div id="1" onClick={onPopularFilterClick} className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[1] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faRocket} />
                    <p className="text">Most Popular</p>
                </div>
                <div id="2" onClick={onMostUpvotedFilterClick} className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[2] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faArrowUp} />
                    <p className="text">Most Upvoted</p>
                </div>
            </div>
    )
}

export default MediaFilters;
