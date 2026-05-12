import { SVGProps } from "react";

export function MapIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21C12 21 6 15.7 6 10C6 6.7 8.7 4 12 4C15.3 4 18 6.7 18 10C18 15.7 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
