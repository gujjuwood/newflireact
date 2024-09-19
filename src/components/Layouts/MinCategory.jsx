import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";




const MinCategory = () => {
    const [hello, setHello] = useState([]);

    const fetchTextList = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/category`);
            const finalArray = data.data.map((item) => item.text);

            if (data && data?.success) {
                setHello(finalArray)
            }
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchTextList();
    }, []);
    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
            <div className="flex items-center justify-between p-0.5">
                {hello.map((el, i) => (
                    <Link to="/products" key={i} className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group">{el} <span className="text-gray-400 group-hover:text-primary-blue"><ExpandMoreIcon sx={{ fontSize: "16px" }} /></span></Link>
                ))}
            </div>
        </section>
    );
};

export default MinCategory;
