import React from 'react';

import styled from 'styled-components';

import Link from '../commons/styles/Link';

const Container = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-family: 'Lato';
  padding-bottom: 1rem;
  margin: 0 1rem;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    font-size: 14px;
  }
`;

const Line = styled.p`
  margin: 0;
`;

const LineNintendo = styled.p`
  margin: 1rem 0 0;
`;

const Footer = () => {
  return (
    <Container>
      <Line>
        Randemon is Copyright (c) - <b>znu</b> under MIT license
      </Line>
      <Line>
        This project uses data from the{' '}
        <Link href={'https://pokeapi.co/'} rel={'noreferrer noopener'} target={'_blank'}>
          PokéAPI
        </Link>
        .
      </Line>
      <LineNintendo>
        <b>Pokémon</b> and <b>Pokémon</b> character names are trademarks of{' '}
        <b>Nintendo</b>.
      </LineNintendo>
    </Container>
  );
};

export default Footer;
