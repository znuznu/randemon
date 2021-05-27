import styled from 'styled-components';

import Espeon from '../../../styles/svg/espeon.svg';

const Container = styled.div`
  display: flex;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: 'LuckiestGuy';
  color: ${(props) => props.theme.primary};
  font-size: 100px;
  margin: auto 0 0;
  text-transform: uppercase;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    font-size: 90px;
  }

  @media only screen and (max-width: 734px) {
    font-size: 60px;
  }

  @media only screen and (max-width: 510px) {
    font-size: 44px;
  }

  @media only screen and (max-width: 400px) {
    font-size: 36px;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    font-size: 26px;
  }
`;

const EspeonIcon = styled.img`
  width: 150px;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    width: 140px;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    width: 110px;
  }

  @media only screen and (max-width: 470px) {
    width: 94px;
  }

  @media only screen and (max-width: 400px) {
    width: 85px;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xxs}px) {
    width: 76px;
  }
`;

type MainTitleProps = {
  content: string;
};

const MainTitle = ({ content }: MainTitleProps) => {
  return (
    <Container>
      <Title>{content}</Title>
      <EspeonIcon src={Espeon} />
    </Container>
  );
};

export default MainTitle;
