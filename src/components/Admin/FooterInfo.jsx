import { TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const FooterInfo = () => {
   const [address, setAddress] = useState("");
   const [contactNo, setContactNo] = useState("");
   const [email, setEmail] = useState("");
   const [policy, setPolicy] = useState("");
   const [refundAndReturn, setRefundAndReturn] = useState("");
   const [shippingPolicy, setShippingPolicy] = useState("");
   const [security, setSecurity] = useState("");

   const fetchFooterInfo = async () => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         };

         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/footer`, config);
         console.log("🚀 ~ handleSubmit ~ data:", data.data);

         if (data && data.success) {
            setAddress(data.data.address);
            setContactNo(data.data.contact_no);
            setEmail(data.data.email);
            setPolicy(data.data.policy);
            setRefundAndReturn(data.data.refundAndReturn);
            setShippingPolicy(data.data.shippingPolicy);
            setSecurity(data.data.security);

         }
      } catch (err) {
         console.error(err);
         alert("something went wrong.");
      }
   };

   useEffect(() => {
      fetchFooterInfo();
   }, []);

   const handleSubmit = async () => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         };

         const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/footer/change`,
            {
               address,
               contact_no: contactNo,
               email,
               policy,
               refundAndReturn,
               shippingPolicy,
               security
            },
            config
         );
         console.log("🚀 ~ handleSubmit ~ data:", data);

         if (data && data.success) {
            alert("info updated successfully.");
         }
      } catch (err) {
         console.error(err);
         alert("something went wrong.");
      }
   };

   return (
      <form className="flex flex-col gap-2 max-w-[500px] w-full mx-auto">
         <TextField
            label="Address"
            variant="outlined"
            size="small"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
         />
         <TextField
            label="Contact No."
            variant="outlined"
            size="small"
            required
            value={contactNo}
            onChange={(e) => setContactNo(e.target.value)}
         />
         <TextField
            label="Email"
            variant="outlined"
            size="small"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
         {/* <TextareaAutosize
            label="Policy"
            variant="outlined"
            size="small"
            required
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
         /> */}

         <label htmlFor="message"> Policy</label>
         <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
         ></textarea>

         <label htmlFor="message">Refund And Return</label>
         <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={refundAndReturn}
            onChange={(e) => setRefundAndReturn(e.target.value)}
         ></textarea>

         <label htmlFor="message">Shipping Policy</label>
         <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={shippingPolicy}
            onChange={(e) => setShippingPolicy(e.target.value)}
         ></textarea>

         <label htmlFor="message">Security</label>
         <textarea
            id="message"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            value={security}
            onChange={(e) => setSecurity(e.target.value)}
         ></textarea>

         <div className="flex justify-end">
            <button
               type="button"
               className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
               onClick={handleSubmit}
            >
               Submit
            </button>
         </div>
      </form>
   );
};

export default FooterInfo;
