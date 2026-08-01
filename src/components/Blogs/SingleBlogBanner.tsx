import PageBanner from "@/components/Common/PageBanner";
import Reveal from "@/components/Common/Reveal";

interface SingleBlogBannerProps {
  title: string;
  date: string;
  category: string;
}

const SingleBlogBanner = ({ title, date, category }: SingleBlogBannerProps) => {
  return (
    <div>
      <PageBanner title={title} crumb={title} />
      {(date || category) && (
        <div className="bg-forest-700">
          <div className="solar-container">
            <Reveal variant="fade-up" delay={200} duration={800}>
              <div className="flex flex-wrap items-center justify-center gap-4 py-5 text-xs sm:text-sm text-white/75 font-medium">
                {date && (
                  <div className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-accent-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                    <time dateTime={date}>{date}</time>
                  </div>
                )}
                {date && category && (
                  <span className="hidden sm:inline text-accent-500">•</span>
                )}
                {category && (
                  <div className="flex items-center gap-1.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-accent-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 6h.008v.008H6V6Z"
                      />
                    </svg>
                    <span>{category}</span>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleBlogBanner;

