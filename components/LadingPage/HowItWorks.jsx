import React from 'react'
import RoleToggle from '../RoleToggle'

const HowItWorks = () => {
  return (
    // Removed pb-15 (bottom padding) and adjusted max-width
    // Use max-w-7xl or similar for a standard container size
    <section className='max-w-7xl mx-auto py-10 px-4 -mt-25'> 
      <div className='flex justify-center'>
        <h2 className='font-medium text-[40px] md:text-5xl lg:text-6xl text-center leading-tight'>
          How it <span className="font-serif italic">works</span>
        </h2>
      </div>
      <div className='flex justify-center mt-2'> {/* Reduced mt-8 to mt-6 */}
        <RoleToggle/>
      </div>
    </section>
  )
}

export default HowItWorks