import styled from 'styled-components';

const SkeletonContainer = styled.div`
  animation: fadeIn ease-out 0.8s;
  animation-iteration-count: infinite;
  animation-direction: alternate;

  @keyframes fadeIn {
    0% {
      opacity: 0.6;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default SkeletonContainer;
