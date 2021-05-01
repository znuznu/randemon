import styled from 'styled-components';
import MainTitle from './MainTitle';

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 1rem auto 1rem;
`;

const MainHeading = () => {
  return (
    <Heading>
      <MainTitle content={'randemon'} />
    </Heading>
  );
};

export default MainHeading;
