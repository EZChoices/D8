import Image, { type ImageProps } from "next/image";

export default function ResponsiveImage(props: ImageProps) {
  return (
    <Image
      {...props}
      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 600px"
    />
  );
}

