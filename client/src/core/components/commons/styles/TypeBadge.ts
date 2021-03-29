import styled from 'styled-components';

const TypeBadge = styled.span`
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  color: white;
  background-color: ${(props) => props.color};
  text-transform: uppercase;
  padding: 0 0.25rem;
  border-radius: 0.125rem;
  font-family: 'OpenSans';
  font-weight: 800;
  font-size: 14px;
`;

export default TypeBadge;
