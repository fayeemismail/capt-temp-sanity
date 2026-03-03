import { sanityClient } from "@/lib/sanity.client"
import Image from "next/image"
import { Poppins } from "next/font/google"
import { poppins } from "@/public/assets/css/font"



const query = `
  *[_type == "page" && slug.current == "home"][0].hero{
    "backgroundImage": backgroundImage.asset->url,
    "logo": logo.asset->url,
    "text": text
  }
`

const HeroSection = async () => {
  const data = await sanityClient.fetch(query)

  return (
    <section className=" pt-40 lg:mx-27.5 lg:pt-20 pb-40">
      <div className=" ">
        <div className="flex flex-col  items-center justify-center gap-6 lg:pb-7">
          {/* Logo */}
          <Image
            alt="logo"
            src={data.logo}
            height={1000}
            width={1000}
            priority
            className="hidden lg:block lg:w-55  h-auto scale-150"
          />

        </div>
          {/* Hero Image */}
        <div className="flex items-center justify-center">
          <Image
            alt="background"
            src={data.backgroundImage}
            width={1920}
            height={600}
            priority
            className="w-[93%] mb-7.5 lg:w-full h-auto block"
          />
        </div>

        {/* Text */}
        <div className="flex items-center justify-start   text-center">
          <p className={`${poppins.className} px-0 lg:px-0  lg:text-[18px] text-[28px]`}>
            {data.text}
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection