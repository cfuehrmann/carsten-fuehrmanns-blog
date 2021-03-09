export const Image = ({
  fileName,
  caption,
  width,
  height,
  extension,
  hideCaption,
}: {
  fileName: string;
  caption: string;
  width?: number;
  height?: number;
  extension: "png" | "jpg";
  hideCaption?: true;
}) => (
  <>
    <picture className="w3-display-container">
      <source srcSet={`../images/${fileName}.webp`} type="image/webp" />
      <img
        className="w3-image"
        src={`../images/${fileName}.${extension}`}
        loading="lazy"
        alt={caption}
        width={width}
        height={height}
      />
    </picture>
    {hideCaption ? (
      ""
    ) : (
      <p>
        <em>{caption}</em>
      </p>
    )}
  </>
);

export const Video = (props: { fileName: string; caption: string }) => {
  const { fileName, caption } = props;

  return (
    <>
      <video autoPlay loop muted playsInline controls>
        <source src={`../images/${fileName}.webm`} type="video/webm" />
        <source src={`../images/${fileName}.mp4`} type="video/mp4" />
      </video>
      <p>
        <em>{caption}</em>
      </p>
    </>
  );
};

export const Centered = ({ children }: { children: React.ReactNode }) => (
  <div className="w3-container w3-center">{children}</div>
);
