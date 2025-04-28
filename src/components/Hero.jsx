import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 

const Hero = () => {
  const {banner} = useContext(ShopContext);
  return (
<div className='flex flex-col sm:flex-row border border-gray-400'>
  {/* Left Section */}
  <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
    <div className='text-[#414141] px-4 sm:px-8'>
      <div className='flex items-center gap-2'>
        <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
        <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
      </div>
      <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
      <div className='flex items-center gap-2'>
        <p className='font-semibold text-sm md:text-base'>SHOP Now</p>
        <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
      </div>
    </div>
  </div>

  {/* Right Section with Carousel */}
  <div className='w-full sm:w-1/2 h-[350px] sm:h-auto'>
    <div className="h-full">
      {banner?.length > 0 ? (
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          showArrows={false}
          className="h-full"
        >
          {banner.map((item, index) => (
            <div key={index} className="h-full">
              <img
                src={item?.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <img
          src={assets.hero_img}
          alt="Default Banner"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  </div>
</div>

  
  )
}

export default Hero