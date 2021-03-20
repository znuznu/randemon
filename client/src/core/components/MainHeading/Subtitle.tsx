import styled from 'styled-components';

const Title = styled.h2`
  font-family: 'OpenSans';
`;

type SubtitleProps = {
  content: string;
};

const Subtitle = ({ content }: SubtitleProps) => {
  return <Title>{content}</Title>;
};

export default Subtitle;
