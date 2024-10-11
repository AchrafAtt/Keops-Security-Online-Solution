import Image from 'next/image'
import React from 'react'
import Button from './Button'


function Hero() {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row">
    <div className="hero-map " />

    <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
      <Image 
        src="/kts.svg"
        alt="camp"
        width={50}
        height={50}
        className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
      />
      <h1 className="bold-52 lg:bold-88">Here you can
      Level Up Your Business</h1>
      <p className="regular-16 mt-6 text-gray-30 xl:max-w-[500px]">
      Welcome and thank you for taking your time to take a look at our solutions, wee can ensure you that wee will take your Business to the next level, so hang in tight and lets Level UP!
      </p>

      <div className="my-11 flex flex-wrap gap-5">
        <div className="flex items-center gap-2">
          {Array(5).fill(1).map((_, index) => (
            <Image 
              src="/star.svg"
              key={index}
              alt="star"
              width={24}
              height={24}
            />
          ))}
        </div>

        <p className="bold-16 lg:bold-20 text-blue-70">
          1k
          <span className="regular-16 lg:regular-20 ml-1">Excellent Reviews</span>
        </p>
      </div>

      <div className="flex flex-col w-full gap-3 sm:flex-row">
        <Button 
          type="button" 
          title="App Coming Soon ⚙️" 
          variant="btn_blue" 
        />
      
      </div>
    </div>

    <div className="relative flex flex-1 items-start">
      <div className="relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8">

         <div className="flex flex-col">
          <div className="flexBetween">
            <p className="regular-16 text-gray-20">Location</p>
            <Image src="/close.svg" alt="close" width={24} height={24} />
          </div>
          <p className="bold-20 text-white">Maroc,Marrakech</p>
        </div>

        <div className="flexBetween">
          <div className="flex flex-col">
            <p className="regular-16 block text-gray-20">Services</p>
            <p className="bold-20 text-white">+15</p>
          </div>
          <div className="flex flex-col">
            <p className="regular-16 block text-gray-20">Clients</p>
            <p className="bold-20 text-white">+ 1780</p>
          </div>
        </div>
      </div>
    </div>
  </section>
)
}

export default Hero