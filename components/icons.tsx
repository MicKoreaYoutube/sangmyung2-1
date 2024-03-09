import {
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  Instagram
} from "lucide-react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons"

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  instagram: Instagram,
  logo: (props: LucideProps) => (
<svg version="1.0" xmlns="http://www.w3.org/2000/svg"
  width={24} height={24} viewBox="0 0 450.000000 450.000000"
  preserveAspectRatio="xMidYMid meet">

  <g transform="translate(0.000000,450.000000) scale(0.100000,-0.100000)"
    fill="currentColor" stroke="none">
    <path d="M2065 4494 c-200 -21 -422 -70 -581 -129 -924 -343 -1520 -1229
      -1480 -2200 31 -769 440 -1455 1100 -1849 242 -144 564 -257 851 -298 116 -16
      474 -16 590 0 991 141 1764 894 1926 1877 158 964 -346 1939 -1226 2369 -323
      158 -595 224 -950 231 -104 2 -208 1 -230 -1z m487 -169 c229 -34 401 -87 603
      -185 233 -113 383 -218 559 -389 183 -179 308 -354 426 -596 144 -297 203
      -560 203 -905 0 -345 -59 -608 -203 -905 -118 -242 -243 -417 -426 -596 -176
      -171 -326 -276 -559 -389 -297 -144 -560 -203 -905 -203 -345 0 -608 59 -905
      203 -233 113 -383 218 -559 389 -183 179 -308 354 -426 596 -144 297 -203 560
      -203 905 0 345 59 608 203 905 118 242 243 417 426 596 176 171 325 275 559
      389 240 117 454 174 770 204 76 8 334 -4 437 -19z"/>
    <path d="M2066 3464 c-148 -41 -293 -87 -323 -101 -104 -51 -159 -144 -157
      -263 4 -154 77 -237 224 -255 50 -6 132 6 218 31 l22 6 0 -868 c0 -482 5 -901
      10 -941 11 -88 36 -140 90 -185 51 -44 101 -59 196 -59 97 0 166 23 214 71 75
      75 71 0 68 1286 l-3 1149 -34 63 c-19 35 -49 75 -67 89 -38 29 -114 54 -158
      52 -17 -1 -152 -35 -300 -75z"/>
  </g>
</svg>
  )
}