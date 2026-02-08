import React from 'react'
import RoleToggle from '../RoleToggle'

const HowItWorks = () => {
  return (
    <section className='max-w-350 mx-auto pb-15 px-4 '>
      <div className='  flex justify-center '>
        <p className='font-medium text-[40px] md:text-5xl lg:text-6xl  text-center leading-tight'>How it<span className="font-serif italic "> works</span></p>
      
      </div>
      <div className='flex justify-center mt-8'>
        <RoleToggle/>
      </div>
    </section>
  )
}

export default HowItWorks
