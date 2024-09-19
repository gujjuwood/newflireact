import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { clearErrors, deleteProduct, getAdminProducts, newReview } from "../../actions/productAction";
import Rating from "@mui/material/Rating";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import Actions from "./Actions";
import MetaData from "../Layouts/MetaData";
import BackdropLoader from "../Layouts/BackdropLoader";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";

const ProductTable = () => {
   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();

   const [selectedProductId, setSelectedProductId] = useState(null);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState("");

   const [reviewPopupOpen, setReviewPopupOpen] = useState(false);

   const { products, error } = useSelector((state) => state.products);
   const { loading, isDeleted, error: deleteError } = useSelector((state) => state.product);

   const [deleteConfirmPopup, setDeleteConfirmPopup] = useState(false);

   useEffect(() => {
      if (error) {
         enqueueSnackbar(error, { variant: "error" });
         dispatch(clearErrors());
      }
      if (deleteError) {
         enqueueSnackbar(deleteError, { variant: "error" });
         dispatch(clearErrors());
      }
      if (isDeleted) {
         enqueueSnackbar("Product Deleted Successfully", { variant: "success" });
         dispatch({ type: DELETE_PRODUCT_RESET });
      }
      dispatch(getAdminProducts());
   }, [dispatch, error, deleteError, isDeleted, enqueueSnackbar]);

   const deleteProductHandler = (id) => {
      dispatch(deleteProduct(id));
   };

   const handleStarsClick = (id) => {
      setSelectedProductId(id);
      setReviewPopupOpen(true);
   };

   const handleDialogClose = () => {
      setSelectedProductId(null);
      setReviewPopupOpen(false);
      setRating(0);
      setComment("");
   };

   const columns = [
      {
         field: "id",
         headerName: "Product ID",
         minWidth: 100,
         flex: 0.5,
      },
      {
         field: "name",
         headerName: "Name",
         minWidth: 200,
         flex: 1,
         renderCell: (params) => {
            return (
               <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full">
                     <img
                        draggable="false"
                        src={params.row.image}
                        alt={params.row.name}
                        className="w-full h-full rounded-full object-cover"
                     />
                  </div>
                  {params.row.name}
               </div>
            );
         },
      },
      {
         field: "category",
         headerName: "Category",
         minWidth: 100,
         flex: 0.1,
      },
      {
         field: "stock",
         headerName: "Stock",
         type: "number",
         headerAlign: "left",
         align: "left",
         minWidth: 70,
         flex: 0.1,
         renderCell: (params) => {
            return (
               <>
                  {params.row.stock < 10 ? (
                     <span className="font-medium text-red-700 rounded-full bg-red-200 p-1 w-6 h-6 flex items-center justify-center">
                        {params.row.stock}
                     </span>
                  ) : (
                     <span className="">{params.row.stock}</span>
                  )}
               </>
            );
         },
      },
      {
         field: "price",
         headerName: "Price",
         type: "number",
         minWidth: 100,
         headerAlign: "left",
         align: "left",
         flex: 0.2,
         renderCell: (params) => {
            return <span>₹{params.row.price.toLocaleString()}</span>;
         },
      },
      {
         field: "cprice",
         headerName: "Cutted Price",
         type: "number",
         minWidth: 100,
         headerAlign: "left",
         align: "left",
         flex: 0.2,
         renderCell: (params) => {
            return <span>₹{params.row.cprice.toLocaleString()}</span>;
         },
      },
      {
         field: "rating",
         headerName: "Rating",
         type: "number",
         minWidth: 100,
         flex: 0.1,
         align: "left",
         headerAlign: "left",
         renderCell: (params) => {
            return (
               <button
                  type="button"
                  onClick={() => {
                     handleStarsClick(params.row.id);
                  }}
               >
                  <Rating readOnly value={params.row.rating} size="small" precision={0.5} />
               </button>
            );
         },
      },
      {
         field: "actions",
         headerName: "Actions",
         minWidth: 100,
         flex: 0.3,
         type: "number",
         sortable: false,
         renderCell: (params) => {
            return <Actions editRoute={"product"} deleteHandler={deleteProductHandler} id={params.row.id} />;
         },
      },
   ];

   const rows = [];

   products &&
      products.forEach((item) => {
         rows.unshift({
            id: item._id,
            name: item.name,
            image: item.images[0].url,
            category: item.category,
            stock: item.stock,
            price: item.price,
            cprice: item.cuttedPrice,
            rating: item.ratings,
         });
      });

   const reviewSubmitHandler = () => {
      if (rating === 0 || !comment.trim()) {
         enqueueSnackbar("Empty Review", { variant: "error" });
         return;
      }
      const formData = new FormData();
      formData.set("rating", rating);
      formData.set("comment", comment);
      formData.set("productId", selectedProductId);
      dispatch(newReview(formData));
      handleDialogClose(false);
      window.location.reload();
   };

   const handleDeleteAll = async () => {
      try {
         const { data } = await axios.delete(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/products/delete/all`);
         if (data) {
            window.location.reload();
         }
      } catch (err) {
         console.error(err);
         alert("Failed to delete.");
      }
   };

   return (
      <>
         <MetaData title="Admin Products" />

         {loading && <BackdropLoader />}

         <div className="flex justify-between items-center">
            <h1 className="text-lg font-medium uppercase">products</h1>
            <div className="flex items-center gap-2">
               <button
                  type="button"
                  onClick={() => {
                     setDeleteConfirmPopup(true);
                  }}
                  className="py-2 px-4 rounded shadow font-medium text-white bg-red-500 hover:shadow-lgc"
               >
                  Delete All Products
               </button>
               <Link
                  to="/admin/new_product"
                  className="py-2 px-4 rounded shadow font-medium text-white bg-primary-blue hover:shadow-lg"
               >
                  New Product
               </Link>
            </div>
         </div>
         <div className="bg-white rounded-xl shadow-lg w-full" style={{ height: 470 }}>
            <DataGrid
               rows={rows}
               columns={columns}
               pageSize={10}
               disableSelectIconOnClick
               sx={{
                  boxShadow: 0,
                  border: 0,
               }}
            />
         </div>

         <Dialog
            aria-labelledby="review-dialog"
            open={deleteConfirmPopup}
            onClose={() => {
               setDeleteConfirmPopup(false);
            }}
         >
            <DialogTitle className="border-b">Delete All Products </DialogTitle>
            <DialogContent className="flex flex-col m-1 gap-4">
               <h5>Are you sure to delete all products?</h5>
            </DialogContent>
            <DialogActions className="!flex !items-center !justify-center">
               <button
                  onClick={() => {
                     setDeleteConfirmPopup(false);
                  }}
                  className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
               >
                  Cancel
               </button>
               <button
                  onClick={handleDeleteAll}
                  className="py-2 px-6 rounded bg-red-500 hover:bg-red-700 text-white shadow uppercase"
               >
                  Delete All
               </button>
            </DialogActions>
         </Dialog>

         <Dialog
            aria-labelledby="review-dialog"
            open={reviewPopupOpen && selectedProductId}
            onClose={handleDialogClose}
         >
            <DialogTitle className="border-b">Submit Review</DialogTitle>
            <DialogContent className="flex flex-col m-1 gap-4">
               <Rating onChange={(e) => setRating(e.target.value)} value={rating} size="large" precision={0.5} />
               <TextField
                  label="Review"
                  multiline
                  rows={3}
                  sx={{ width: 400 }}
                  size="small"
                  variant="outlined"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
               />
            </DialogContent>
            <DialogActions>
               <button
                  onClick={handleDialogClose}
                  className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase"
               >
                  Cancel
               </button>
               <button
                  onClick={reviewSubmitHandler}
                  className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase"
               >
                  Submit
               </button>
            </DialogActions>
         </Dialog>
      </>
   );
};

export default ProductTable;
