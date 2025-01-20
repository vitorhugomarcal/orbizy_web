import { useTheme } from "@/components/theme-provider"
import colors from "tailwindcss/colors"

export const LoginVector1 = (props: any) => {
  const { theme } = useTheme()

  // Definir as cores com base no tema
  const color1 = theme === "dark" ? colors.slate[800] : "#f97316"
  const color2 = theme === "dark" ? colors.slate[700] : "#fb923c"

  return (
    <svg
      width={1012}
      height={1023}
      viewBox="0 0 1012 1023"
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M116.21 472.5C55.1239 693.5 78.5219 837.5 114.349 1023H1030.5V-1L0 -106C147.5 21.5 172.311 269.536 116.21 472.5Z"
        fill="url(#paint0_linear)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1={515.25}
          y1={-106}
          x2={515.25}
          y2={1023}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={color1} />
          <stop offset={1} stopColor={color2} />
        </linearGradient>
      </defs>
    </svg>
  )
}
