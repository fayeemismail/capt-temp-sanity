import { sanityClient } from "@/lib/sanity.client"
import { poppins } from "@/public/assets/css/font";
import Image from "next/image";



const query = `
  *[_type == "page" && slug.current == "home"][0].about{
  "image": image.asset->url,
  text 
  }
`



const HomeAbout = async () => {

    const aboutData = await sanityClient.fetch(query);
    // console.log("aboutData : ", aboutData)

    return (
        <section className=" pt-10 lg:mx-27.5 lg:pt-24 lg:pb-40 md:pb-40 pb-17.5 ">
            <div className="container">
                <div className="flex lg:flex-row flex-col">
                    <div className="flex lg:w-111.25 lg:mb-0 mb-12.5 lg:px-3.75 justify-center  lg:items-center lg:justify-center">
                        <Image
                            alt="about_image"
                            src={aboutData.image}
                            width={267}
                            height={264}
                            className="h-95 md:h-95 lg:h-66 w-auto"
                        />
                    </div>
                    <div className="flex w-166.25 lg:px-3.75 lg:text-start text-center  items-center justify-center">
                        <p className={`${poppins.className} lg:text-[18px] text-[28px] w-158.75 `}>{aboutData.text}</p>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default HomeAbout