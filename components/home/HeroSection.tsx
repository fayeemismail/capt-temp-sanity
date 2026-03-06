import { sanityClient } from "@/lib/sanity.client"
import Image from "next/image"

const query = `
  *[_type == "page" && slug.current == "home"][0].hero{
    "backgroundImage": backgroundImage.asset->url,
    "logo": logo.asset->url,
    "text": text,
    "heading": heading
  }
`

const HeroSection = async () => {
  const data = await sanityClient.fetch(query, {}, { cache: "no-store" })

  return (
    <section className="pt-32 pb-32 px-4 lg:px-27.5">
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <Image
          alt="logo"
          src={data.logo}
          width={400}
          height={400}
          priority
          className="hidden lg:block w-55 h-auto"
        />
      </div>

      {/* Hero Image */}
      <div className="flex justify-center mb-12">
        <Image
          alt="background"
          src={data.backgroundImage}
          width={1920}
          height={600}
          priority
          className="w-full max-w-full h-auto"
        />
      </div>

      {/* Text */}
      <p className="text-white text-3xl text-center ">
        {data.heading}
      </p>
      <p className="text-white text-center text-[clamp(6px,5vw,22px)]  mx-auto">
        {data.text}
      </p>
    </section>
  )
}

export default HeroSection