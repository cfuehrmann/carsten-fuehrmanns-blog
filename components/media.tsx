const Image = ({
  fileName,
  caption,
  width,
  height,
}: {
  fileName: string;
  caption: string;
  width?: number;
  height?: number;
}) => (
  <figure>
    <picture>
      <source srcSet={`../images/${fileName}.webp`} type="image/webp" />
      <img
        src={`../images/${fileName}.png`}
        loading="lazy"
        alt={caption}
        width={width}
        height={height}
      />
    </picture>
    <figcaption>{caption}</figcaption>
  </figure>
);

export default Image;
