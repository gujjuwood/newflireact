import axios from "axios";
import {
   ALL_PRODUCTS_FAIL,
   ALL_PRODUCTS_REQUEST,
   ALL_PRODUCTS_SUCCESS,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_DETAILS_FAIL,
   ADMIN_PRODUCTS_REQUEST,
   ADMIN_PRODUCTS_SUCCESS,
   ADMIN_PRODUCTS_FAIL,
   CLEAR_ERRORS,
   NEW_REVIEW_REQUEST,
   NEW_REVIEW_SUCCESS,
   NEW_REVIEW_FAIL,
   NEW_PRODUCT_REQUEST,
   NEW_PRODUCT_SUCCESS,
   NEW_PRODUCT_FAIL,
   UPDATE_PRODUCT_REQUEST,
   UPDATE_PRODUCT_SUCCESS,
   UPDATE_PRODUCT_FAIL,
   DELETE_PRODUCT_REQUEST,
   DELETE_PRODUCT_SUCCESS,
   DELETE_PRODUCT_FAIL,
   ALL_REVIEWS_REQUEST,
   ALL_REVIEWS_SUCCESS,
   ALL_REVIEWS_FAIL,
   DELETE_REVIEW_REQUEST,
   DELETE_REVIEW_SUCCESS,
   DELETE_REVIEW_FAIL,
   SLIDER_PRODUCTS_REQUEST,
   SLIDER_PRODUCTS_SUCCESS,
   SLIDER_PRODUCTS_FAIL,
   IMAGE_UPLOAD_FAILED,
   IMAGE_UPLOAD_REQ,
   IMAGE_UPLOAD_SUCCESS,
   
} from "../constants/productConstants";
import { type } from "@testing-library/user-event/dist/type";

const config = {
   headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
   },
};

console.log("config", config);

// Get All Products --- Filter/Search/Sort
export const getProducts =
   (keyword = "", category, price = [0, 200000], ratings = 0, currentPage = 1) =>
   async (dispatch) => {
      try {
         dispatch({ type: ALL_PRODUCTS_REQUEST });

         let url = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/products?keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
         if (category) {
            url = `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/products?keyword=${keyword}&category=${category}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&page=${currentPage}`;
         }
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         };
         const { data } = await axios.get(url, config);

         dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
         });
      } catch (error) {
         dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
         });
      }
   };

// Get All Products Of Same Category
export const getSimilarProducts = (category) => async (dispatch) => {
   try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.get(
         `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/products?category=${category}`,
         config
      );

      dispatch({
         type: ALL_PRODUCTS_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: ALL_PRODUCTS_FAIL,
         payload: error.response.data.message,
      });
   }
};

// Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
   try {
      dispatch({ type: PRODUCT_DETAILS_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/product/${id}`, config);

      dispatch({
         type: PRODUCT_DETAILS_SUCCESS,
         payload: data.product,
      });
   } catch (error) {
      dispatch({
         type: PRODUCT_DETAILS_FAIL,
         payload: error.response.data.message,
      });
   }
};

// New/Update Review
export const newReview = (reviewData) => async (dispatch) => {
   try {
      dispatch({ type: NEW_REVIEW_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.put(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/review`, reviewData, config);

      dispatch({
         type: NEW_REVIEW_SUCCESS,
         payload: data.success,
      });
   } catch (error) {
      dispatch({
         type: NEW_REVIEW_FAIL,
         payload: error.response.data.message,
      });
   }
};

// Get All Products ---PRODUCT SLIDER
export const getSliderProducts = () => async (dispatch) => {
   try {
      dispatch({ type: SLIDER_PRODUCTS_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/products/all`, config);

      dispatch({
         type: SLIDER_PRODUCTS_SUCCESS,
         payload: data.products,
      });
   } catch (error) {
      dispatch({
         type: SLIDER_PRODUCTS_FAIL,
         payload: error.response.data.message,
      });
   }
};

// Get All Products ---ADMIN
export const getAdminProducts = () => async (dispatch) => {
   try {
      dispatch({ type: ADMIN_PRODUCTS_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/admin/products`, config);

      dispatch({
         type: ADMIN_PRODUCTS_SUCCESS,
         payload: data.products,
      });
   } catch (error) {
      dispatch({
         type: ADMIN_PRODUCTS_FAIL,
         payload: error.response.data.message,
      });
   }
};

// New Product ---ADMIN
export const createProduct = (productData) => async (dispatch) => {
   console.log("config", config);

   try {
      dispatch({ type: NEW_PRODUCT_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.post(
         `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/admin/product/new`,
         productData,
         config
      );

      dispatch({
         type: NEW_PRODUCT_SUCCESS,
         payload: data,
      });
   } catch (error) {
      dispatch({
         type: NEW_PRODUCT_FAIL,
         payload: error.response.data.message,
      });
   }
};

export const uploadImage = (imageData) => async (dispatch) => {
   try {
      dispatch({ type: IMAGE_UPLOAD_REQ });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };

      const { data } = await axios.post(
         `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/logo/change`,
         imageData,
         config
      );

      if(data && data?.success) {
         window.location.reload()
      }

      dispatch({
         type: IMAGE_UPLOAD_SUCCESS,
         payload: data,
      });
   } catch (err) {
      dispatch({
         type: IMAGE_UPLOAD_FAILED,
         payload: err?.response?.data?.message,
      });
   }
};
export const uploadImage1 = (imageData) => async (dispatch) => {
   try {
      dispatch({ type: IMAGE_UPLOAD_REQ });
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

      if(data && data?.success) {
         window.location.reload()
      }

      dispatch({
         type: IMAGE_UPLOAD_SUCCESS,
         payload: data,
      });
   } catch (err) {
      dispatch({
         type: IMAGE_UPLOAD_FAILED,
         payload: err?.response?.data?.message,
      });
   }
};

// Update Product ---ADMIN
export const updateProduct = (id, productData) => async (dispatch) => {
   try {
      dispatch({ type: UPDATE_PRODUCT_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.put(
         `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/admin/product/${id}`,
         productData,
         config
      );

      dispatch({
         type: UPDATE_PRODUCT_SUCCESS,
         payload: data.success,
      });
   } catch (error) {
      dispatch({
         type: UPDATE_PRODUCT_FAIL,
         payload: error.response.data.message,
      });
   }
};

// Delete Product ---ADMIN
export const deleteProduct = (id) => async (dispatch) => {
   try {
      dispatch({ type: DELETE_PRODUCT_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.delete(
         `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/admin/product/${id}`,
         config
      );

      dispatch({
         type: DELETE_PRODUCT_SUCCESS,
         payload: data.success,
      });
   } catch (error) {
      dispatch({
         type: DELETE_PRODUCT_FAIL,
         payload: error.response.data.message,
      });
   }
};

// Get Product Reviews ---ADMIN
export const getAllReviews = (id) => async (dispatch) => {
   try {
      dispatch({ type: ALL_REVIEWS_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.get(
         `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/admin/reviews?id=${id}`,
         config
      );

      dispatch({
         type: ALL_REVIEWS_SUCCESS,
         payload: data.reviews,
      });
   } catch (error) {
      dispatch({
         type: ALL_REVIEWS_FAIL,
         payload: error.response.data.message,
      });
   }
};

// Delete Product Review ---ADMIN
export const deleteReview = (reviewId, productId) => async (dispatch) => {
   try {
      dispatch({ type: DELETE_REVIEW_REQUEST });
      const config = {
         headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
         },
      };
      const { data } = await axios.delete(
         `${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/admin/reviews?id=${reviewId}&productId=${productId}`,
         config
      );

      dispatch({
         type: DELETE_REVIEW_SUCCESS,
         payload: data.success,
      });
   } catch (error) {
      dispatch({
         type: DELETE_REVIEW_FAIL,
         payload: error.response.data.message,
      });
   }
};

// Clear All Errors
export const clearErrors = () => (dispatch) => {
   dispatch({ type: CLEAR_ERRORS });
};
