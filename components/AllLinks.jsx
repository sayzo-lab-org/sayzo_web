"use client";

import { Facebook, Linkedin, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WaitlistModal from "./JoinWaitList/WaitlistModal";
import { useState } from "react";

const AllLinks = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="px-4 sm:px-6">
      <footer className="max-w-350 mx-auto my-10 rounded-3xl bg-black px-6 md:px-10 py-10 md:py-12 text-white">
        {/* TOP LINKS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full">
          {/* Trust & Legal */}
          <ul className="space-y-3 text-base sm:mt-0 md:text-xl text-white">
            <li className="text-gray-400 text-base md:text-2xl" >
              Trust & Legal 
            </li>
            <li onClick={() => router.push("/policies?tab=terms-and-condition")} className="cursor-pointer hover:text-primary-btn text-sm">Terms and Condition</li>
            <li onClick={() => router.push("/policies?tab=privacy-policy")}  className="cursor-pointer hover:text-primary-btn text-sm">Privacy Policy</li>
            <li
              onClick={() => router.push("/policies?tab=usermanual")}
              className="cursor-pointer hover:text-primary-btn text-sm"
            >
              User Manual
            </li>
            <li onClick={() => router.push("/policies?tab=Trust-&-Safety")}  className="cursor-pointer hover:text-primary-btn text-sm">Safety & Trust</li>
            <li onClick={() => router.push("/policies?tab=REFUND-&-CANCELLATION")} className="cursor-pointer hover:text-primary-btn text-sm">Refund & Cancellation Policy</li>
            <li onClick={() => router.push("/policies?tab=PROHIBITED-TASKS-&-BLACKLIST-CATEGORIES")} className="cursor-pointer hover:text-primary-btn text-sm">Blacklist Category</li>
          </ul>

          {/* Company & Brand */}
          <ul className="space-y-3 text-base md:text-xl text-white">
            <li className="text-gray-400 text-base md:text-2xl">
              Company & Brand
            </li>
            {/* <li className="cursor-pointer hover:text-primary-btn text-sm">About SAYZO</li> */}
            <li onClick={() => router.push("/careers")} className="cursor-pointer hover:text-primary-btn text-sm">Careers</li>
            <li onClick={() => router.push("/blog")} className="cursor-pointer hover:text-primary-btn text-sm">Blog</li>
            <li onClick={() => router.push("/contact")} className="cursor-pointer hover:text-primary-btn text-sm">Contact Us</li>
          </ul>

          {/* Support & Resources */}
          <ul className="space-y-3 text-lg md:text-xl text-white">
            <li className="text-gray-400 text-base md:text-2xl">
              Support & Resources
            </li>
            <li onClick={() => router.push("/policies?tab=faq")} className="cursor-pointer hover:text-primary-btn text-sm">FAQs</li>
            <li onClick={() =>
    router.push(
      "/policies?tab=Trust-&-Safety&section=task-giver-guidelines"
    )
  } className="cursor-pointer hover:text-primary-btn text-sm">Become a Task Giver</li>
            <li onClick={() => router.push("/policies?tab=PROHIBITED-Trust-&-Safety")} className="cursor-pointer hover:text-primary-btn text-sm">Become a Task Doer</li>
            <li onClick={() => router.push("/policies?tab=PROHIBITED-Trust-&-Safety")} className="cursor-pointer hover:text-primary-btn text-sm">Trust Safety & How it Works</li>
          </ul>

          {/* App & Social */}
          <ul className="space-y-3 text-lg md:text-xl text-white">
            <li className="text-gray-400 text-base md:text-2xl">
              Join the Revolution
            </li>
            <Link href="https://chat.whatsapp.com/LWT16zuqwdxDbBdAxGbLce" target="black"><li className="cursor-pointer hover:text-primary-btn text-sm mb-2">Whatsapp Community</li></Link>
            <Link href=""><li className="cursor-pointer hover:text-primary-btn text-sm mb-2" onClick={() => setIsModalOpen(true)} >Join Waitlist</li></Link>
            <Link href="https://chat.whatsapp.com/HEAgmwsxdJC02GqtW7T63j" target="black"><li className="cursor-pointer hover:text-primary-btn text-sm">Early Access (Beta)</li></Link> 
          </ul>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-gray-800" />

        {/* BOTTOM */}
        <div className="flex flex-col sm:gap-10 gap-5 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Follow Us */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <p className="text-sm md:text-xl">Follow us</p>

              <div className="flex gap-5 text-gray-300">
                <Facebook className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:text-white" />
               <Link href="https://www.linkedin.com/company/sayzoindia/" target="blank" ><Linkedin className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:text-white" /></Link> 
               <Link href="https://x.com/Sayzoindia" target="black"> <Twitter className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:text-white" /></Link>
               <Link href="https://www.instagram.com/sayzoindia/" target="blank"><Instagram className="h-6 w-6 md:h-7 md:w-7 cursor-pointer hover:text-white" /></Link> 
              </div>
            </div>

            {/* Made with love */}
            <p className=" md:text-xl flex items-center gap-2 text-sm">
              Made with
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-7 h-7 text-green-500"
              >
                <path
                  fill="currentColor"
                  d="M20.205 4.791a5.94 5.94 0 0 0-4.209-1.754A5.9 5.9 0 0 0 12 4.595a5.9 5.9 0 0 0-3.996-1.558a5.94 5.94 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412L12 21.414l8.207-8.207c2.354-2.353 2.355-6.049-.002-8.416"
                />
              </svg>
              for you
            </p>
          </div>

          {/* RIGHT */}
          <div className="space-y-6 text-center md:text-right">
            {/* Mobile App */}
            <div className="flex  md:justify-end items-center gap-3 text-lg md:text-xl">
              <span className="cursor-pointer hover:text-primary-btn text-sm">Mobile App</span>

              {/* Apple */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8"
              >
                <path
                  fill="currentColor"
                  d="M17.05 20.28c-.98.95-2.05.8-3.08.35c-1.09-.46-2.09-.48-3.24 0c-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8c1.18-.24 2.31-.93 3.57-.84c1.51.12 2.65.72 3.4 1.8c-3.12 1.87-2.38 5.98.48 7.13c-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25c.29 2.58-2.34 4.5-3.74 4.25"
                />
              </svg>

              {/* Android */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-8 h-8 "
              >
                <path
                  fill="currentColor"
                  d="M11.115 4.667a.846.846 0 1 1-1.692 0a.846.846 0 0 1 1.692 0m2.539.846a.846.846 0 1 0 0-1.692a.846.846 0 0 0 0 1.692"
                />
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.354.47a.75.75 0 0 1 1.061 0l1.228 1.227a6.26 6.26 0 0 1 3.215-.883h.207c1.175 0 2.274.322 3.215.883L16.508.47a.75.75 0 0 1 1.06 1.06l-1.091 1.092a6.27 6.27 0 0 1 1.853 3.943q.323-.108.683-.11a2.16 2.16 0 0 1 2.16 2.16v5.077a2.16 2.16 0 0 1-2.82 2.058v1.865c0 .913-.445 1.721-1.129 2.222v1.47a2.442 2.442 0 1 1-4.884 0v-.942h-.757v.943a2.442 2.442 0 1 1-4.884 0v-1.471a2.75 2.75 0 0 1-1.128-2.222V15.75a2.16 2.16 0 0 1-2.82-2.058V8.615a2.16 2.16 0 0 1 2.842-2.05a6.27 6.27 0 0 1 1.853-3.943L6.354 1.53a.75.75 0 0 1 0-1.06m.965 7.485a.25.25 0 0 0-.248.25v9.41a1.25 1.25 0 0 0 1.245 1.25h7.291a1.25 1.25 0 0 0 1.245-1.25v-9.41a.25.25 0 0 0-.248-.25zm9.287-1.5h.203a4.79 4.79 0 0 0-4.744-4.14h-.207a4.79 4.79 0 0 0-4.744 4.14zM13.84 21.308v-.943h1.884v.943a.942.942 0 1 1-1.884 0m-5.526-.943h1.769v.943a.942.942 0 1 1-1.884 0v-.943zm10.699-6.012a.66.66 0 0 1-.66-.658V8.612a.66.66 0 0 1 1.32.003v5.077a.66.66 0 0 1-.66.66M5.57 8.61a.66.66 0 0 0-1.32.004v5.077a.66.66 0 0 0 1.32.005z"
                />
              </svg>
            </div>

            {/* Policies */}
            <div className="flex flex-wrap  md:justify-end gap-6 text-lg md:text-xl">
            <ul className="list-none flex gap-4">
  <li
    onClick={() => router.push("/policies?tab=terms-and-condition")}
    className="cursor-pointer hover:text-primary-btn text-sm"
  >
    Terms of Service
  </li>

  <li
    onClick={() => router.push("/policies?tab=privacy-policy")}
    className="cursor-pointer hover:text-primary-btn text-sm"
  >
    Privacy Policy
  </li>
</ul>
             
            </div>
          </div>
        </div>
      </footer>
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AllLinks;
