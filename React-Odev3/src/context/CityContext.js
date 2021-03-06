import { createContext,useContext, useEffect, useState } from "react";
import WeatherService from "../services/weatherService";

const CityContext= createContext();

const CityProvider = ({children}) =>{
    const [cityName, setCityName] = useState("istanbul")
    const [apiError  , setApiErrorMes  ] = useState(false)
    const [latAndLon, setLanAndLon] = useState({
        lat:41.0351,
        lon:28.9833
    })
    const [cityData, setCityData] = useState([])
    const [fullcityData, setFullcityData] = useState([])

    useEffect(() => {
        let weatherService = new WeatherService()
        weatherService.getCityLatAndLon(cityName).then(result => {
            setApiErrorMes(false)
            let a = result.data[0]
            let resLat = Object.entries(a).find(e => e[0] === "lat")
            let resLon = Object.entries(a).find(e => e[0] === "lon")
            
            setLanAndLon({lat:resLat[1],lon:resLon[1]})
            
        })
        .catch(err => setApiErrorMes(true))

    }, [cityName])

    useEffect(() => {
        let weatherService = new WeatherService()
        weatherService.getWeeklyWeatherOfCityByLatAndLon(latAndLon.lat,latAndLon.lon)
        .then(result=> 
            {setFullcityData(result.data)
            setCityData(result.data.daily)})
        .catch(err=> console.log(err))
    }, [latAndLon])
    
    const values ={
        cityName,
        setCityName,
        cityData,
        apiError,
        fullcityData
    }

    return <CityContext.Provider value={values}>{children}</CityContext.Provider>
}

export default CityProvider;
export const useCity =() =>useContext(CityContext);