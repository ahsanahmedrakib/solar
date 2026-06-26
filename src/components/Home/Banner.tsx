const Banner = () => {
  return (
    <div
      className="w-full bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/home/intro-video-image.jpg')",
        minHeight: "900px",
      }}
    >
      <div className="h-full flex items-end p-3">{/* Content */}</div>
    </div>
  );
};

export default Banner;
