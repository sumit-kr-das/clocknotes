"use client";
import Image from "next/image";
import { useRef, useState } from "react";

const ImageSettings = ({
  image,
  setImage,
  companyLogo,
}: {
  image: File | null;
  setImage: (file: File | null) => void;
  companyLogo?: string;
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      return;
    }

    const file = e.target!.files![0];
    if (file.name) {
      setImage(file);
    }
  };
  return (
    <>
      <div>Company Logo</div>
      <div
        onClick={handleClick}
        className="p-5 flex flex-col text-gray-400 border border-gray-200 border-dashed rounded cursor-pointer w-1/3"
      >
        <div className="flex flex-col items-center justify-center py-10 text-center">
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              width={120}
              height={120}
              alt="user_default"
              className="w-[120px] h-[120px] rounded-full border"
            />
          ) : (
            <>
              {companyLogo ? (
                <img
                  src={companyLogo}
                  width={120}
                  height={120}
                  alt="user_default"
                  className="w-[120px] h-[120px] rounded-full border"
                />
              ) : (
                <>
                  <svg
                    className="w-6 h-6 mr-1 text-current-50"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="m-0">
                    Drag your files here or click in this area.
                  </p>
                </>
              )}
            </>
          )}
        </div>
        <input
          type="file"
          ref={inputRef}
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </>
  );
};
export default ImageSettings;
