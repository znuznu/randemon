import React from 'react';

import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'KaBlam';
  color: black;
  font-size: 150px;
  margin: 3rem 0 0;
`;

type MainTitleProps = {
  content: string;
};

const MainTitle = ({ content }: MainTitleProps) => {
  return <Title>{content}</Title>;
};

export default MainTitle;
