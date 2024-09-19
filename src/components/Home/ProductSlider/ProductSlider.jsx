import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { getRandomProducts } from "../../../utils/functions";
import { settings } from "../DealSlider/DealSlider";
import Product from "./Product";

const ProductSlider = ({ title, tagline, showViewAllBtn }) => {
   const { loading, products } = useSelector((state) => state.products);

   return (
      <section className="w-full overflow-hidden">
         {/* <!-- header --> */}
         {/* <div className="flex px-6 py-4 justify-between items-center">
            <div className="title flex flex-col gap-0.5">
               <h1 className="text-xl font-medium">{title}</h1>
               <p className="text-sm text-gray-400">{tagline}</p>
            </div>
            {showViewAllBtn && (
               <Link
               to="/products"
               className="bg-primary-blue text-xs font-medium text-white px-5 py-2.5 rounded-sm shadow-lg uppercase"
               >
                  view all
               </Link>
            )}
         </div>
         <hr /> */}
         {loading ? null : (
            <div className="grid grid-cols-2 gap-1 p-1 ">
               {products &&
                  getRandomProducts(products).map((product) => <Product {...product} key={product._id} />)}
            </div>
         )}
      </section>
   );
};

export default ProductSlider;
