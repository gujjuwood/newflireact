import { useEffect, useState } from "react";
import WorkIcon from "@mui/icons-material/Work";
import StarsIcon from "@mui/icons-material/Stars";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpIcon from "@mui/icons-material/Help";
import paymentMethods from "../../../assets/images/payment-methods.svg";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

// const footerLinks = [
//   {
//     title: "about",
//     links: [
//       {
//         name: "Contact Us",
//       },
//       {
//         name: "About Us",
//       },
//       {
//         name: "Careers",
//       },
//       {
//         name: "Stories",
//       },
//       {
//         name: "Press",
//       },
//       {
//         name: "Wholesale",
//       },
//       {
//         name: "Corporate Information",
//       },
//     ]
//   },
//   {
//     title: "help",
//     links: [
//       {
//         name: "Payments",
//       },
//       {
//         name: "Shipping",
//       },
//       {
//         name: "Cancellation & Returns",
//       },
//       {
//         name: "FAQ",
//       }
//     ]
//   },
//   {
//     title: "policy",
//     links: [
//       {
//         name: "Return Policy",
//       },
//       {
//         name: "Terms Of Use",
//       },
//       {
//         name: "Security",
//       },
//       {
//         name: "Privacy",
//       },
//       {
//         name: "Sitemap",
//       },
//       {
//         name: "EPR Compliance",
//       },
//     ]
//   },
//   {
//     title: "social",
//     links: [
//       {
//         name: "Facebook",
//         redirect: "https://www.facebook.com",
//       },
//       {
//         name: "Twitter",
//         redirect: "https://twitter.com",
//       },
//       {
//         name: "YouTube",
//         redirect: "https://www.youtube.com/",
//       }
//     ]
//   }
// ]

const Footer = () => {
   const location = useLocation();
   const [adminRoute, setAdminRoute] = useState(false);

   const navigate = useNavigate();

   const [footerInfo, setFooterInfo] = useState({});

   const fetchFooterInfo = async () => {
      try {
         const config = {
            headers: {
               "Content-Type": "application/json",
               Authorization: localStorage.getItem("token"),
            },
         };

         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/footer`, config);

         if (data && data.success) {
            setFooterInfo(data.data);
         }
      } catch (err) {
         console.error(err);
         alert("something went wrong.");
      }
   };

   useEffect(() => {
      fetchFooterInfo();
   }, []);

   useEffect(() => {
      setAdminRoute(location.pathname.split("/", 2).includes("admin"));
   }, [location]);

   return (
      <>
         {!adminRoute && (
            <>
               <footer className="mt-20 w-full py-1 sm:py-4 px-4 sm:px-12 bg-primary-darkBlue text-white text-xs border-b border-gray-600 flex flex-col sm:flex-row overflow-hidden">
                  <div className="w-full sm:w-7/12 flex flex-col sm:flex-row">
                     {/* {footerLinks.map((el, i) => (
                <div className="w-full sm:w-1/5 flex flex-col gap-2 my-3 sm:my-6 ml-5" key={i}>
                  <h2 className="text-primary-grey mb-2 uppercase">{el.title}</h2>
                  {el.links.map((item, i) => (
                    <a href={item.redirect} target="_blank" rel="noreferrer" className="hover:underline" key={i}>{item.name}</a>
                  ))}

                </div>
              ))} */}
                  </div>

                  <div className="border-gray-600 h-36 w-1 border-l mr-5 mt-6 hidden sm:block"></div>
                  <div className="w-full sm:w-5/12 my-6 mx-5 sm:mx-0 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between">
                     <div className="w-full sm:w-1/2">
                        <h2 className="text-primary-grey">Contact Info:</h2>
                        <p className="mt-2 leading-5">
                           Contact No:{" "}
                           <a className="text-primary-blue" href={`tel:${footerInfo.contact_no}`}>
                              {footerInfo.contact_no}
                           </a>
                        </p>
                        <p className="mt-2 leading-5">
                           Email:{" "}
                           <a className="text-primary-blue" href={`mailto:${footerInfo.email}`}>
                              {footerInfo.email}
                           </a>
                        </p>
                     </div>

                     <div className="w-full sm:w-1/2">
                        <h2 className="text-primary-grey">Support Time:</h2>
                        <p className="mt-2 leading-5">Monday to Saturday : 09 AM to 05 PM </p>
                     </div>
                     
                     <div className="w-full sm:w-1/2">
                        <h2 className="text-primary-grey">Address:</h2>
                        <p className="mt-2 leading-5">{footerInfo.address}</p>
                     </div>

                     <div>
                        <h2 className="text-primary-grey">Policy:</h2>
                        <button
                           type="button"
                           className="underline block mt-2"
                           onClick={() => {
                              navigate("/privacy");
                           }}
                        >
                           Privacy Policy
                        </button>
                        <button
                           type="button"
                           className="underline block mt-2"
                           onClick={() => {
                              navigate("/refundAndReturn");
                           }}
                        >
                           Refund and return
                        </button>
                        <button
                           type="button"
                           className="underline block mt-2"
                           onClick={() => {
                              navigate("/shippingPolicy");
                           }}
                        >
                           Shipping policy
                        </button>
                        <button
                           type="button"
                           className="underline block mt-2"
                           onClick={() => {
                              navigate("/Security");
                           }}
                        >
                           Security
                        </button>
                     </div>
                  </div>
               </footer>
               {/* <!-- footer ends --> */}

               <div className="px-16 py-6 w-full bg-primary-darkBlue hidden sm:flex justify-between items-center text-sm text-white">
                  <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                     <span className="text-yellow-400">
                        <WorkIcon sx={{ fontSize: "20px" }} />
                     </span>{" "}
                     Sell On
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                     <span className="text-yellow-400">
                        <StarsIcon sx={{ fontSize: "20px" }} />
                     </span>{" "}
                     Advertise
                  </a>
                  <a href="#" rel="noreferrer" target="_blank" className="flex items-center gap-2">
                     <span className="text-yellow-400">
                        <CardGiftcardIcon sx={{ fontSize: "20px" }} />
                     </span>{" "}
                     Gift Cards
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                     <span className="text-yellow-400">
                        <HelpIcon sx={{ fontSize: "20px" }} />
                     </span>{" "}
                     Help Center
                  </a>

                  <span>&copy; 2007-{new Date().getFullYear()} kart.com</span>
                  <img draggable="false" src={paymentMethods} alt="Card Payment" />
               </div>
            </>
         )}
      </>
   );
};

export default Footer;
