// src/components/DragDropUploader.tsx

import React, { useState } from 'react';
// import classNames from 'classnames';

const DragDropUploader: React.FC<{handleImage:(value:string)=>void}> = ({handleImage}) => {
  const [dragging, setDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
      handleImage(reader.result as string);

    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        handleImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div

    className={`border-2 border-dashed  ${dragging && 'border-blue-500' } relative`}
     
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
        <input type="file" id='uploadFile1' className="hidden"   onChange={handleFileChange} />

    
        <label htmlFor="uploadFile1"
        className=" text-base  text-white rounded h-36 flex flex-col items-center justify-center cursor-pointer  mx-auto font-[sans-serif]">
            {
                image ? 
                    <img src={image} alt="Uploaded" className="max-w-full h-full   mx-auto mt-2"  />

: <>

<svg xmlns="http://www.w3.org/2000/svg" className="w-8 mb-2 fill-white" viewBox="0 0 32 32">
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000" />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000" />
        </svg>
        Upload file
</>

            }
       
        {/* <input type="file" id='uploadFile1' className="hidden"   onChange={handleFileChange} /> */}
        <p className="text-xs text-gray-400 mt-2 absolute top-24">PNG, JPG SVG, WEBP, and GIF are Allowed.</p>
      </label>
    
      <p className="my-2 text-gray-500 text-sm text-center">
        {dragging ? 'Drop the file here' : 'Drag and drop or click to upload'}
      </p>
    </div>
  );
};

export default DragDropUploader;
