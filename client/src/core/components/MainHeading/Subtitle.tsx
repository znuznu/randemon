import styled from 'styled-components';

const Title = styled.h2`
  font-family: 'Lato';
  margin-top: 0;

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.m}px) {
    font-size: 20px;
  }

  @media only screen and (max-width: ${(props) => props.theme.breakpoints.s}px) {
    font-size: 16px;
  }

  @media only screen and (max-width: 470px) {
    font-size: 14px;
  }
`;

type SubtitleProps = {
  content: string;
};

const Subtitle = ({ content }: SubtitleProps) => {
  return <Title>{content}</Title>;
};

export default Subtitle;
