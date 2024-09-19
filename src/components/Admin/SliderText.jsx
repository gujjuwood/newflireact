import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const SliderText = () => {
   const [value, setValue] = useState("");
   const [textList, setTextList] = useState([]);

   const handleAdd = async () => {
      try {
         const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/swipper/add`, {
            text: value,
         });
         if (data && data?.success) {
            setTextList((prev) => [...prev, data?.data]);
            setValue("");
         }
      } catch (err) {
         console.error(err);
      }
   };

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

   const handleDelete = async (id, i) => {
      try {
         const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/swipper`, {
            params: {
               swipper_id: id,
            },
         });

         if (data && data?.success) {
            setTextList((prev) => prev.filter((item) => item?._id !== id));
         }
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <div>
         <div>
            <div className="flex items-center gap-2">
               <TextField
                  id="outlined-basic"
                  size="small"
                  label="Text"
                  variant="outlined"
                  className="w-full"
                  value={value}
                  onChange={(e) => {
                     setValue(e.target.value);
                  }}
               />
               <Button variant="contained" onClick={handleAdd}>
                  Add
               </Button>
            </div>

            {textList && textList?.length > 0 && (
               <ul>
                  {textList?.map((item, index) => {
                     return (
                        <li
                           className="flex items-center gap-2 justify-between bg-gray-300 p-2 rounded my-1 hover:bg-gray-400"
                           key={item?.text + index}
                        >
                           <p>{item?.text}</p>
                           <button
                              className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                              type="button"
                              onClick={() => {
                                 handleDelete(item?._id, index);
                              }}
                           >
                              <DeleteIcon />
                           </button>
                        </li>
                     );
                  })}
               </ul>
            )}
         </div>
      </div>
   );
};

export default SliderText;
