import { Manrope, Poppins } from "next/font/google";
import { Outfit } from "next/font/google";



export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300" , "400", "500","700"],
})



export const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "600"],
});


export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});