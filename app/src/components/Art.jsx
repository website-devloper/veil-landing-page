import { useEffect, useRef, useState } from "react";

/*
  Key art fades up once decoded instead of snapping in mid-scroll.

  onLoad alone is not enough: a cached image can finish before React attaches
  the handler, leaving it stuck invisible. The effect checks `complete` on mount
  to catch exactly that. onError also resolves, so a missing file falls back to
  the gradient behind it rather than a permanent blank.
*/
export default function Art({ className = "", ...props }) {
  const ref = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={ref}
      className={`${className}${loaded ? " is-loaded" : ""}`}
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      loading="lazy"
      decoding="async"
      width={900}
      height={506}
      {...props}
    />
  );
}
