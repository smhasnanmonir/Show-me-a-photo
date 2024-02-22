/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import "./homeUpload.css";

import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { storage } from "../firebase/firebase.config";

import Swal from "sweetalert2";
const HomeUpload = () => {
  const starsRef = ref(storage, "images/");
  const [file, setFile] = useState(null);
  const [imageList, setImageList] = useState([]);
  const randomLatterGenerator = () => {
    const random_1 =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    return random_1;
  };

  const uploadImage = () => {
    if (file) {
      console.log("Uploading");
      const storageRef = ref(
        storage,
        `images/${file}+${randomLatterGenerator()}`
      );
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your image has been uploaded",
          showConfirmButton: false,
          timer: 1500,
        });
        getDownloadURL(snapshot.ref).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    }
  };
  useEffect(() => {
    listAll(starsRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);
  return (
    <div className="">
      <div className="py-[25px] w-fit mx-auto">
        <input
          className="w-[250px]"
          onChange={(event) => {
            setFile(event.target.files[0]);
            console.log(event.target.files[0]);
          }}
          type="file"
        />

        <button
          className="px-3 py-2 bg-red-400 rounded-md text-white hover:bg-red-600 transition-all duration-300"
          onClick={() => {
            uploadImage();
          }}
        >
          Upload
        </button>
      </div>
      <div
        className="
          
          grid grid-cols-4 place-content-center gap-3 md:px-[15%] mx-auto
          
          "
      >
        {imageList.map((image) => {
          console.log(image);
          return (
            <div
              onClick={(event) => {
                event.preventDefault();
                window.open(image, "_blank");
              }}
              className="relative group"
            >
              <div className="">
                <h1 className="text-white cursor-pointer absolute w-full h-full transition-all duration-300 bg-black bg-opacity-50 font-semibold text-[14px] opacity-0 group-hover:opacity-100 flex items-center justify-center inset-0">
                  Click to open in new tab
                </h1>
              </div>
              <div className="overflow-hidden">
                <img
                  className="w-[250px] h-[350px] object-cover"
                  key={image}
                  src={image}
                  alt="image"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeUpload;
