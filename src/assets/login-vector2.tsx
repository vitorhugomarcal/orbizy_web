import colors from "tailwindcss/colors"

import { useTheme } from "@/components/theme-provider"
export const LoginVector2 = (props: any) => {
  const { theme } = useTheme()

  const color1 = theme === "dark" ? colors.slate[900] : "#c2410c"
  const color2 = theme === "dark" ? colors.slate[700] : "#fb923c"

  return (
    <svg
      width={1122}
      height={1017}
      viewBox="0 0 1122 1017"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M226.002 466.5C164.935 687.5 188.326 831.5 224.141 1017H1140V-7L0 -109.5C142.5 -7.5 282.085 263.536 226.002 466.5Z"
        fill="url(#paint0_linear)"
        fillOpacity={0.1}
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1={649.5}
          y1={-7}
          x2={649.5}
          y2={1017}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset={1} stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
  )
}
