import React, { useState, useEffect, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import API_KEY from "./Config";

const HeaderContainer = styled.header`
  background-color: #ffffff;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainA = styled.span`
  font-size: 20px;
  font-weight: bold;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const WeatherContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-weight: bold;
  gap: 2px;
`;

const WeatherIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 8px;
`;

const WeatherText = styled.span`
  font-size: 16px;
`;

// Create a new context
const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=Georgia`
      );
      const data = response.data;
      setWeather(data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };

  return (
    <WeatherContext.Provider value={weather}>
      {children}
    </WeatherContext.Provider>
  );
};

const Header = () => {
  const weather = useContext(WeatherContext);

  return (
    <HeaderContainer>
      <Link to="/">
        <MainA>Main</MainA>
      </Link>
      {weather && (
        <WeatherContainer>
          <WeatherText>{weather.location.country},</WeatherText>
          <WeatherText>{weather.location.name}</WeatherText>
          <WeatherIcon
            src={weather.current.condition.icon}
            alt={weather.current.condition.text}
          />
          <WeatherText>{weather.current.temp_c}°C</WeatherText>
        </WeatherContainer>
      )}
    </HeaderContainer>
  );
};

export default Header;
export { WeatherProvider, WeatherContext };
