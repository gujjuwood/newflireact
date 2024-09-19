import axios from "axios";
import React, { useEffect, useState } from "react";

const GifAdd = () => {
   const [imagesPreview, setImagesPreview] = useState("");
   const [file, setFile] = useState(null);

   const handleChange = (e) => {
      setFile(e.target.files[0]);
      const reader = new FileReader();

      reader.onload = () => {
         if (reader.readyState === 2) {
            setImagesPreview(reader.result);
         }
      };

      reader.readAsDataURL(e.target.files[0]);
   };

   const handleAdd = async () => {
      try {
         const formData = new FormData();
         formData.append("image", file);
         const config = {
            headers: {
               "Content-Type": "multipart/form-data",
               Authorization: localStorage.getItem("token"),
            },
         };
         const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/category/add`,
            formData
            //   config
         );

         console.log("🚀 ~ handleAdd ~ data:", data);
         if (data && data?.file) {
            await fetchGif();
            alert("uploaded");
         }
      } catch (err) {
         console.error(err);
         alert("failed to upload.");
      }
   };

   const fetchGif = async () => {
      try {
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/get/image`);
         console.log(process.env.REACT_APP_BACKEND_BASE_URL + data?.data);

         if (data?.data) {
            setImagesPreview(process.env.REACT_APP_BACKEND_BASE_URL + data?.data);
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      fetchGif();
   }, []);

   return (
      <div>
         <div className="flex gap-2 overflow-x-auto h-32 border rounded">
            {imagesPreview && (
               <div>
                  <img draggable="false" src={imagesPreview} alt="Product" className="w-full h-full object-contain" />
               </div>
            )}
         </div>
         <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
            <input type="file" name="images" onChange={handleChange} className="hidden" />
            Choose Files
         </label>
         <label
            className="rounded font-medium bg-primary-orange text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2"
            onClick={handleAdd}
         >
            Add
         </label>

         <div className="py-3">
            {/* {bannerList?.map((item, i) => {
                 return (
                    <div key={item?.image} className="flex items-center gap-2">
                       <img src={item?.image} alt="banner_image" className="w-9/12 h-auto object-contain" />
                       <button
                          onClick={() => deleteBanner(item?._id, i)}
                          className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                       >
                          <DeleteIcon />
                       </button>
                    </div>
                 );
              })} */}
         </div>
      </div>
   );
};

export default GifAdd;
