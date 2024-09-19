import { getDiscount } from "../../../utils/functions";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../../actions/wishlistAction";
import { useSnackbar } from "notistack";
import { addItemsToCart } from "../../../actions/cartAction";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FlashOnIcon from "@mui/icons-material/FlashOn";

import Assured from "../../../assets/images/Assured.png";

const Product = (props) => {
   const navigate = useNavigate();

   const { cartItems } = useSelector((state) => state.cart);

   const { _id, name, images, ratings, numOfReviews, price, cuttedPrice } = props;

   const itemInCart = cartItems.some((i) => i.product === _id);

   const dispatch = useDispatch();
   const { enqueueSnackbar } = useSnackbar();

   const { wishlistItems } = useSelector((state) => state.wishlist);

   const itemInWishlist = wishlistItems.some((i) => i.product === _id);

   const addToWishlistHandler = () => {
      if (itemInWishlist) {
         dispatch(removeFromWishlist(_id));
         enqueueSnackbar("Remove From Wishlist", { variant: "success" });
      } else {
         dispatch(addToWishlist(_id));
         enqueueSnackbar("Added To Wishlist", { variant: "success" });
      }
   };

   const addToCartHandler = () => {
      dispatch(addItemsToCart(_id));
      enqueueSnackbar("Product Added To Cart", { variant: "success" });
   };

   const buyNow = () => {
      addToCartHandler();
      navigate("/shipping");
   };

   // <?xml version="1.0" encoding="UTF-8"?>
   const goToCart = () => {
      navigate("/cart");
   };

   return (
      // <div className="flex flex-col items-center gap-2 px-2 py-6 relative w-full border-2 border-green-500 ">
      <div className="flex flex-col items-center gap-2 px-2 py-6 relative w-full bg-white ">
         {/* <!-- image & product title --> */}
         <Link to={`/product/${_id}`} className="flex flex-col items-center text-center group">
            <div className="w-44 h-44">
               <img draggable="false" className="w-full h-full object-contain" src={images[0].url} alt={name} />
            </div>
            <h2 className="text-sm mt-4 group-hover:text-primary-blue">
               {name.length > 50 ? `${name.substring(0, 50)}...` : name}
            </h2>
         </Link>
         {/* <!-- image & product title --> */}

         {/* <!-- product description --> */}
         <div className="flex flex-col gap-2 items-center">
            {/* <!-- rating badge --> */}
            <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
               <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">
                  {ratings.toFixed(1)} <StarIcon sx={{ fontSize: "14px" }} />
               </span>
               <span>({numOfReviews.toLocaleString()})</span>
               <span> <img draggable="false" className="h-full w-14 object-contain" src={Assured} alt="LogoAssured" /></span>
            </span>
            {/* <!-- rating badge --> */}

            {/* <!-- price container --> */}
            <div className="flex items-center gap-1.5 text-md font-medium">
               <span>₹{price.toLocaleString()}</span>
               <span className="text-gray-500 line-through text-xs">₹{cuttedPrice.toLocaleString()}</span>
               <span className="text-xs text-primary-green">{getDiscount(price, cuttedPrice)}%&nbsp;off</span>
            </div>
            {/* <!-- price container --> */}
         </div>
         {/* <!-- product description --> */}

         {/* <!-- wishlist badge --> */}
         <span
            onClick={addToWishlistHandler}
            className={`${
               itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"
            } absolute top-5 right-2 cursor-pointer`}
         >
            <FavoriteIcon sx={{ fontSize: "16px" }} />
         </span>
         {/* <span className=" absolute top-5 left-2 cursor-pointer">
            <img draggable="false" className="h-full w-14 object-contain" src={sale} alt="Logo" />
         </span> */}
         {/* <!-- wishlist badge --> */}
         {/* <div className="w-full grid mt-auto grid-cols-1 gap-1">
        {props.stock > 0 && (
          <button
            onClick={itemInCart ? goToCart : addToCartHandler}
            className="p-1 text-sm w-full flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg	"
          >
            <ShoppingCartIcon />
            {itemInCart ? "GO TO CART" : "ADD TO CART"}
          </button>
        )}
        <button
          onClick={buyNow}
          disabled={props.stock < 1 ? true : false}
          className={
            props.stock < 1
              ? "p-1 text-sm w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg"
              : "p-1 text-sm w-full flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"
          }
        >
          <FlashOnIcon />
          {props.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
        </button>
      </div> */}
      </div>
   );
};

export default Product;
