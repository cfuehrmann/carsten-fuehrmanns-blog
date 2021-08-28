/* eslint-disable @next/next/no-img-element */
import styles from "./misc.module.css";

export const ExternalImage = ({
  src,
  caption,
  width,
  height,
  hideCaption,
}: {
  src: string;
  caption: string;
  width?: number;
  height?: number;
  hideCaption?: true;
}) => (
  <>
    <img
      className={`w3-image ${styles["image"]}`}
      src={src}
      loading="lazy"
      alt={caption}
      width={width}
      height={height}
    />
    {hideCaption ? (
      ""
    ) : (
      <div className="w3-container w3-center">
        <small>
          <em>{caption}</em>
        </small>
      </div>
    )}
  </>
);

export const Picture = ({
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
        className={`w3-image ${styles["image"]}`}
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
      <div className="w3-container w3-center">
        <small>
          <em>{caption}</em>
        </small>
      </div>
    )}
  </>
);

export const Video = (props: { fileName: string; caption: string }) => {
  const { fileName, caption } = props;

  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        controls
        className={styles["image"]}
      >
        <source src={`../images/${fileName}.webm`} type="video/webm" />
        <source src={`../images/${fileName}.mp4`} type="video/mp4" />
      </video>
      <div className="w3-container w3-center">
        <p className="w3-margin-top">
          <small>
            <em>{caption}</em>
          </small>
        </p>
      </div>
    </>
  );
};
