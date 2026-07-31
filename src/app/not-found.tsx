import NotFound from "@/components/NotFound";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you are looking for does not exist or may have been moved.",
};

const notfound = () => {
  return (
    <div>
      <NotFound />
    </div>
  );
};

export default notfound;
