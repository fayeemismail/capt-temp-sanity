import { getFooterData } from "@/app/api/footerContentApi"
import Image from "next/image";
import Link from "next/link";



const Footer = async () => {
  const footerData = await getFooterData();
  // console.log("footerDat: ", footerData)

  if (!footerData) return null;
  return (
    <footer className="pt-40 px-6 lg:px-27.5 lg:pt-14 pb-20">
      <div className="container">
        <div className="footer ">
          <hr className="border-t-5 lg:border-t-3 border-gray-300 w-full" />

          {/* heading section  */}
          <div className="pt-30 flex flex-col justify-center items-center lg:justify-start lg:items-start ">
            <h3 className={` font-semibold text-[22px] lg:text-[51px] text-white -mb-2 leading-none tracking-tight`}>
              {footerData.heading}
            </h3>
            <h2
              className={` text-start text-[40px] lg:text-[160px] text-white font-extrabold leading-none mb-2`}>
              {footerData.texts}
            </h2>
          </div>

          <div className="contact_part lg:pt-12.5 pt-12  ">
            {/* stay in touch section  */}
            <div className="flex justify-center lg:justify-start">
              {footerData.contactButton && (
                <button className={`$ font-semibold text-white border-white btn-primary border-2 px-5.25 text-xl lg:text-[16px] rounded-4xl max-w-full`}>
                  {footerData.contactButton.text}
                </button>
              )}
            </div>


            <div className="flex flex-col">

              {/* Top Section */}
              <div className="flex flex-col lg:flex-row pt-7.5 text-3xl lg:text-5xl gap-8">

                {/* Phone number */}
                <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:flex-row lg:items-start lg:text-left gap-2 lg:gap-4">

                  {/* Label – different on mobile vs desktop */}
                  <p className="font-medium shrink-0 hidden lg:block">
                    Ph:
                  </p>
                  <p className="font-medium text-white lg:hidden">
                    Phone
                  </p>

                  {/* Phone numbers as list */}
                  <ul className="flex flex-col gap-1.5">
                    {footerData.phoneNumbers.map((number) => (
                      <li key={number} className="text-gray-300 hover:text-white transition-colors">
                        {number}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Social links */}
                <div className="w-full lg:w-1/2 flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-end lg:text-left gap-4">

                  <p>FIND US</p>

                  <div className="flex gap-3 justify-center lg:justify-start">
                    {footerData.socialLinks.map((item, i) =>
                      item.icon ? (
                        <div className="bg-white rounded-full" key={i}>
                          <Link key={i} href={item.url || '#'} className="bg-white rounded-full">
                            <Image
                              src={item.icon}
                              alt={`${item.platform}-icon`}
                              width={40}
                              height={40}
                              className="p-2"
                            />
                          </Link>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>


              {/* Bottom Section */}
              <div className="flex flex-col lg:flex-row pt-12 pb-8 gap-8">

                {/* Logo */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
                  <div className="w-40 lg:w-55">
                    <Image
                      src={footerData.logo.asset.url}
                      alt="footer-logo"
                      height={200}
                      width={300}
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                  <div className="flex flex-wrap items-center justify-center lg:justify-end text-center lg:text-left">
                    {footerData.buttons.map((item, i) => (
                      <div key={i} className="flex items-center">
                        <button
                          className="text-xl lg:text-4xl font-thin text-white border-b-2 border-white"
                        >
                          {item.text}
                        </button>

                        {i !== footerData.buttons.length - 1 && (
                          <span className="mx-4 text-xl lg:text-5xl font-thin text-white">
                            |
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>



      </div>
    </footer>
  )
}

export default Footer 