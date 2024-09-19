
const PriceSidebar = ({ cartItems }) => {
    console.log("🚀 ~ PriceSidebar ~ cartItems:", cartItems)

    // function calculateTotal(arr) {
    //     if (arr.length >= 3) {
    //         const total = arr.reduce((acc, val) => acc + val, 0);
    //         const minVal = Math.min(...arr);
    //         return total - minVal;
    //     } else {
    //         return arr.reduce((acc, val) => acc + val, 0);
    //     }
    // }

    // function calculateTotal(products) {
    //     if (products.length >= 3) { 

    //         const total = products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    //         const minPrice = Math.min(...products.map((product) => (product.price * product.quantity)));


    //         return total - minPrice;
    //     } else {
    //         return products.reduce((acc, product) => acc + (product.price * product.quantity), 0);
    //     }
    // }


    function calculateTotal(prices) {

        let roundedNumber = Math.floor(prices.length / 3); 
        const array = []
        for (let i = 0; i < prices.length; i++) {
            const element = prices[i];
            array.push(element.price * element.quantity)

        }
        let sortedPrices = array.slice().sort((a, b) => a - b);
        let pricesWithoutMin = sortedPrices.slice(roundedNumber);

        let total = pricesWithoutMin.reduce((acc, price) => acc + price, 0);
      
        return total;

    }

    function Discount(cartItems) {
        return cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()
    }
    function Price(cartItems) {
        return cartItems.reduce((sum, item) => sum + (item.cuttedPrice * item.quantity), 0).toLocaleString()
    }


    return (
        <div className="flex sticky top-16 sm:h-screen flex-col sm:w-4/12 sm:px-1">

            {/* <!-- nav tiles --> */}
            <div className="flex flex-col bg-white rounded-sm shadow">
                <h1 className="px-6 py-3 border-b font-medium text-gray-500">PRICE DETAILS</h1>

                <div className="flex flex-col gap-4 p-6 pb-3">
                    <p className="flex justify-between">Price ({cartItems.length} item) <span>₹{Price(cartItems)}</span></p>
                    <p className="flex justify-between">Discount <span className="text-primary-green">- ₹{Discount(cartItems)}</span></p>
                    <p className="flex justify-between">Delivery Charges <span className="text-primary-green">FREE</span></p>

                    <div className="border border-dashed"></div>
                    <p className="flex justify-between text-lg font-medium">Total Amount
                        {/* <span>₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span> */}
                        <span>
                            {/* ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()} */}
                            {
                                calculateTotal(cartItems)
                            }
                        </span>

                    </p>
                    <div className="border border-dashed"></div>

                    <p className="font-medium text-primary-green">You will save ₹{cartItems.reduce((sum, item) => sum + ((item.cuttedPrice * item.quantity) - (item.price * item.quantity)), 0).toLocaleString()} on this order</p>

                </div>

            </div>
            {/* <!-- nav tiles --> */}

        </div>
    );
};

export default PriceSidebar;
