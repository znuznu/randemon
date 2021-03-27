import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto 0;
  display: grid;
  column-gap: 4rem;
  row-gap: 1.5rem;
  grid-template-columns: repeat(2, 150px [col-start]);
`;

const Move = styled.div`
  width: 150px;
  height: 60px;
  background-color: #dfe5ec;
  margin: 0 auto 0.25rem;
`;

const Name = styled.div`
  width: 104px;
  height: 24px;
  background-color: #dfe5ec;
  margin: 0 auto 0.25rem;
`;

const TypeBadge = styled.div`
  width: 76px;
  height: 20px;
  background-color: #dfe5ec;
  margin: 0 auto 0.25rem;
`;

const Flex = styled.div`
  width: 160px;
  height: 114px;
  flex-direction: column;
  justify-content: center;
`;

const SkeletonMove = () => {
  return (
    <Flex>
      <Name />
      <TypeBadge />
      <Move />
    </Flex>
  );
};

const SkeletonMoves = () => {
  return (
    <Container>
      <SkeletonMove />
      <SkeletonMove />
      <SkeletonMove />
      <SkeletonMove />
    </Container>
  );
};

export default SkeletonMoves;
