import React from 'react';

type MainTitleProps = {
  content: string;
};

const MainTitle = ({ content }: MainTitleProps) => {
  return <h1>{content}</h1>;
};

export default MainTitle;
