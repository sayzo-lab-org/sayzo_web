import React from 'react'
import RoleToggle from '../RoleToggle'

const HowItWorks = () => {
  return (
    <section className='max-w-7xl mx-auto px-4 lg:-mt-15'> 
        <h2 className='font-medium text-[40px] md:text-5xl lg:text-8xl text-center leading-tight'>
          How it <span className="font-serif italic">works</span>
        </h2>
        <RoleToggle/>
    </section>
  )
}

export default HowItWorks