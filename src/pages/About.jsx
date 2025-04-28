import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'}/>
        <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm'>
            <p>At Forever, we believe that fashion is more than just clothing—it's a way of expressing who you are and what you stand for. Our collection is designed with the modern individual in mind, offering timeless styles that seamlessly blend comfort, quality, and trend. Whether you're dressing up for a special occasion or finding the perfect piece for everyday wear, Forever brings you versatile options that speak to your unique sense of style.</p>
            <p>Sustainability is at the heart of everything we do at Forever. We're committed to reducing our environmental impact by prioritizing eco-friendly practices and materials in our designs. From ethically sourced fabrics to conscious production methods, we strive to create a more sustainable future while offering you the fashion you love. Our mission is simple: to provide clothing that not only looks good but also feels good, knowing you're making a responsible choice for the planet. Join us at Forever, where timeless style meets sustainability.</p>
            <b className='text-gray-800'>Our Mission</b>
            <p>our mission of forever is to empower customers with choice,convenience,and confidence. we 're dedicated to providing a samless shopping experience that exceeds expectations,from browsing and ordering to delivery and beyond.</p>
          </div>
        </div>
        <div className='text-4xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'}/>
        </div>
        <div className='flex flex-col md:flex-row text-sm mb-20'>
           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Quality Assurance</b>
             <p className='text-gray-600'>We meticulously select and vet each product to ensure it meets our stringent quality standards, providing you with clothing that is not only stylish but also durable, comfortable, and ethically sourced.</p>
           </div>

           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Convenience</b>
             <p className='text-gray-600'>With our user-friendly interface and hassle-free ordering process, shopping becomes a seamless and enjoyable experience, allowing you to find and purchase your favorite styles with ease and confidence..</p>
           </div>

           <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
             <b>Exceptional Customer Service:</b>
             <p className='text-gray-600'>Our team of dedicated professionals is here to assist you every step of the way, ensuring that your shopping experience is smooth, enjoyable, and that all your needs are met with the highest level of care and attention.</p>
           </div>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About