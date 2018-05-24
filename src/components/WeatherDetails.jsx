import React from 'react';

function WeatherDetails({ city, temp }) {
    return (
        <div className='weather-details'>
            <div className='city'>{city}</div>
            <div className='temp'>{temp}</div>
        </div>
    );
}

export default WeatherDetails;