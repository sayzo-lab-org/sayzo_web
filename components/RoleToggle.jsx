'use client';

import { useState } from 'react';
import Image from 'next/image';

// Local images (DOER)
import Group1 from '../public/assets/Group1.png';
import Group2 from '../public/assets/Group2.png';
import Group3 from '../public/assets/Group3.png';
import Group4 from '../public/assets/Group4.png';
import Group5 from '../public/assets/Group5.png';
import Group6 from '../public/assets/Group6.png';

const USER_ROLE = {
 
  GIVER: 'GIVER',
  DOER: 'DOER',
};

const FEATURES = {
  GIVER: [
    {
      image: Group4,
      title: 'Get tasks near you',
    },
    {
      image: Group5,
      title: 'Accept what fits you',
    },
    {
      image: Group6,
      title: 'Finish & get paid',
    },
  ],
  DOER: [
    {
      image: Group1,
      title: 'Post your task',
    },
    {
      image: Group2,
      title: 'Get matched',
    },
    {
      image: Group3,
      title: 'Task gets done',
    },
  ],
};

const RoleToggle = () => {
  const [activeRole, setActiveRole] = useState(USER_ROLE.DOER);

  return (
    <div className="flex flex-col items-center gap-12">
      {/* Toggle */}
      <div className="relative inline-flex bg-[#F4F5F7] p-1 rounded-full select-none mb-20">
        <div
          className={`absolute top-1 bottom-1 bg-black rounded-full transition-all duration-300 ${
            activeRole === USER_ROLE.DOER
              ? 'left-1 w-[160px]'
              : 'left-[164px] w-[160px]'
          }`}
        />

        <button
          onClick={() => setActiveRole(USER_ROLE.DOER)}
          className={`relative z-10 w-[160px] py-3 text-sm font-medium rounded-full ${
            activeRole === USER_ROLE.DOER ? 'text-white' : 'text-black'
          }`}
        >
          For Task Giver
        </button>

        <button
          onClick={() => setActiveRole(USER_ROLE.GIVER)}
          className={`relative z-10 w-[160px] py-3 text-sm font-medium rounded-full ${
            activeRole === USER_ROLE.GIVER ? 'text-white' : 'text-black'
          }`}
        >
          For Task Doer
        </button>
      </div>

      {/* 3 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {FEATURES[activeRole].map((item, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="w-full">
              <Image
                src={item.image}
                alt={item.title}
                width={1000}
                height={600}
                className="w-full h-[220px] object-cover rounded-xl"
              />
            </div>

            <p className="mt-5 text-2xl font-medium">
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoleToggle;
