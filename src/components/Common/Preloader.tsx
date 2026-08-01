"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

/**
 * Full-screen brand preloader shown on first mount.
 * Renders in the initial HTML (covers first paint) and fades out
 * once the window has finished loading.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const MIN_DISPLAY = 700;
    const start = Date.now();

    const finish = () => {
      const elapsed = Date.now() - start;
      const delay = Math.max(0, MIN_DISPLAY - elapsed);
      const fade = setTimeout(() => setVisible(false), delay);
      const remove = setTimeout(() => setHidden(true), delay + 600);
      window.removeEventListener("load", finish);
      return () => {
        clearTimeout(fade);
        clearTimeout(remove);
      };
    };

    if (document.readyState === "complete") {
      return finish();
    }

    window.addEventListener("load", finish);
    return () => window.removeEventListener("load", finish);
  }, []);

  if (hidden) return null;

  return (
    <div className={cn("preloader", !visible && "preloader-hidden")} aria-hidden="true">
      <div className="preloader-inner">
        <div className="preloader-ring">
          <div className="preloader-ring-core" />
        </div>
        <div className="preloader-label">Solar</div>
      </div>
    </div>
  );
}
