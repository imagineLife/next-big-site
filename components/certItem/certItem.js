import React from 'react';
import Image from 'next/image';
export default function CertItem({
  title,
  subText,
  textContext,
  aLink,
  techList,
  imgClass,
  img,
}) {
  console.log('techList');
  console.log(techList);

  return (
    // hover-v2
    // w-28
    <div className="border rounded p-4 w-full text-white border-gray-500 flex flex-col">
      {/* className={`box ${imgClass} `} */}
      <figure className="flex flex-start">
        <Image
          src={`/${img}`}
          alt={`${title}-image`}
          width={100}
          height={100}
        />
        <figcaption className="text-white bold text-xl ml-6">
          {title}
        </figcaption>
      </figure>
      <p className="flex text-sm content-end flex-wrap">
        {subText}
        <br />
        {/* {textContext && (
          <sup>
            <i>{textContext}</i>
          </sup>
        )} */}
      </p>
      {aLink && <a href={aLink} target="_blank" rel="noreferrer"></a>}
      {/* <ul>
            {techList?.map((itm, itmIdx) => (
              <li key={`tech-list-${title}-${itmIdx}`}>{itm}</li>
            ))}
          </ul> */}
    </div>
  );
}
