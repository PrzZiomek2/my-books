import React from 'react'
import Image from 'next/image

interface ImageProps {
   className: string;
   width: number;
   height: number;
   src: string;
   alt: string;
}

const ImageCustom = (props: ImageProps) => {
  return (
    <div>
      <Image
         src={props.src}
         alt={props.alt}
         className={props.className}
         width={props.width}
         height={props.width}
         priority
      />
    </div>
  )
}

export default ImageCustom
