import React from 'react';

import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'KaBlam';
  color: white;
  text-shadow: 0 0 5px black;
  font-size: 128px;
  margin: 3rem 0 0;
`;

type MainTitleProps = {
  content: string;
};

const MainTitle = ({ content }: MainTitleProps) => {
  return <Title>{content}</Title>;
};

export default MainTitle;
