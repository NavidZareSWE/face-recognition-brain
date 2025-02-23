import LoadingImage from "./LoadingImage";
import React, { ImgHTMLAttributes, useState, useEffect } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  fallback: string;
  faces: Array<{
    topRow: number;
    leftCol: number;
    bottomRow: number;
    rightCol: number;
  }>;
}

export default function ImageWithFallback({
  fallback,
  src,
  faces,
  ...props
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [key, setKey] = useState<string | undefined>(src);
  const [faceBoxes, setFaceBoxes] = useState<JSX.Element[]>([]);

  useEffect(() => {
    setImgSrc(src);
    setKey(src);
  }, [src]);

  useEffect(() => {
    const image = document.getElementById("inputImg");
    if (!image) return;

    const updateBoxes = () => {
      const rect = image.getBoundingClientRect();
      if (!rect) return;

      const { width, height } = rect;
      if (width === undefined || height === undefined) return;

      const boxes = faces.map((face, index) => {
        const { topRow, leftCol, bottomRow, rightCol } = face;
        const box = {
          leftCol: leftCol * width,
          topRow: topRow * height,
          rightCol: width - rightCol * width,
          bottomRow: height - bottomRow * height,
        };
        return (
          <div
            key={index}
            className="bounding-box"
            style={{
              position: "absolute",
              boxShadow: "0 0 0 3px #149df2 inset",
              top: box.topRow,
              right: box.rightCol,
              bottom: box.bottomRow,
              left: box.leftCol,
            }}
          ></div>
        );
      });
      setFaceBoxes(boxes);
    };

    updateBoxes();
    window.addEventListener("resize", updateBoxes);
    return () => window.removeEventListener("resize", updateBoxes);
  }, [faces]);

  const onError = () => {
    setImgSrc(fallback);
    setKey(fallback);
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        className="rounded-md w-96"
        id="inputImg"
        src={imgSrc ? imgSrc : fallback}
        onError={onError}
        {...props}
        key={key}
      />
      {faceBoxes}
    </div>
  );
}
