import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import getRandomNumber from './utils/getRandomNumber';
import LocationInfo from './components/LocationInfo';
import ResidentCard from './components/ResidentCard';
import Pagination from './components/Pagination';

function App() {
  const [inputValue, setInputValue] = useState(getRandomNumber(126));
  const url = `https://rickandmortyapi.com/api/location/${inputValue || 'Hola'}`;
  const [location, getLocation, hasError] = useFetch(url);
  const [currentPage, setCurrentPage] = useState(1);
  const residentsPerPage = 8;
  const [isLoading, setIsLoading] = useState(true); // Estado para la página de carga

  useEffect(() => {
    getLocation();
  }, [inputValue]);

  useEffect(() => {
    // Mostrar la página de carga mientras se carga la información
    setIsLoading(true);
  }, [inputValue]);

  useEffect(() => {
    // Ocultar la página de carga una vez que la información esté lista
    setIsLoading(false);
  }, [location]);

  const inputSearch = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(inputSearch.current.value.trim());
  };

  const indexOfLastResident = currentPage * residentsPerPage;
  const indexOfFirstResident = indexOfLastResident - residentsPerPage;
  const currentResidents = location?.residents?.slice(
    indexOfFirstResident,
    indexOfLastResident
  );

  const totalPages = Math.ceil((location?.residents?.length || 0) / residentsPerPage);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="galeri">
  {/* Mostrar el mensaje de error si hasError es true */}
  {hasError ? (
    <p className="galeri__p">❌ Hey! you must provide an id from 1 to 126 😥</p>
  ) : (
    // Mostrar la página de carga si isLoading es true
    isLoading ? (
      <div className="galeri__loading">
        <h1 className='galeri__title'>Loading...</h1>
      </div>
    ) : (
      <>
        <img className="galeri__image" src="/Untitled.png" alt="" />
        <h1 className="galeri__title">Rick and Morty</h1>
        <form className="galeri__form" onSubmit={handleSubmit}>
          <input className="galeri__input" ref={inputSearch} type="text" />
          <button className="galeri__button">Search</button>
        </form>
        <>
          <LocationInfo location={location} />
          {currentResidents && currentResidents.length > 0 ? (
            <div className="galeri__cards">
              {currentResidents.map((url) => (
                <ResidentCard 
                key={url} 
                url={url} 
                />
              ))}
            </div>
          ) : (
            <p className="galeri__p">No residents to show.</p>
          )}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </>
      </>
    )
  )}
</div>

  );
}

export default App;
