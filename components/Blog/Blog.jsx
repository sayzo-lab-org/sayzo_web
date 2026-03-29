import BlogSlider from "./BlogSlider";

const Blog = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mt-50">
        <h1 className="text-[40px] md:text-5xl lg:text-6xl px-4 font-medium leading-[1.1]">
          Practical reads to help <br />
          you move{" "}
          <span className="font-serif italic font-normal">
            faster.
          </span>
        </h1>
      </div>

      <BlogSlider />
    </section>
  );
};

export default Blog;
