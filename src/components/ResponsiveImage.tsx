import Image, { type ImageProps } from "next/image";

export default function ResponsiveImage({ sizes, ...rest }: ImageProps) {
  const computedSizes =
    sizes || "(max-width:768px) 100vw, (max-width:1200px) 50vw, 600px";
  return <Image {...rest} sizes={computedSizes} />;
}
