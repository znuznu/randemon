import React from 'react';

import styled from 'styled-components';

const Container = styled.div``;

const Id = styled.div`
  width: 60px;
  height: 20px;
  background-color: #dfe5ec;
  margin-bottom: 1rem;
`;

const Artwork = styled.div`
  border-radius: 50%;
  width: 180px;
  height: 180px;
  background-color: #dfe5ec;
  margin: 0 auto 2rem;
`;

const Name = styled.div`
  width: 104px;
  height: 24px;
  background-color: #dfe5ec;
  margin: 0 auto 1.3rem;
`;

const TypeBadge = styled.div`
  width: 76px;
  height: 20px;
  background-color: #dfe5ec;
  margin: 0 auto 2rem;
`;

const SkeletonDetail = () => {
  return (
    <Container>
      <Id />
      <Artwork />
      <Name />
      <TypeBadge />
    </Container>
  );
};

export default SkeletonDetail;
