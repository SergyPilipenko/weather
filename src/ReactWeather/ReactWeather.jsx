import React, { PropTypes } from 'react';
import cx from 'classnames';
import './ReactWeather.scss';


function ReactWeather({ city, temp, status }) {
  const cls = cx('weather-icon', status);
  return (
    <div className="weather-container">
      <div className={cls} />
      <h1>{temp}</h1>
      <p>{city}</p>
    </div>
  );
}

ReactWeather.propTypes = {
  city: PropTypes.string,
  temp: PropTypes.number,
  status: PropTypes.string,
};

ReactWeather.defaultProps = {
  city: 'Kiev',
  temp: '25º',
  status: 'sun',
};

export default ReactWeather;
