import { DEFAULT_ADMIN_LOGO } from "@/data/settings";

export function AdminPageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <img
        src={DEFAULT_ADMIN_LOGO}
        alt="Loading"
        className="h-16 w-auto animate-pulse opacity-70"
      />
    </div>
  );
}
