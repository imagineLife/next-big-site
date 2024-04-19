import React from 'react';
import Image from 'next/image';
export default function FolioItem({
  title,
  subText,
  textContext,
  aLink,
  imgClass,
  img,
}) {
  console.log({
    img,
  });

  return (
    // col-3-4
    // <div className="hover-v2 folio-item">
    //   <div target="_blank" className={`box ${imgClass} `}>
    //     <div className="caption">
    //       <p>{title}</p>
    //       <hr />
    //       <p className="sub-text">
    //         {subText}
    //         <br />
    //         {textContext && (
    //           <sup>
    //             <i>{textContext}</i>
    //           </sup>
    //         )}
    //       </p>
    //       {aLink && (
    //         <a
    //           href={aLink}
    //           target="_blank"
    //           rel="noreferrer"
    //           className="open"
    //         ></a>
    //       )}
    //     </div>
    //   </div>
    // </div>

    <figure>
      <Image src={`/${img}.png`} width={150} height={150} alt={img} />
    </figure>
  );
}
