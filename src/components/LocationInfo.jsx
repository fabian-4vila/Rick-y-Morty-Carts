const LocationInfo = ({ location }) => {
  return (
    <article className="Card">
      <h2 className="Card__title">{location?.name}</h2>
      <ul className="Card__list">
        <li className="Card__item">
          <span className="Card__label">Type:</span>
          <span className="Card__value"> {location?.type}</span>
        </li>
        <li className="Card__item">
          <span className="Card__label">Dimension:</span>
          <span className="Card__value"> {location?.dimension || "unknown"}</span>
        </li>
        <li className="Card__item">
          <span className="Card__label">Population:</span>
          <span className="Card__value"> {location?.residents.length}</span>
        </li>
      </ul>
    </article>
  );
};

export default LocationInfo;
