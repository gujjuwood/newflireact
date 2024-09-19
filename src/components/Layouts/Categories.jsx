import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";


import mobiles from "../../assets/images/Categories/phone.png";
import fashion from "../../assets/images/Categories/fashion.png";
import electronics from "../../assets/images/Categories/electronics.png";
import home from "../../assets/images/Categories/home.png";
import travel from "../../assets/images/Categories/travel.png";
import appliances from "../../assets/images/Categories/appliances.png";
import furniture from "../../assets/images/Categories/furniture.png";
import beauty from "../../assets/images/Categories/beauty.png";
import grocery from "../../assets/images/Categories/grocery.png";
import sports from "../../assets/images/Categories/sports.png";
import books from "../../assets/images/Categories/books.jpg";
import toys from "../../assets/images/Categories/toy.jpg";
import pets from "../../assets/images/Categories/pets.jpeg";
import health from "../../assets/images/Categories/health.jpeg";
import stationery from "../../assets/images/Categories/stationery.jpeg";

// const catNav = [
//   {
//     name: "Mobiles",
//     icon: mobiles,
//   },
//   {
//     name: "Fashion",
//     icon: fashion,
//   },
//   {
//     name: "Electronics",
//     icon: electronics,
//   },
//   {
//     name: "Home",
//     icon: home,
//   },
//   {
//     name: "Travel",
//     icon: travel,
//   },
//   {
//     name: "Appliances",
//     icon: appliances,
//   },
//   {
//     name: "Furniture",
//     icon: furniture,
//   },
//   {
//     name: "Beauty",
//     icon: beauty,
//   },
//   {
//     name: "Grocery",
//     icon: grocery,
//   },
// ];

const catNav = [
  {
    name: "Mobiles",
    icon: mobiles,
  },
  {
    name: "Fashion",
    icon: fashion,
  },
  {
    name: "Electronics",
    icon: electronics,
  },
  {
    name: "Home",
    icon: home,
  },
  {
    name: "Travel",
    icon: travel,
  },
  {
    name: "Appliances",
    icon: appliances,
  },
  {
    name: "Furniture",
    icon: furniture,
  },
  {
    name: "Beauty",
    icon: beauty,
  },
  {
    name: "Grocery",
    icon: grocery,
  },
  {
    name: "Sports",
    icon: sports,
  },
  {
    name: "Books",
    icon: books,
  },
  {
    name: "Toys",
    icon: toys,
  },
  {
    name: "Health",
    icon: health,
  },
  {
    name: "Pets",
    icon: pets,
  },
  {
    name: "Stationery",
    icon: stationery,
  },
];





const Categories = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4, // Change this from 1 to 3
          slidesToScroll: 4, // Change this from 1 to 3
        },
      },
    ],
  };
  const [hello, setHello] = useState([]);

  const fetchTextList = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/v1/category`);
      const finalArray = data.data.map((item) => ({
        text: item.text,
        image: item.image
      }));
  
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
    <section className="block bg-white mt-28 mb-4 min-w-full mm:px-0 sm:px-12 py-1 shadow overflow-hidden flex flex-col justify-center">
      <Slider {...settings}>
        {hello.map((item, i) => (
          <div
            className="flex flex-col items-center justify-center p-2 group"
            key={i}
          >
            <div className="flex flex-col justify-center items-center ">
              <Link to={`/products?category=${item.text}`}>
                <div className="flex flex-col justify-center items-center">
                  <div className="h-16 w-16">
                    <img
                      draggable="false"
                      className="h-full w-full object-contain rounded-full"
                      src={item.image}
                      alt={item.text}
                    />
                  </div>
                  <span className="text-sm text-gray-800 font-medium group-hover:text-primary-blue">
                    {item.text}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Categories;
