import React, { useEffect, useRef, useState } from 'react'
import searchIcon from './search.svg'
import WeatherData from './WeatherData'
import linkIcon from './external-link.svg'
const Main = (props) => {
  const inputValue = useRef();
  const [cityName,setCityName] = useState("Mumbai");
  const [error,setError] = useState(true)
  const [myData, setMyData] = useState([])
  const [cityDetails,setCityDetails] = useState([])
  const [dataWeather,setDataWeather] = useState([])
  const [windData,setWindData] = useState([]);

  const api = {
    key: process.env.REACT_APP_API_KEY,
    base: process.env.REACT_APP_BASE_URL,
  };
  useEffect(() =>{
    (async _ => {
          const response = await fetch(`${api.base}forecast?q=${cityName}&APPID=${api.key}&units=metric`);
          const data = await response.json();
          if(response.ok){
            setCityDetails(data.city)
            setMyData(data.list[0].main)
            setDataWeather(data.list[0].weather[0])
            setWindData(data.list[0].wind)
            setError(true)
            //updateBg(myData)
          }else{
            setError(false)
          }
    })();

  },[cityName])
  
  const onkeydownHandler = ((e) =>{
    if(e.key==='Enter'){
      e.preventDefault();
      setCityName(inputValue.current.value)
    }
  })
  const onSubmitHandler = ((e) =>{
    e.preventDefault();
    setCityName(inputValue.current.value)
  })

  const updateBg = (myData) =>{
    typeof myData != "undefined"
    ? myData.temp > 18
      ? props.changeBg("App hot")
      : props.changeBg("App cold")
    : props.changeBg("App")
    console.log(myData.temp)
  }

  return (
    <div className='box'>
        <div className='cityName'>
          {error?(<p>{cityDetails.name}, {cityDetails.country}<a  href={`https://en.wikipedia.org/wiki/${cityDetails.name}`} target="_ "><img src={linkIcon} alt='link'/></a></p>):(<p className='invalid'>'Invalid City Name'</p>)}
          <div className='search'>
          <input type='text' ref={inputValue} onKeyDown={onkeydownHandler} placeholder='City Name'/><img style={{cursor:'pointer'}} onClick={onSubmitHandler} src={searchIcon} alt='searchIcon'/>
          </div>
        </div>
        <WeatherData weatherData ={myData} weather={dataWeather} city={cityDetails}  windData={windData}/>
    </div>
  )
}

export default Main
