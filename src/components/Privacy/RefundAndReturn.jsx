import axios from "axios";
import React, { useEffect, useState } from "react";

const RefundAndReturn = () => {
   const [footerInfo, setFooterInfo] = useState({});

   const fetchFooterInfo = async () => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         };

         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/footer`, config);

         if (data && data.success) {
            setFooterInfo(data.data);
         }
      } catch (err) {
         console.error(err);
         alert("something went wrong.");
      }
   };

   useEffect(() => {
      fetchFooterInfo();
   }, []);

   return (
      <div className="pt-16 p-4 mt-28">
         <h1 className="pb-5 text-2xl">Refund And Return</h1>
         <p className="text-sm">{footerInfo?.refundAndReturn}</p>
      </div>
   );
};

export default RefundAndReturn;
