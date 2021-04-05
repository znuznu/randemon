import React from 'react';

import styled from 'styled-components';

import { breakpoints } from '../../../../styles/theme/breakpoints';

import useWindowSize from '../../../hooks/useWindowSize';

import SkeletonContainer from '../../commons/styles/SkeletonContainer';

const Container = styled(SkeletonContainer)`
  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    margin: 0 1rem 0 0;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    margin: 0;
  }
`;

const Id = styled.div`
  width: 60px;
  height: 20px;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.skeleton};
`;

const Artwork = styled.div`
  border-radius: 50%;
  width: 180px;
  height: 180px;
  margin: 0 auto 2rem;
  background-color: ${(props) => props.theme.skeleton};
`;

const Name = styled.div`
  width: 104px;
  height: 24px;
  margin: 0 auto 1.3rem;
  background-color: ${(props) => props.theme.skeleton};
`;

const TypeBadge = styled.div`
  width: 76px;
  height: 20px;
  margin: 0 auto 2rem;
  background-color: ${(props) => props.theme.skeleton};
`;

const Bar = styled.div`
  display: flex;
  height: 22px;
  background-color: ${(props) => props.theme.skeleton};
`;

const SkeletonDetail = () => {
  const windowSizes = useWindowSize();

  return (
    <Container>
      <Id />
      <Artwork />
      <Name />
      <TypeBadge />
      {windowSizes.size.width <= breakpoints.s && <Bar />}
    </Container>
  );
};

export default SkeletonDetail;
