import React, { PropsWithChildren, useState } from 'react';

import styled from 'styled-components';

import Triangle from '../styles/Triangle';

const Container = styled.div``;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
  }
`;

const Title = styled.h2`
  font-family: 'Lato';
  margin: 0;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 18px;
  }
`;

type ContentProps = {
  maxHeight: string;
  isOpen: boolean;
};

const Content = styled.div<ContentProps>`
  transition: max-height 0.8s ease-in-out;
  max-height: ${(props) => props.maxHeight};
  overflow: hidden;
`;

interface PanelProps {
  title: string;
}

const Panel = ({ title, children }: PropsWithChildren<PanelProps>) => {
  const [triangleAngle, setTriangleAngle] = useState(360);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setTriangleAngle(triangleAngle - 180);
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <TopBar onClick={toggle}>
        <Title>{title}</Title>
        <Triangle rotateAngle={triangleAngle} />
      </TopBar>
      <Content maxHeight={isOpen ? '1000px' : '0px'} isOpen={isOpen}>
        {children}
      </Content>
    </Container>
  );
};

export default Panel;
