import React from 'react';

import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'KaBlam';
  color: #ffcc01;
  font-size: 150px;
  margin: 3rem 0 0;
  text-transform: uppercase;
  text-shadow: -15px -15px 0 ${(props) => props.theme.primary},
    15px -15px 0 ${(props) => props.theme.primary},
    -15px 15px 0 ${(props) => props.theme.primary},
    15px 15px 0 ${(props) => props.theme.primary};
`;

type MainTitleProps = {
  content: string;
};

const MainTitle = ({ content }: MainTitleProps) => {
  return <Title>{content}</Title>;
};

export default MainTitle;
