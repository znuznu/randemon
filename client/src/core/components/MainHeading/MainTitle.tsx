import React from 'react';

import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'PermanentMarker';
  color: ${(props) => props.theme.primary};
  font-size: 116px;
  margin: 0 auto;
  padding: 0 1rem;
  text-transform: uppercase;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    font-size: 90px;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    font-size: 60px;
  }

  @media only screen and (max-width: 470px) {
    font-size: 44px;
  }

  @media only screen and (max-width: 400px) {
    font-size: 36px;
  }
`;

type MainTitleProps = {
  content: string;
};

const MainTitle = ({ content }: MainTitleProps) => {
  return <Title>{content}</Title>;
};

export default MainTitle;
