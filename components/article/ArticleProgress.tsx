"use client";

import { useEffect, useState } from "react";

export function ArticleProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-[#1E1E3A]">
      <div
        className="h-full bg-gradient-to-r from-[#FF3A20] to-[#FF6B4A] transition-all duration-75"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
