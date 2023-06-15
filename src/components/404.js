import React from "react";
import styled from "styled-components";

//Styles
const NotFoundContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  gap: 4px;
  flex-direction: column;
  height: 50vh;
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h2>404 Page Not Found</h2>
      <p>Oops! Something went wrong.</p>
    </NotFoundContainer>
  );
};

export default NotFound;
