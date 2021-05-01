import { PropsWithChildren, useState } from 'react';

import styled from 'styled-components';

import { PlusCircle, MinusCircle } from '@styled-icons/heroicons-solid';

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
  height: number;
};

const Content = styled.div<ContentProps>`
  transition: max-height 0.3s ease-in;
  max-height: ${(props) => props.height}px;
  overflow: hidden;
`;

const PlusIcon = styled(PlusCircle)`
  width: 24px;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 20px;
  }
`;

const MinusIcon = styled(MinusCircle)`
  width: 24px;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 20px;
  }
`;

interface PanelProps {
  title: string;
  contentHeight: number;
}

const Panel = ({ title, children, contentHeight }: PropsWithChildren<PanelProps>) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container>
      <TopBar onClick={toggle}>
        <Title>{title}</Title>
        {isOpen ? <MinusIcon /> : <PlusIcon />}
      </TopBar>
      <Content height={isOpen ? contentHeight : 0}>{children}</Content>
    </Container>
  );
};

export default Panel;
