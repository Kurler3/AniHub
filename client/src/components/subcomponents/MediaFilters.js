import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faCertificate, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {MEDIA_POST_FILTERS} from '../../utils/constants';
import {useDispatch} from 'react-redux';
import { filterPosts } from '../../actions/mediaActions';


const MediaFilters = () => {

    const dispatch = useDispatch();

    const [selectedFilter, setSelectedFilter] = useState(MEDIA_POST_FILTERS[0]);

    const onFilterClick = (e) => {
        const filterClicked = MEDIA_POST_FILTERS[parseInt(e.target.id)];

        // If the new selected filter wasn't the one selected before this click
        if(selectedFilter !== filterClicked){
            setSelectedFilter(filterClicked);

            // Dispatch action
            dispatch(filterPosts(filterClicked));
        }
    }

    // const onPopularFilterClick = () => {
    //     if(selectedFilter !== MEDIA_POST_FILTERS[1]){
    //         // Set the current filter
    //         setSelectedFilter(MEDIA_POST_FILTERS[1])
    //         // Dispatch action to reducer
    //         // Changing the data in the store
    //         dispatch(filterPosts)
    //     }
    // }

    // const onNewestFilterClick = () => {
    //     if(selectedFilter !== MEDIA_POST_FILTERS[0]){
    //         setSelectedFilter(MEDIA_POST_FILTERS[0]);


    //     }
    // }

    // const onMostUpvotedFilterClick = () => {
    //     if(selectedFilter !== MEDIA_POST_FILTERS[2]){
    //         setSelectedFilter(MEDIA_POST_FILTERS[2]);



    //     }
    // }

    return (
        <div className="filters-container"> 
                <div id="0" onClick={onFilterClick}  className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[0] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faCertificate} />
                    <p className="text">Newest </p>
                </div>
                <div id="1" onClick={onFilterClick} className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[1] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faRocket} />
                    <p className="text">Most Popular</p>
                </div>
                <div id="2" onClick={onFilterClick} className={`filter-container ${selectedFilter===MEDIA_POST_FILTERS[2] ? 'selected-filter' : ''}`}>
                    <FontAwesomeIcon className="icon" icon={faArrowUp} />
                    <p className="text">Most Upvoted</p>
                </div>
            </div>
    )
}

export default MediaFilters;
