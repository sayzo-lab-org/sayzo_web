import CommunityFirst from '@/components/CommunityFirst'
import AnyTask from '@/components/LandingPage/AnyTask'
import BuildForWork from '@/components/LandingPage/BuildForWork'
import HeroSection1 from '@/components/LandingPage/HeroSection1'
import HowItWorks from '@/components/LandingPage/HowItWorks'
import React from 'react'

export const metadata = {
  title: "Get Any Task Done Locally | SAYZO - Your Neighborhood Task Marketplace",
  description: "Need help with chores, errands, or projects? SAYZO connects you with trusted local helpers. Post tasks in seconds, get help today.",
  openGraph: {
    title: "Get Any Task Done Locally | SAYZO",
    description: "Connect with trusted local helpers for any task. Post in seconds, get help today.",
    url: "https://sayzo.in/landing",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Any Task Done Locally",
    description: "SAYZO connects you with trusted local helpers for any task.",
  },
};

const page = () => {
  return (
    <div>
      <HeroSection1/>
      <BuildForWork/>
      <AnyTask/>
      <div className='max-w-350 mx-auto pb-30 px-4 '>
      <CommunityFirst/>
      <HowItWorks/>
      </div>
      
    </div>
  )
}

export default page
