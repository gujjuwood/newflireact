import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

const BannerImages = () => {
   const [imagesPreview, setImagesPreview] = useState("");

   const [bannerList, setBannerList] = useState([]);

   const fetchBannerList = async () => {
      try {
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/benner`);

         console.log(data);
         if (data && data?.success) {
            setBannerList(data?.benners || []);
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      fetchBannerList();
   }, []);

   const handleChange = (e) => {
      const files = Array.from(e.target.files);

      setImagesPreview("");

      const reader = new FileReader();

      reader.onload = () => {
         if (reader.readyState === 2) {
            setImagesPreview(reader.result);
         }
      };
      reader.readAsDataURL(files?.[0]);
   };

   const handleAdd = async () => {
      try {
         const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/benner/add`, {
            images: imagesPreview,
         });

         if (data && data?.success) {
            setImagesPreview("");
            setBannerList(prev => [...prev, data?.data])
            alert("Banner Added");
         }
      } catch (err) {
         console.error(err);
      }
   };

   const deleteBanner = async (id, index) => {
      try {
         const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/benner`, {
            params: {
               id,
            },
         });

         if (data && data?.success) {
            setBannerList((prev) => prev.filter((item, i) => item?._id !== id));
            alert("deleted.");
         }
      } catch (err) {
         console.error(err);
      }
   };

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
            <input type="file" name="images" accept="image/*" onChange={handleChange} className="hidden" />
            Choose Files
         </label>
         <label
            className="rounded font-medium bg-primary-orange text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2"
            onClick={handleAdd}
         >
            Add
         </label>

         <div className="py-3">
            {bannerList?.map((item, i) => {
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
            })}
         </div>
      </div>
   );
};

export default BannerImages;
