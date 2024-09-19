import React, { useState, useEffect } from "react";

const Timer = () => {
   const [time, setTime] = useState(300); // 300 seconds = 5 minutes

   useEffect(() => {
      // Decrease the time every second
      const interval = setInterval(() => {
         setTime((prevTime) => {
            if (prevTime === 1) {
               clearInterval(interval);
               return 300; // Reset to 5 minutes
            }
            return prevTime - 1;
         });
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
   }, [time]); // Depend on time to recall the timer

   // Convert time to minutes and seconds
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

   return (
      <div className="flex items-center gap-2 justify-center">
         <h1 className="flex justify-center text-xl">Hurry!! Offer Ends In</h1>
         <div className="flex justify-center items-center">
            {/* <div className="flex text-red-500 text-2xl border-2 border-red-500 rounded-md px-5">
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div> */}
            <div data-testid="offer-wrapper" className="inline-flex items-center whitespace-nowrap [font-variant-numeric:tabular-nums] bg-[#FFE8CD] rounded h-5 px-2 border border-[#FF6637]">
               <img
                  alt="Offer clock icon"
                  loading="lazy"
                  width="16"
                  height="16"
                  decoding="async"
                  data-nimg="1"
                  style={{ color: 'transparent', marginRight: '4px' }}
                  src="https://images.meesho.com/images/offer-widget-group-icon/Q1ROM/xcf3x.png"
               />
               <span
                  fontSize="13px"
                  fontWeight="demi"
                  data-testid="offer-timer-text"
                  className="text-[#ff6637] not-italic font-semibold text-[13px] leading-[16px] [font-family:'Mier demi'] m-0 p-0"
                  color="pinkBase"
               >
                  00h : {minutes}m : {seconds}s
               </span>
            </div>
         </div>
      </div>
   );
};

export default Timer;
