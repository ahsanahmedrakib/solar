import AdminNotFound from "../../components/Admin/AdminNotFound";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The admin page you are looking for does not exist.",
};

const adminnotfound = () => {
  return (
    <div>
      <AdminNotFound />
    </div>
  );
};

export default adminnotfound;
