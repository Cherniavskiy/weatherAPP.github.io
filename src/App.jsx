import React, { Component } from 'react';

import './App.css';
import WeatherIcon from './components/WeatherIcon.jsx';
import WeatherDetails from './components/WeatherDetails.jsx';



class App extends Component {
    state = {
      icon:"",
      time:"",
      city:"",
      temp:"",
      weatherCode:"",
      fetching: true
    }

    componentDidMount() {
      this.fetchIP();
    }

    fetchWeatherData = city => {
      const baseRrl = 'http://api.openweathermap.org';
      const path = '/data/2.5/weather';
      const appId = '459fc1107972f9ca8e39abe5f2583722';
      const query = `units=metric&lang=ru&appid=${appId}`;

      fetch(`${baseRrl}${path}?q=${city}&${query}`)
        .then(Response => Response.json())
        .then(data => {
          const date = new Date();
          const time = date.getHours();

          this.setState({
            time,
            city,
            temp: Math.round(data.main.temp),
            weatherCode: data.weather[0].id,
            fetching: false
          });
        })
        .catch(error => console.error(error));
      }

      fetchIP = () =>{
        fetch('//freegeoip.net/json/')
          .then(Response => Response.json())
          .then(({city}) =>this.fetchWeatherData(city))
          .catch(error => console.log(error));
      }

  render() {
    const { fetching, icon, time, city, temp, weatherCode } = this.state;  //деструктор

    return fetching ? 
    <div className='app'>загрузка...</div>
    :
    <div className='app' data-hour={time}>
      <WeatherIcon
        icon={icon}
        weatherCode={weatherCode}
        time={time}/>
      <WeatherDetails
        city={city}
        temp={temp}/>
      </div>;
  }
}

export default App;
