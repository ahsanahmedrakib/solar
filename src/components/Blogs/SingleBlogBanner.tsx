interface SingleBlogBannerProps {
  title: string;
  date: string;
  category: string;
}

const SingleBlogBanner = ({ title, date, category }: SingleBlogBannerProps) => {
  return (
    <div>
      <div
        className="relative h-80 sm:h-100 md:h-120 bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: "url('/images/common/page-header-bg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[#021622]/75 backdrop-blur-[1px]" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6 max-w-3xl">
            {title}
          </h1>

          {(date || category) && (
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-gray-300 font-medium">
              {date && (
                <div className="flex items-center gap-1.5">
                  <span>📅</span>
                  <time dateTime={date}>{date}</time>
                </div>
              )}
              {date && category && <span className="hidden sm:inline text-gray-500">•</span>}
              {category && (
                <div className="flex items-center gap-1.5">
                  <span>🏷️</span>
                  <span>{category}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlogBanner;
