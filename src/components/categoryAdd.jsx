import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";


const SiteLogo = () => {
   const [choosedFile, setChoosedFile] = useState(null);
   const [value, setValue] = useState("");
   const handleChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
         const reader = new FileReader();
         reader.onload = () => {
            if (reader.readyState === 2) {
               setChoosedFile(reader.result);
            }
         };
         reader.readAsDataURL(file);
      }
   };
   const [textList, setTextList] = useState([]);
   const handleUploadImage = async () => {
      try {
         // dispatch(uploadImage1({ images: choosedFile, text: value }));
         const imageData = { images: choosedFile, text: value }
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         };
         const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/category/add`,
            imageData,
            config
         );

         if (data && data?.success) {
            setTextList((prev) => [...prev, data?.data]);
            setValue("");
         }
      } catch (err) {
         console.error(err);
         alert("something went wrong....");
      }
   };

   const fetchTextList = async () => {
      try {
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/category`);

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
         const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/category`, {
            params: {
               id: id,
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
      <div >
         <div className="flex items-center gap-2 justify-between">

            {choosedFile && (
               <img draggable="false" src={choosedFile} alt="Product" style={{ display: 'none' }} className="w-[300px] h-[300px] object-contain" />
            )}

            {/* <div className="flex items-center justify-between"> */}

            <TextField
               id="outlined-basic"
               size="small"
               label="Text"
               variant="outlined"
               className="w-96"
               value={value}
               onChange={(e) => {
                  setValue(e.target.value);
               }}
            />
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
         </div>
         <div>

            {textList && textList?.length > 0 && (
               <ul>
                  {textList?.map((item, index) => {
                     return (
                        <li
                           className="flex items-center gap-2 justify-between bg-gray-300 p-2 rounded my-1 hover:bg-gray-400"
                           key={item?.text + index}
                        >
                          <h3 className="text-xl">{item?.text}</h3>

                           <img src={item?.image} alt="banner_image" className="h-24 w-24 object-contain rounded-full" />
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

export default SiteLogo;
