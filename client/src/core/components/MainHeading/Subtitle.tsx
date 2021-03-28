import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Lato';
`;

type SubtitleProps = {
  content: string;
};

const Subtitle = ({ content }: SubtitleProps) => {
  return <Title>{content}</Title>;
};

export default Subtitle;
