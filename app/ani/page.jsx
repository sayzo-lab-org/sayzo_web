import One from "@/components/Animation/One"
import TheProblem3 from "@/components/Animation/TheProblem3"
import TheProblem2 from "@/components/Animation/TheProblem2"
import HelpSection3 from "@/components/HelpSection3"
import ScrollSection from "@/components/ScrollSection"
import FAQSection from "@/components/FAQSection"
import TheProblem from "@/components/TheProblem"

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
