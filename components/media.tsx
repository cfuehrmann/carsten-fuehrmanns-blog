export const Image = (props: { fileName: string; caption: string }) => {
  const { fileName, caption } = props;

  return (
    <figure>
      <picture>
        <source srcSet={`../images/${fileName}.webp`} type="image/webp" />
        <img src={`../images/${fileName}.png`} loading="lazy" alt={caption} />
      </picture>
      <figcaption>{caption}</figcaption>
    </figure>
  );
};

export const x = 42;
