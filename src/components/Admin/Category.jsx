import axios from "axios";
import React, { useEffect, useState } from "react";

const GifSection = () => {
   const [gif, setGif] = useState(null);
   console.log("🚀 ~ GifSection ~ gif:", gif)
   const fetchGif = async () => {
      try {
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/get/image`);
         console.log(process.env.REACT_APP_BACKEND_BASE_URL + data?.data);

         if (data?.data) {
            setGif(process.env.REACT_APP_BACKEND_BASE_URL + data?.data);
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      fetchGif();
   }, []);

   return (
      <div className="mb-10 -mt-2">
         <img src={gif} alt="" className="w-full h-auto" />
      </div>
   );
};

export default GifSection;
