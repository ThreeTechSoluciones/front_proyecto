
import Avatar from '@mui/material/Avatar';


interface ImageAvatarsProps {
  src: string; // Declaramos la prop src que será de tipo string
  alt: string;
  width: string;
  height: string;
}

export default function ImageAvatars({ src, alt, width, height }: ImageAvatarsProps) {
  return (
      <Avatar alt={alt} src={src} sx={{ width: width, height: height }}/>
  );
}
