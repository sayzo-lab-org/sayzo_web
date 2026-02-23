import Blog from '@/components/Blog/Blog'

export const metadata = {
  title: "SAYZO Blog | Tips, Stories & Insights on Local Services",
  description: "Read expert tips on hiring local help, success stories from real users, and insights on building your neighborhood network. Learn how to get more done.",
  openGraph: {
    title: "SAYZO Blog | Tips & Insights on Local Services",
    description: "Expert tips on hiring local help, success stories, and insights on building your neighborhood network.",
    url: "https://sayzo.in/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAYZO Blog",
    description: "Tips, stories & insights on getting tasks done with local help.",
  },
};

const page = () => {
  return (
    <div>
      <Blog/>
    </div>
  )
}

export default page
