import { DEFAULT_LOGO } from "@/data/settings";
import Image from "next/image";

export function MainSitePageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Image
        src={DEFAULT_LOGO}
        alt="Loading"
        width={0}
        height={0}
        sizes="100vw"
        className="h-16 w-auto animate-pulse opacity-70"
        priority
      />
    </div>
  );
}
