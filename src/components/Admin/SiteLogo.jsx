import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadImage } from "../../actions/productAction";

const SiteLogo = () => {
   const dispatch = useDispatch();
   const [choosedFile, setChoosedFile] = useState(null);
   const handleChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            if (reader.readyState === 2) {
               setChoosedFile(reader.result); // Set the file's data URL to state
            }
         };
         reader.readAsDataURL(file); // Read the file as a data URL
      }
   };

   const handleUploadImage = () => {
      try {
         dispatch(uploadImage({ images: choosedFile }));
      } catch (err) {
         console.error(err);
         alert("something went wrong....");
      }
   };

   return (
      <form className="flex items-center gap-2 flex-col">
         {choosedFile && (
            <img draggable="false" src={choosedFile} alt="Product" className="w-[300px] h-[300px] object-contain" />
         )}
         <label class="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
            <input type="file" name="images" accept="image/*" class="hidden" onChange={handleChange} />
            Choose Files
         </label>
         {/* <input type="file" /> */}
         <button
            type="button"
            onClick={handleUploadImage}
            className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer"
         >
            Upload Logo
         </button>
      </form>
   );
};

export default SiteLogo;
