import styled from 'styled-components';

import SkeletonContainer from '../commons/styles/SkeletonContainer';

const Container = styled(SkeletonContainer)`
  margin: 0;
`;

const Id = styled.div`
  width: 40px;
  height: 20px;
  margin-bottom: 1rem;
  background-color: ${(props) => props.theme.skeleton};
  border-radius: 4px;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 38px;
    height: 18px;
  }
`;

const Sprite = styled.div`
  border-radius: 50%;
  width: 66px;
  height: 66px;
  margin: 0 auto 1rem;
  background-color: ${(props) => props.theme.skeleton};
`;

const Name = styled.div`
  width: 96px;
  height: 24px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.skeleton};
  border-radius: 4px;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.xs}px) {
    width: 80px;
    height: 20px;
  }
`;

const Skeleton = () => {
  return (
    <Container>
      <Id />
      <Sprite />
      <Name />
    </Container>
  );
};

export default Skeleton;
