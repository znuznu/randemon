import React from 'react';
import styled from 'styled-components';
import MainTitle from './MainTitle';
import Subtitle from './Subtitle';

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 2rem;
`;

const MainHeading = () => {
  return (
    <Heading>
      <MainTitle content={'randemon'} />
      <Subtitle content={'A random Pokemon team generator'} />
    </Heading>
  );
};

export default MainHeading;
