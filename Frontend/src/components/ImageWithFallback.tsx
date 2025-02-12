import LoadingImage from "./LoadingImage";
import React, { ImgHTMLAttributes, useState, useEffect } from 'react'

interface Props extends ImgHTMLAttributes<any> {
  fallback: string
}

export default function ImageWithFallback({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const [key, setKey] = useState<string | undefined>(src)

  useEffect(() => {
    setImgSrc(src);
    setKey(src);
  }, [src]);

  const onError = () => {
    setImgSrc(fallback);
    setKey(fallback);
  };
  return <img className="rounded-md" src={imgSrc ? imgSrc : fallback} onError={onError} {...props} key={key} />
}