import Image from "next/image";
import Frame6 from "../../public/assets/Frame6.png"
import Frame7 from "../../public/assets/Frame7.png"
import Frame8 from "../../public/assets/Frame8.png"

const features = [
    {
      title: "10 mins",
      subtitle: "Average match time",
      image: Frame6,
    },
    {
      title: "Skill Matched",
      subtitle: "Not Resume Matched",
      image: Frame7,
    },
    {
      title: "Local First",
      subtitle: "Hyperlocal by default",
      image: Frame8,
    },
  ];

const AnyTask = () => {
  return (
    <section className="max-w-270 mx-auto px-4  pb-30">
      <div className='  flex justify-center '>
        <p className='font-medium  text-[30px] sm:text-[40px] md:text-5xl lg:text-6xl  text-center leading-tight'>Any Task. Any Moment. <br/> Any Skills. <span className="font-serif italic text-primary-btn">In 5 Minutes</span></p>
      
      </div>
      <div className='mt-[114px]'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((item, index) => (
        <div
          key={index}
          className=" "
        >
          {/* Background Image */}
          <Image
            src={item.image}
            alt={item.title}
            width={1000}
            height={1000}
            className=""
          />
        
        </div>
      ))}
    </div>
      </div>
    </section>
  )
}

export default AnyTask
