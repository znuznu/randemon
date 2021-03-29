import React from 'react';

import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'KaBlam';
  color: ${(props) => props.theme.primary};
  font-size: 120px;
  margin: 3rem 0 0;
  text-transform: uppercase;
  /* text-shadow: -15px -15px 0 ${(props) => props.theme.primary},
    15px -15px 0 ${(props) => props.theme.primary},
    -15px 15px 0 ${(props) => props.theme.primary},
    15px 15px 0 ${(props) => props.theme.primary}; */

  @media only screen and (max-width: 630px) {
    font-size: 90px;
  }

  @media only screen and (max-width: 470px) {
    font-size: 60px;
  }

  @media only screen and (max-width: 330px) {
    font-size: 40px;
  }
`;

type MainTitleProps = {
  content: string;
};

const MainTitle = ({ content }: MainTitleProps) => {
  return <Title>{content}</Title>;
};

export default MainTitle;
