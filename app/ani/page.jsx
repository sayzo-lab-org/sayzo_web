import One from "@/components/Animation/One"
import TheProblem3 from "@/components/Animation/TheProblem3"
import TheProblem2 from "@/components/Animation/TheProblem2"
import HelpSection3 from "@/components/HelpSection3"
import ScrollSection from "@/components/ScrollSection"
import FAQSection from "@/components/FAQSection"
import TheProblem from "@/components/TheProblem"

export const metadata = {
  title: "How SAYZO Solves Your Local Help Problems | See It in Action",
  description: "Struggling to find reliable help nearby? Watch how SAYZO solves common problems and connects you with trusted helpers in your neighborhood.",
  openGraph: {
    title: "How SAYZO Solves Local Help Problems",
    description: "See how SAYZO connects you with trusted helpers in your neighborhood.",
    url: "https://sayzo.in/ani",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "How SAYZO Works",
    description: "See how SAYZO solves your local help problems.",
  },
};

const page = () => {
  return (
    <div>
      {/* <One/> */}
       <TheProblem2/>
      {/* <ScrollSection/>  */}
      <HelpSection3/>
      <TheProblem3/>
      <div className="border-white border"/>
      <TheProblem/>
      <FAQSection/>
    </div>
  )
}

export default page
