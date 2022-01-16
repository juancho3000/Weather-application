//import logo from './logo.svg';
import React from "react";
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './app_component/weather.component';

//api call
const API_key = "8a3a335d208f4d929d8200752212911"

class App extends React.Component{
  constructor(){
    super();
    this.state={
      city: undefined,
      country:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };
    this.getWeather();

  }

  //Operation to get max temperature
  calcCelsiusForMax(temp){
    let cell= Math.floor(temp + 2);
   return cell;
  }

  //Operation to get min temperature
  calcCelsiusForMin(temp){
    let cell= Math.floor(temp - 2);
   return cell;
  }

  getWeather= async () =>{
    const api_call = await fetch(
   `http://api.weatherapi.com/v1/current.json?key=8a3a335d208f4d929d8200752212911&q=medellin&aqi=no&appid=${API_key}`
    );
  
  const response = await api_call.json();
  console.log(response);

  this.setState({ 
    city:response.location.name,
    country:response.location.country,
    celsius:response.current.temp_c,
    temp_max:this.calcCelsiusForMax(response.current.temp_c),
    temp_min: this.calcCelsiusForMin(response.current.temp_c),
    description:response.current.condition.text
       
  });
  
  };

  render(){
    return(
      <div className="App">
  <Weather 
  city={this.state.city} 
  country={this.state.country}
  temp_celsius={this.state.celsius}
  temp_max={this.state.temp_max}
  temp_min={this.state.temp_min}
  description={this.state.description}
  
  />
    </div>
    );
  }
}

export default App;


