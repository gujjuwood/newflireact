import React, { useEffect, useState } from "react";
import "./TextSlider.css"; // For custom animations
import axios from "axios";

const TextSlider = () => {
   const [textList, setTextList] = useState([]);

   // Duplicate the text array to create a seamless loop
   const doubledText = [
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
      ...textList,
   ];

   const fetchTextList = async () => {
      try {
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/swipper`);
         if (data && data?.success) {
            setTextList(data?.data);
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      fetchTextList();
   }, []);

   return (
      <div className="marquee-wrapper overflow-hidden whitespace-nowrap bg-primary-blue text-white -mt-2 -mb-2 ">
         <div className="marquee-content inline-block animate-marquee 	">
            {doubledText.map((item, index) => (
               <span key={"asdfkhfisrej_w5987" + index} className="inline-block mx-4">
                  {item.text}
               </span>
            ))}
         </div>
      </div>
   );
};

export default TextSlider;
