import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { REMOVE_PRODUCT_DETAILS, sizesLabel, sizesLabel1, sizesLabel2, UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { clearErrors, getProductDetails, updateProduct } from "../../actions/productAction";
import ImageIcon from "@mui/icons-material/Image";
import BackdropLoader from "../Layouts/BackdropLoader";
// import { categories } from "../../utils/constants";
import MetaData from "../Layouts/MetaData";
import { Checkbox, FormControlLabel, Button } from "@mui/material";
import axios from "axios";

const UpdateProduct = () => {
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();
   const navigate = useNavigate();
   const params = useParams();

   const { loading, product, error } = useSelector((state) => state.productDetails);
   const { loading: updateLoading, isUpdated, error: updateError } = useSelector((state) => state.product);

   const [highlights, setHighlights] = useState([]);
   const [highlightInput, setHighlightInput] = useState("");
   const [specs, setSpecs] = useState([]);
   const [specsInput, setSpecsInput] = useState({
      title: "",
      description: "",
   });

   const [colorList, setColorList] = useState([]);
   const [colorText, setColorText] = useState("");
   const [colorFile, setColorFile] = useState("");



   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [price, setPrice] = useState(0);
   const [cuttedPrice, setCuttedPrice] = useState(0);
   const [category, setCategory] = useState("");
   const [stock, setStock] = useState(0);
   const [warranty, setWarranty] = useState(0);
   const [brand, setBrand] = useState("");
   const [images, setImages] = useState([]);
   const [oldImages, setOldImages] = useState([]);
   const [imagesPreview, setImagesPreview] = useState([]);

   const [descriptionImage, setDescriptionImage] = useState([]);
   const [dOldImage, setDOldImage] = useState([]);
   const [descriptionImagePreview, setDescriptionImagePreview] = useState([]);

   const [logo, setLogo] = useState("");
   const [logoPreview, setLogoPreview] = useState("");

   const handleSpecsChange = (e) => {
      setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
   };


   const [hello, setHello] = useState([]);

   const fetchTextList = async () => {
      try {
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/category`);
         const finalArray = data.data.map((item) => item.text);

         if (data && data?.success) {
            setHello(finalArray)

            const hasMatch = sizesLabel.some(size => selectedSize.includes(size));
            if (hasMatch) {
               setSelectedSize2([]);
               setSelectedSize1([]);
            }
            const hasMatch1 = sizesLabel1.some(size => selectedSize1.includes(size));

            if (hasMatch1) {
               setSelectedSize2([]);
               setSelectedSize([]);
            }
            const hasMatch2 = sizesLabel2.some(size => selectedSize2.includes(size));

            if (hasMatch2) {
               setSelectedSize1([]);
               setSelectedSize([]);
            }

         }
      } catch (err) {
         console.error(err);
      }
   };
   const fetchTextList1 = async () => {
      try {
         console.log(sizesLabel, "kese hoi");
         console.log(selectedSize, "kese hoi");
         const hasMatch = sizesLabel.some(size => selectedSize.includes(size));

         if (hasMatch) {
            setSelectedSize2([]); // Unselect all
            setSelectedSize1([]); // Unselect all
         }
         const hasMatch1 = sizesLabel1.some(size => selectedSize1.includes(size));

         if (hasMatch1) {
            setSelectedSize2([]); // Unselect all
            setSelectedSize([]); // Unselect all
         }
         const hasMatch2 = sizesLabel2.some(size => selectedSize2.includes(size));

         if (hasMatch2) {
            setSelectedSize1([]); // Unselect all
            setSelectedSize([]); // Unselect all
         }
      } catch (err) {
         console.error(err);
      }
   };
   useEffect(() => {
      fetchTextList();
   }, []);
   const addSpecs = () => {
      if (!specsInput.title.trim() || !specsInput.title.trim()) return;
      setSpecs([...specs, specsInput]);
      setSpecsInput({ title: "", description: "" });
   };

   const addHighlight = () => {
      if (!highlightInput.trim()) return;
      setHighlights([...highlights, highlightInput]);
      setHighlightInput("");
   };

   const addColorImage = async () => {
      try {
         if (!colorText) {
            enqueueSnackbar("Add Color", { variant: "warning" });
            return;
         }

         if (!colorFile) {
            enqueueSnackbar("Add File", { variant: "warning" });
            return;
         }

         const formData = new FormData();

         formData.append("color", colorText);
         formData.append("product_id", params.id);
         formData.append("colorImage", colorFile);

         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         };
         const { data } = await axios.post(
            `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/product/image`,
            formData,
            config
         );

         if (data && data.success) {
            setColorList((prev) => [...prev, data.data]);
            setColorFile("");
            setColorText("");
            enqueueSnackbar("File Added ", { variant: "success" });
         }
      } catch (err) {
         console.error(err);
      }
   };

   const deleteHighlight = (index) => {
      setHighlights(highlights.filter((h, i) => i !== index));
   };

   const deleteColorImage = async (id, index) => {
      try {
         const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/product`, {
            params: {
               image_id: id,
            },
         });

         if (data && data?.success) {
            setColorList((prev) => prev.filter((item) => item._id !== id));
         }
      } catch (err) {
         console.error(err);
      }
   };

   const deleteSpec = (index) => {
      setSpecs(specs.filter((s, i) => i !== index));
   };

   const handleLogoChange = (e) => {
      const reader = new FileReader();

      setLogo("");
      setLogoPreview("");

      reader.onload = () => {
         if (reader.readyState === 2) {
            setLogoPreview(reader.result);
            setLogo(reader.result);
         }
      };

      reader.readAsDataURL(e.target.files[0]);
   };

   const handleColorImageChange = (e) => {
      const reader = new FileReader();

      setColorFile("");

      reader.onload = () => {
         if (reader.readyState === 2) {
            setColorFile(reader.result);
         }
      };

      reader.readAsDataURL(e.target.files[0]);
   };

   const handleProductImageChange = (e) => {
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPreview([]);
      setOldImages([]);

      files.forEach((file) => {
         const reader = new FileReader();

         reader.onload = () => {
            if (reader.readyState === 2) {
               setImagesPreview((oldData) => [...oldData, reader.result]);
               setImages((oldData) => [...oldData, reader.result]);
            }
         };
         reader.readAsDataURL(file);
      });
   };

   const handleDescriptionImageChange = (e) => {
      const files = Array.from(e.target.files);

      setDescriptionImage([]);
      setDescriptionImagePreview([]);
      setDOldImage([]);

      files.forEach((file) => {
         const reader = new FileReader();

         reader.onload = () => {
            if (reader.readyState === 2) {
               setDescriptionImagePreview((prev) => [...prev, reader.result]);
               setDescriptionImage((prev) => [...prev, reader.result]);
            }
         };

         reader.readAsDataURL(file);
      });
   };

   const newProductSubmitHandler = (e) => {
      e.preventDefault();

      // required field checks
      if (highlights.length <= 0) {
         enqueueSnackbar("Add Highlights", { variant: "warning" });
         return;
      }
      if (specs.length <= 1) {
         enqueueSnackbar("Add Minimum 2 Specifications", { variant: "warning" });
         return;
      }

      const formData = new FormData();

      formData.set("name", name);
      formData.set("description", description);
      formData.set("price", price);
      formData.set("cuttedPrice", cuttedPrice);
      formData.set("category", category);
      formData.set("stock", stock);
      formData.set("warranty", warranty);
      formData.set("brandname", brand);
      formData.set("logo", logo);

      selectedSize.forEach((item) => { formData.append("size", item); })
      selectedSize1.forEach((item) => { formData.append("size", item); })
      selectedSize2.forEach((item) => { formData.append("size", item); })

      images.forEach((image) => {
         formData.append("images", image);
      });

      descriptionImage.forEach((image) => {
         formData.append("desk_images", image);
      });

      highlights.forEach((h) => {
         formData.append("highlights", h);
      });

      specs.forEach((s) => {
         formData.append("specifications", JSON.stringify(s));
      });

      dispatch(updateProduct(params.id, formData));
   };

   const productId = params.id;

   useEffect(() => {
      if (product && product._id !== productId) {
         dispatch(getProductDetails(productId));
      } else {
         setName(product.name);
         setDescription(product.description);
         setPrice(product.price);
         setCuttedPrice(product.cuttedPrice);
         setCategory(product.category);
         setStock(product.stock);
         setWarranty(product.warranty);
         setBrand(product.brand.name);
         setHighlights(product.highlights);
         setSpecs(product.specifications);
         setOldImages(product.images);
         setDOldImage(product.desk_images);
         setLogoPreview(product.brand.logo.url);
         setSelectedSize(product.size);
         setSelectedSize1(product.size);
         setSelectedSize2(product.size);
         setColorList(product?.ProductImages || []);
      }
      if (error) {
         enqueueSnackbar(error, { variant: "error" });
         dispatch(clearErrors());
      }
      if (updateError) {
         enqueueSnackbar(updateError, { variant: "error" });
         dispatch(clearErrors());
      }
      if (isUpdated) {
         enqueueSnackbar("Product Updated Successfully", { variant: "success" });
         dispatch({ type: UPDATE_PRODUCT_RESET });
         dispatch({ type: REMOVE_PRODUCT_DETAILS });
         navigate("/admin/products");
      }
   }, [dispatch, error, updateError, isUpdated, productId, product, navigate, enqueueSnackbar]);
   const [selectedSize, setSelectedSize] = useState([]);
   const [selectedSize1, setSelectedSize1] = useState([]);
   const [selectedSize2, setSelectedSize2] = useState([]);

   const hasMatch = sizesLabel.some(size => selectedSize.includes(size));
   const hasMatch1 = sizesLabel1.some(size => selectedSize1.includes(size));
   const hasMatch2 = sizesLabel2.some(size => selectedSize2.includes(size));

   useEffect(() => {
      if (hasMatch) {
         setSelectedSize2([]);
         setSelectedSize1([]);
      }
      if (hasMatch1) {
         setSelectedSize2([]);
         setSelectedSize([]);
      }
      if (hasMatch2) {
         setSelectedSize1([]);
         setSelectedSize([]);
      }
   }, [hasMatch, hasMatch1, hasMatch2])


   const handleSelectAll = () => {
      if (selectedSize.length === sizesLabel.length) {
         setSelectedSize([]); // Unselect all
      } else {
         setSelectedSize2([]); // Unselect all
         setSelectedSize1([]); // Unselect all
         setSelectedSize(sizesLabel); // Select all
      }
   };
   const handleSelectAll1 = () => {
      if (selectedSize1.length === sizesLabel1.length) {
         setSelectedSize1([]); // Unselect all
      } else {
         setSelectedSize([]); // Unselect all
         setSelectedSize2([]); //Unselect all
         setSelectedSize1(sizesLabel1); // Select all
      }
   };
   const handleSelectAll2 = () => {
      if (selectedSize2.length === sizesLabel2.length) {
         setSelectedSize2([]); // Unselect all
      } else {
         setSelectedSize([]); // Unselect all
         setSelectedSize1([]); // Unselect all
         setSelectedSize2(sizesLabel2); // Select all
      }
   };

   return (
      <>
         <MetaData title="Admin: Update Product" />

         {loading && <BackdropLoader />}
         {updateLoading && <BackdropLoader />}
         <form
            onSubmit={newProductSubmitHandler}
            encType="multipart/form-data"
            className="flex flex-col sm:flex-row bg-white rounded-lg shadow p-4"
            id="mainform"
         >
            <div className="flex flex-col gap-3 m-2 sm:w-1/2">
               <TextField
                  label="Name"
                  variant="outlined"
                  size="small"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <TextField
                  label="Description"
                  multiline
                  rows={3}
                  required
                  variant="outlined"
                  size="small"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
               />

               <h2 className="font-medium">Description Images</h2>
               <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                  {dOldImage &&
                     dOldImage.map((image, i) => (
                        <img
                           draggable="false"
                           src={image.url}
                           alt="Product"
                           key={i}
                           className="w-full h-full object-contain"
                        />
                     ))}
                  {descriptionImagePreview.map((image, i) => (
                     <img
                        draggable="false"
                        src={image}
                        alt="Product"
                        key={i}
                        className="w-full h-full object-contain"
                     />
                  ))}
               </div>
               <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                  <input
                     type="file"
                     name="images"
                     accept="image/*"
                     multiple
                     onChange={handleDescriptionImageChange}
                     className="hidden"
                  />
                  Choose Files
               </label>

               <div className="flex justify-between">
                  <TextField
                     label="Price"
                     type="number"
                     variant="outlined"
                     size="small"
                     InputProps={{
                        inputProps: {
                           min: 0,
                        },
                     }}
                     required
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                  />
                  <TextField
                     label="Cutted Price"
                     type="number"
                     variant="outlined"
                     size="small"
                     InputProps={{
                        inputProps: {
                           min: 0,
                        },
                     }}
                     required
                     value={cuttedPrice}
                     onChange={(e) => setCuttedPrice(e.target.value)}
                  />
               </div>
               <div className="flex justify-between gap-4">
                  <TextField
                     label="Category"
                     select
                     fullWidth
                     variant="outlined"
                     size="small"
                     required
                     value={category}
                     onChange={(e) => setCategory(e.target.value)}
                  >
                     {hello.map((el, i) => (
                        <MenuItem value={el} key={i}>
                           {el}
                        </MenuItem>
                     ))}
                  </TextField>
                  <TextField
                     label="Stock"
                     type="number"
                     variant="outlined"
                     size="small"
                     InputProps={{
                        inputProps: {
                           min: 0,
                        },
                     }}
                     required
                     value={stock}
                     onChange={(e) => setStock(e.target.value)}
                  />
                  <TextField
                     label="Warranty"
                     type="number"
                     variant="outlined"
                     size="small"
                     InputProps={{
                        inputProps: {
                           min: 0,
                        },
                     }}
                     required
                     value={warranty}
                     onChange={(e) => setWarranty(e.target.value)}
                  />
               </div>

               <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center border rounded">
                     <input
                        value={highlightInput}
                        onChange={(e) => setHighlightInput(e.target.value)}
                        type="text"
                        placeholder="Highlight"
                        className="px-2 flex-1 outline-none border-none"
                     />
                     <span
                        onClick={() => addHighlight()}
                        className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer"
                     >
                        Add
                     </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                     {highlights.map((h, i) => (
                        <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                           <p className="text-green-800 text-sm font-medium">{h}</p>
                           <span
                              onClick={() => deleteHighlight(i)}
                              className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                           >
                              <DeleteIcon />
                           </span>
                        </div>
                     ))}
                  </div>

                  <h2 className="font-medium">Sizes</h2>

                  <Button onClick={handleSelectAll}>
                     {selectedSize.length === sizesLabel.length ? 'Unselect All' : 'Select All'}
                  </Button>

                  <div className="flex items-center gap-2">
                     {sizesLabel.map((item) => (
                        <FormControlLabel
                           key={item}
                           control={<Checkbox />}
                           onChange={(e, checked) => {
                              if (checked) {
                                 setSelectedSize2([]);
                                 setSelectedSize1([]);
                                 setSelectedSize((prev) => [...prev, item]);
                              } else {
                                 setSelectedSize1([]);
                                 setSelectedSize2([]);
                                 setSelectedSize((prev) =>
                                    prev.filter((size) => size !== item)
                                 );
                              }
                           }}
                           checked={selectedSize.includes(item)}
                           value={item}
                           label={item}
                        />
                     ))}
                  </div>

                  <Button onClick={handleSelectAll1}>
                     {selectedSize1.length === sizesLabel1.length ? 'Unselect All' : 'Select All'}
                  </Button>

                  <div className="flex items-center gap-2">
                     {sizesLabel1.map((item) => (
                        <FormControlLabel
                           key={item}
                           control={<Checkbox />}
                           onChange={(e, checked) => {
                              if (checked) {
                                 setSelectedSize([]);
                                 setSelectedSize2([]);
                                 setSelectedSize1((prev) => [...prev, item]);
                              } else {
                                 setSelectedSize([]);
                                 setSelectedSize2([]);
                                 setSelectedSize1((prev) =>
                                    prev.filter((size) => size !== item)
                                 );
                              }
                           }}
                           checked={selectedSize1.includes(item)}
                           value={item}
                           label={item}
                        />
                     ))}
                  </div>

                  <Button onClick={handleSelectAll2}>
                     {selectedSize2.length === sizesLabel2.length ? 'Unselect All' : 'Select All'}
                  </Button>

                  <div className="flex items-center gap-2">
                     {sizesLabel2.map((item) => (
                        <FormControlLabel
                           key={item}
                           control={<Checkbox />}
                           onChange={(e, checked) => {
                              if (checked) {
                                 setSelectedSize1([]);
                                 setSelectedSize([]);
                                 setSelectedSize2((prev) => [...prev, item]);
                              } else {
                                 setSelectedSize1([]);
                                 setSelectedSize([]);
                                 setSelectedSize2((prev) =>
                                    prev.filter((size) => size !== item)
                                 );
                              }
                           }}
                           checked={selectedSize2.includes(item)}
                           value={item}
                           label={item}
                        />
                     ))}
                  </div>
               </div>

               <h2 className="font-medium">Brand Details</h2>
               <div className="flex justify-between gap-4 items-start">
                  <TextField
                     label="Brand"
                     type="text"
                     variant="outlined"
                     size="small"
                     required
                     value={brand}
                     onChange={(e) => setBrand(e.target.value)}
                  />
                  <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                     {!logoPreview ? (
                        <ImageIcon />
                     ) : (
                        <img
                           draggable="false"
                           src={logoPreview}
                           alt="Brand Logo"
                           className="w-full h-full object-contain"
                        />
                     )}
                  </div>
                  <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                     <input type="file" name="logo" accept="image/*" onChange={handleLogoChange} className="hidden" />
                     Choose Logo
                  </label>
               </div>
            </div>

            <div className="flex flex-col gap-2 m-2 sm:w-1/2">
               <h2 className="font-medium">Specifications</h2>

               <div className="flex justify-evenly gap-2 items-center">
                  <TextField
                     value={specsInput.title}
                     onChange={handleSpecsChange}
                     name="title"
                     label="Name"
                     placeholder="Model No"
                     variant="outlined"
                     size="small"
                  />
                  <TextField
                     value={specsInput.description}
                     onChange={handleSpecsChange}
                     name="description"
                     label="Description"
                     placeholder="WJDK42DF5"
                     variant="outlined"
                     size="small"
                  />
                  <span
                     onClick={() => addSpecs()}
                     className="py-2 px-6 bg-primary-blue text-white rounded hover:shadow-lg cursor-pointer"
                  >
                     Add
                  </span>
               </div>

               <div className="flex flex-col gap-1.5">
                  {specs.map((spec, i) => (
                     <div className="flex justify-between items-center text-sm rounded bg-blue-50 py-1 px-2">
                        <p className="text-gray-500 font-medium">{spec.title}</p>
                        <p>{spec.description}</p>
                        <span
                           onClick={() => deleteSpec(i)}
                           className="text-red-600 hover:bg-red-200 bg-red-100 p-1 rounded-full cursor-pointer"
                        >
                           <DeleteIcon />
                        </span>
                     </div>
                  ))}
               </div>

               <h2 className="font-medium">Product Images</h2>
               <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                  {oldImages &&
                     oldImages.map((image, i) => (
                        <img
                           draggable="false"
                           src={image.url}
                           alt="Product"
                           key={i}
                           className="w-full h-full object-contain"
                        />
                     ))}
                  {imagesPreview.map((image, i) => (
                     <div>
                        <img
                           draggable="false"
                           src={image}
                           alt="Product"
                           key={i}
                           className="w-full h-full object-contain"
                        />
                     </div>
                  ))}
               </div>
               <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2">
                  <input
                     type="file"
                     name="images"
                     accept="image/*"
                     multiple
                     onChange={handleProductImageChange}
                     className="hidden"
                  />
                  Choose Files
               </label>

               <div className="flex justify-between items-center border rounded">
                  <input
                     value={colorText}
                     onChange={(e) => setColorText(e.target.value)}
                     type="text"
                     placeholder="Color"
                     className="px-2 flex-1 outline-none border-none"
                  />
                  <div className="w-24 h-10 flex items-center justify-center border rounded-lg">
                     {!colorFile ? (
                        <ImageIcon />
                     ) : (
                        <img draggable="false" src={colorFile} alt="image" className="w-full h-full object-contain" />
                     )}
                  </div>
                  <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white py-2 px-2.5 shadow hover:shadow-lg">
                     <input
                        type="file"
                        name="colorImage"
                        accept="image/*"
                        onChange={handleColorImageChange}
                        className="hidden"
                     />
                     Choose Image
                  </label>
                  <span
                     onClick={addColorImage}
                     className="py-2 px-6 bg-primary-blue text-white rounded-r hover:shadow-lg cursor-pointer"
                  >
                     Add
                  </span>
               </div>

               <div className="flex flex-col gap-1.5">
                  {colorList.map((pi, i) => (
                     <div className="flex justify-between rounded items-center py-1 px-2 bg-green-50">
                        <p className="text-green-800 text-sm font-medium">{pi?.color}</p>
                        <img src={pi?.image} alt="pi" className="w-10 h-10 object-contain" />
                        <span
                           onClick={() => deleteColorImage(pi?._id, i)}
                           className="text-red-600 hover:bg-red-100 p-1 rounded-full cursor-pointer"
                        >
                           <DeleteIcon />
                        </span>
                     </div>
                  ))}
               </div>

               <div className="flex justify-end">
                  <input
                     form="mainform"
                     type="submit"
                     className="bg-primary-orange uppercase w-1/3 p-3 text-white font-medium rounded shadow hover:shadow-lg cursor-pointer"
                     value="Update"
                  />
               </div>
            </div>
         </form>
      </>
   );
};

export default UpdateProduct;
