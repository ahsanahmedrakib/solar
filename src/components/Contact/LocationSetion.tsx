export default function LocationSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top Mini-Badge Indicator */}
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-1.5 mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#4caf50] rounded-full animate-pulse" />
          <span className="text-gray-600 text-xs font-semibold tracking-wide">
            Our Location
          </span>
        </div>

        {/* Section Heading & Subtext */}
        <h2 className="text-[#011c2b] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
          Connecting you to clean energy
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mb-12 sm:mb-16">
          No matter where you are, our expert team is ready to provide reliable
          solar solutions, on-site support, and consultations to help you
          transition to sustainable energy with ease.
        </p>

        {/* Map Container Wrap */}
        <div className="relative w-full h-80 sm:h-112.5 lg:h-130 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          {/* Interactive Responsive Google Map Iframe */}
          <iframe
            title="Office Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280821213!2d-74.11976373059876!3d40.69767006346294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
            className="w-full h-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Absolute Floating Info Box - Hidden on mobile viewports for clean UI, visible sm+ */}
          <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between gap-8 z-10 max-w-70 text-left transition-all duration-200">
            <div>
              <h4 className="text-[#011c2b] text-sm font-bold">New York</h4>
              <p className="text-gray-400 text-xs mt-0.5 font-medium">
                New York, NY, USA
              </p>
            </div>

            <div className="flex gap-2">
              {/* View larger map icon link */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 hover:bg-gray-50 rounded-lg text-blue-500 transition-colors"
                aria-label="View larger map"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                  />
                </svg>
              </a>
              {/* Directions Icon link */}
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="p-1.5 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                aria-label="Get directions"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25A7.5 7.5 0 1119.5 10.5z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
