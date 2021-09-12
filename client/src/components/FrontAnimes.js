import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import FrontAnime from './FrontAnime';
import Loader from "react-loader-spinner";
import ReactPaginate from 'react-paginate';

const FrontAnimes = () => {

    const calculateNumPages = (arrayLength) => {
        // Given an array length, set the num of pages for
        // 25 animes each page

        let numPages;
        let remain;

        
        numPages = arrayLength / 10;
        remain = arrayLength % 10;     

        

        if(remain!==0) return numPages +1;
        return numPages;
    }

    const animes = useSelector((state) => state.frontAnimes);
    const [currentPageAnime, setCurrentPageAnime] = useState([]);
    const [pageCount, setPageCount] = useState(animes.length!==0 ? calculateNumPages(animes[0].length) : 1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        
        if(animes[0]){
            setPageCount(calculateNumPages(animes[0].length));
            setCurrentPageAnime(animes[0].slice((currentPage*10) - 10, (currentPage*10) + 1));
        }

    }, [animes, currentPage])

    const handlePageChange = (selectedObject) => {
		setCurrentPage(selectedObject.selected+1);
        setCurrentPageAnime(animes[0].slice((currentPage*10) - 10, (currentPage*10) + 1));
	};

    return (
        animes.length===0 ? <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} 
        /> :
        <div className="front-animes-container">
            <div className="animes">
                {
                    currentPageAnime.map((anime, index) => 
                        <FrontAnime key={index} anime={anime}/>
                    )
                }
            </div>
            <ReactPaginate
					pageCount={pageCount}
					pageRange={2}
					marginPagesDisplayed={2}
					onPageChange={handlePageChange}
					containerClassName={'container'}
					previousLinkClassName={'page'}
					breakClassName={'page'}
					nextLinkClassName={'page'}
					pageClassName={'page'}
					disabledClassNae={'disabled'}
					activeClassName={'active'}
			/>
        </div>
    )
}

export default FrontAnimes;
