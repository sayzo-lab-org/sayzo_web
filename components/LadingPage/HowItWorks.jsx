import React from 'react'
import RoleToggle from '../RoleToggle'

const HowItWorks = () => {
  return (
    <section className='max-w-350 mx-auto pt-10 px-4 border border-red-400'>
      <div className='flex justify-center border -mb-5 border-blue-400'>
        <p className='font-medium text-[40px] md:text-5xl lg:text-6xl text-center leading-tight border border-green-400'>
          How it<span className="font-serif italic "> works</span>
        </p>
      </div>

      <div className='flex justify-center mt-8 border border-purple-400'>
        <RoleToggle />
      </div>
    </section>
  )
}

export default HowItWorks