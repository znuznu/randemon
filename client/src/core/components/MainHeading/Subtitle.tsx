type SubtitleProps = {
  content: string;
};

const Subtitle = ({ content }: SubtitleProps) => {
  return <h2>{content}</h2>;
};

export default Subtitle;
