import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Searchbar = () => {
 
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => { 
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }

    return (
        <form onSubmit={handleSubmit} className="px-1 sm:px-4 py-1.5 flex justify-between items-center rounded-sm overflow-hidden bg-white m-3 mb-0">
            <input value={keyword} onChange={(e) => setKeyword(e.target.value)} className="text-sm flex-1 outline-none border-none placeholder-gray-500 text-black bg-transparent"  type="text" placeholder="Search" />
            <button type="submit" className="text-black"><SearchIcon /></button>
        </form>
    );
};

export default Searchbar;
