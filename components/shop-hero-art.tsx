import { useId } from "react";

export default function ShopHeroArt() {
  const id = useId();

  return (
    <svg
      className="shop-hero-art"
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${id}-face`} x1="115" y1="66" x2="202" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#caf0f8" />
          <stop offset=".46" stopColor="#90e0ef" />
          <stop offset="1" stopColor="#00b4d8" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="106" y1="99" x2="205" y2="185" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0077b6" />
          <stop offset="1" stopColor="#03045e" />
        </linearGradient>
        <linearGradient id={`${id}-token`} x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#caf0f8" />
          <stop offset="1" stopColor="#90e0ef" />
        </linearGradient>
      </defs>

      <ellipse cx="161" cy="230" rx="78" ry="8" fill="#0077b6" opacity=".08" />
      <circle cx="159" cy="126" r="102" stroke="#90e0ef" strokeWidth="1" strokeDasharray="2 8" />

      <g className="art-orbit" strokeLinecap="round">
        <path d="M50 139C39 113 77 79 137 61C197 43 258 47 270 73C275 84 269 97 256 110" stroke="#0077b6" strokeWidth="2" />
        <path d="M75 71C99 38 158 45 209 88C261 132 283 187 259 215C246 230 220 229 191 218" stroke="#00b4d8" strokeWidth="1.5" opacity=".7" />
        <circle cx="115" cy="67" r="5" fill="#00b4d8" stroke="#caf0f8" strokeWidth="2" />
        <circle cx="257" cy="216" r="4" fill="#0077b6" />
      </g>

      <g className="art-face">
        <g transform="rotate(-12 159 126)">
          <circle cx="159" cy="133" r="64" fill={`url(#${id}-rim)`} stroke="#03045e" strokeWidth="2.5" />
          <circle cx="159" cy="124" r="64" fill={`url(#${id}-face)`} stroke="#03045e" strokeWidth="2.5" />
          <circle cx="159" cy="124" r="57" stroke="#caf0f8" strokeOpacity=".65" strokeWidth="1.5" />
          <path d="M111 105C116 85 133 73 153 73" stroke="#fff" strokeOpacity=".68" strokeWidth="7" strokeLinecap="round" />
          <path d="M173 177C189 173 201 163 208 148" stroke="#0077b6" strokeOpacity=".25" strokeWidth="4" strokeLinecap="round" />
          <g stroke="#03045e" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M128 104L142 118M142 104L128 118" />
            <path d="M176 104L190 118M190 104L176 118" />
            <path d="M132 139C138 162 178 164 187 138" />
          </g>
          <path d="M129 138L136 136M184 135L191 138" stroke="#03045e" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>

      <path d="M269 115C253 139 214 163 166 177C118 192 69 191 48 178" stroke="#caf0f8" strokeWidth="7" strokeLinecap="round" />
      <path d="M269 115C253 139 214 163 166 177C118 192 69 191 48 178" stroke="#0077b6" strokeWidth="2" strokeLinecap="round" />

      <g className="art-token art-token-shirt">
        <g transform="translate(24 155) rotate(-14 32 32)">
          <rect x="2" y="5" width="64" height="64" rx="19" fill="#03045e" />
          <rect width="64" height="64" rx="19" fill={`url(#${id}-token)`} stroke="#03045e" strokeWidth="2" />
          <path d="M24 16L15 20L9 32L19 37L22 32V49H42V32L45 37L55 32L49 20L40 16C38 23 26 23 24 16Z" fill="#0077b6" stroke="#03045e" strokeWidth="2" strokeLinejoin="round" />
          <path d="M26 17C28 21 36 21 38 17" stroke="#caf0f8" strokeWidth="2" strokeLinecap="round" />
          <path d="M29 32L35 38M35 32L29 38" stroke="#90e0ef" strokeWidth="3" strokeLinecap="round" />
          <path d="M24 45H40" stroke="#00b4d8" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>

      <g className="art-token art-token-mug">
        <g transform="translate(234 42) rotate(13 30 30)">
          <rect x="2" y="5" width="60" height="60" rx="18" fill="#03045e" />
          <rect width="60" height="60" rx="18" fill="#caf0f8" stroke="#03045e" strokeWidth="2" />
          <path d="M39 24H43C53 24 53 39 43 39H39" stroke="#03045e" strokeWidth="6" />
          <path d="M39 24H43C53 24 53 39 43 39H39" stroke="#00b4d8" strokeWidth="2" />
          <path d="M15 20H40V41C40 46 15 46 15 41V20Z" fill="#0077b6" stroke="#03045e" strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="27.5" cy="20" rx="12.5" ry="3.5" fill="#03045e" stroke="#03045e" strokeWidth="2" />
          <path d="M18 20C21 18 34 18 37 20" stroke="#90e0ef" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M20 26V38" stroke="#90e0ef" strokeOpacity=".75" strokeWidth="2" strokeLinecap="round" />
          <path d="M26 32C28 36 33 36 35 32" stroke="#caf0f8" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      <g className="art-spark" fill="#0077b6">
        <path d="M63 41L66 51L76 54L66 57L63 67L60 57L50 54L60 51Z" />
        <path d="M269 157L273 170L286 174L273 178L269 191L265 178L252 174L265 170Z" fill="#00b4d8" />
        <path d="M117 211L119 217L125 219L119 221L117 227L115 221L109 219L115 217Z" />
        <circle cx="211" cy="35" r="3" fill="#00b4d8" />
        <circle cx="30" cy="116" r="3" fill="#0077b6" />
        <circle cx="292" cy="130" r="2" fill="#0077b6" />
      </g>
    </svg>
  );
}
