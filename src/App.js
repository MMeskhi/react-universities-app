import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { styled, createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import { WeatherProvider } from "./components/Header";
import UniversityList from "./components/UniversityList";
import NotFound from "./components/404";

//Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
  background-color: #f1f3f6;
  color: #000000;
  font-family: 'Lato', sans-serif;
  font-feature-settings: "case";
}

li {
  text-decoration: none;
  list-style: none;
}

a {
  text-decoration: none;
  width: fit-content;
  color: #000000;
}
`;

const App = () => {
  return (
    <WeatherProvider>
      <Router>
        <div>
          <GlobalStyle />
          <Header />
          <Switch>
            <Route exact path="/" component={UniversityList} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </Router>
    </WeatherProvider>
  );
};

export default App;
