import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { getRandomProducts } from '../../../utils/functions';
import { settings } from '../DealSlider/DealSlider';
import Product from './Product'; 

const ProductSlider = ({ title, tagline }) => { 
 
    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            
            <hr />
            {loading ? null :
                <div className="grid grid-cols-2 gap-1 p-1">
                    {products && getRandomProducts(products, 12).map((product) => (
                        <Product {...product} key={product._id} />
                    ))}
                </div>
            }

        </section>
    );
};

export default ProductSlider;
