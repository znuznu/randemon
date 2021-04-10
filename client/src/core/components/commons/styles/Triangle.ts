import styled from 'styled-components';

type TriangleProps = {
  rotateAngle: number;
};

const Triangle = styled.div<TriangleProps>`
  display: inline-block;
  height: 0;
  width: 0;
  border-right: 8px solid transparent;
  border-bottom: 14px solid ${(props) => props.theme.primary};
  border-left: 8px solid transparent;
  transition: transform 0.8s ease-in-out;
  transform: rotate(${(props) => props.rotateAngle}deg);
`;

export default Triangle;
