import React from 'react';
import styled from 'styled-components/native';

const StyledLogoContainer = styled.View`
  margin-top: 40px;
  margin-left: 10px;
`;

const StyledImage = styled.Image`
  width: 187px;
  height: 70px;
`;

function Logo() {
  return (
    <StyledLogoContainer>
      <StyledImage source={require('../../assets/images/logo.png')} />
    </StyledLogoContainer>
  );
}

export default Logo;
