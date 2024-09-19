import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Searchbar from "./Searchbar";
import logo from "../../../assets/images/logo.png";
import PrimaryDropDownMenu from "./PrimaryDropDownMenu";
import SecondaryDropDownMenu from "./SecondaryDropDownMenu";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
   const { isAuthenticated, user } = useSelector((state) => state.user);

   const { cartItems } = useSelector((state) => state.cart);

   const [headerLogo, setHeaderLogo] = useState(logo);

   const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
   const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

   const fetchHeaderLogo = async () => {
      try {
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/logo`, {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         });

         console.log(data);

         if (data && data?.logoData?.logo) {
            setHeaderLogo(data?.logoData?.logo);
         }
      } catch (err) {
         console.error(err);
      }
   };

   useEffect(() => {
      fetchHeaderLogo();
   }, []);

   return (
      <header className="bg-primary-blue fixed top-0 py-2.5 w-full z-10">
         {/* <!-- navbar container --> */}
         <div className="  px-4 flex justify-between items-center relative">
            {/* <!-- logo & search container --> */}
            <div className="flex items-center flex-1">
               <Link className="h-10 mr-1 sm:mr-4" to="/">
                  <img draggable="false" className="h-full w-full object-contain" src={headerLogo} alt="Logo" />
               </Link>

            </div>
            {/* <!-- logo & search container --> */}

            {/* <!-- right navs --> */}
            <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-3 relative">
              
               {isAuthenticated === false ? (
                  <Link
                     to="/login"
                     className="hidden px-3 sm:px-9 py-0.5 text-primary-blue bg-white border font-medium rounded-sm cursor-pointer"
                  >
                     Login
                  </Link>
               ) : (
                  <span
                     className="userDropDown flex items-center text-white font-medium gap-1 cursor-pointer"
                     onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}
                  >
                     {user?.name && user?.name.split(" ", 1)}
                     <span>
                        {togglePrimaryDropDown ? (
                           <ExpandLessIcon sx={{ fontSize: "16px" }} />
                        ) : (
                           <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                        )}
                     </span>
                  </span>
               )}

               {togglePrimaryDropDown && (
                  <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />
               )}

               {/* <span className="moreDropDown hidden sm:flex items-center text-white font-medium gap-1 cursor-pointer" onClick={() => setToggleSecondaryDropDown(!toggleSecondaryDropDown)}>More
            <span>{toggleSecondaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
          </span> */}

               {toggleSecondaryDropDown && <SecondaryDropDownMenu />}

               <Link to="/cart" className="flex items-center text-white font-medium gap-2 relative">
                  <span>
                     <ShoppingCartIcon />
                  </span>
                  {cartItems.length > 0 && (
                     <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                        {cartItems.length}
                     </div>
                  )}
                  Cart
               </Link>
            </div>
            {/* <!-- right navs --> */}
         </div>

         <Searchbar />
         {/* <!-- navbar container --> */}
      </header>
   );
};

export default Header;
