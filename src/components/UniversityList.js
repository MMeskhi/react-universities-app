import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

//Styles
const UniContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  gap: 4px;
  flex-direction: column;
  margin-top: 16px;
`;

const UniUl = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const Select = styled.select`
  font-size: 18px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: transparent;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover,
  :active {
    border-color: #222;
  }
`;

const UniLi = styled.li`
  background-color: transparent;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;

  &:hover {
    border-color: #222;
  }

  &:active {
    border-color: #ccc;
  }
`;

const UniversityList = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [universities, setUniversities] = useState([]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setUniversities([]);

    if (selectedCountry) {
      axios
        .get(
          `http://universities.hipolabs.com/search?country=${selectedCountry}`
        )
        .then((response) => {
          const uniqueUniversities = response.data.filter(
            (university, index, self) =>
              index === self.findIndex((u) => u.name === university.name)
          );

          setUniversities(uniqueUniversities);
        })
        .catch((error) => {
          console.error("Error fetching universities:", error);
          setUniversities([]);
        });
    } else {
    }
  };

  return (
    <UniContainer>
      <Select value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select a country</option>
        <option value="Georgia">Georgia</option>
        <option value="Ukraine">Ukraine</option>
      </Select>

      <UniUl>
        {universities.map((university, index) => (
          <UniLi key={`${university.name}-${index}`}>
            <a
              href={university.web_pages[0]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {university.name}
            </a>
          </UniLi>
        ))}
      </UniUl>
    </UniContainer>
  );
};

export default UniversityList;
