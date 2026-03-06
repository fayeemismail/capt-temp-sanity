import { getFooterData } from "@/app/api/footerContentApi"
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = async () => {
  const footerData = await getFooterData();

  if (!footerData) return null;

  return (
    <footer className="pt-40 px-6 lg:px-28 lg:pt-14 pb-20">
      <div className="footer">
        <div className="flex flex-col gap-10">

          {/* heading */}
          <div className="flex flex-col gap-10 justify-between lg:flex-row">
            <p className="text-3xl lg:text-[33px] leading-tight max-w-72.5 lg:max-w-[320px]">
              {footerData.heading}
            </p>

            <div className="flex items-start">
              <p className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 border rounded-full">
                  <ArrowRight size={16} />
                </span>
                {footerData.ctaButton?.text}
              </p>
            </div>
          </div>

          {/* phone email and nav */}
          <div className="flex flex-col-reverse lg:flex-row justify-between items-start gap-6">

            <div className="space-y-2">
              <p className="flex flex-wrap gap-2 wrap-break-word">
                <span className="uppercase">Phone:</span>
                {footerData.phoneNumbers.map((number, index) => (
                  <span key={index}>
                    {number}
                    {index !== footerData.phoneNumbers.length - 1 && " | "}
                  </span>
                ))}
              </p>

              <p className="wrap-break-word">Email: {footerData.email}</p>
            </div>

            <div className="flex flex-wrap gap-4 max-w-full">
              {footerData.navigationLinks.map((item, i) => (
                <span key={i}>{item.text}</span>
              ))}
            </div>

          </div>

          {/* bottom */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">

            <div className="flex lg:flex-row flex-col lg:gap-10 gap-6">
              <p>{footerData.copyrightText}</p>

              <div className="flex flex-wrap gap-3">
                {footerData.legalLinks.map((item, i) => (
                  <span key={i}>{item.text}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {footerData.socialLinks.map((item, i) =>
                item.icon ? (
                  <Link
                    key={i}
                    href={item.url || "#"}
                    className="bg-white rounded-full flex items-center justify-center"
                  >
                    <Image
                      src={item.icon}
                      alt={`${item.platform}-icon`}
                      width={35}
                      height={35}
                      className="p-2"
                    />
                  </Link>
                ) : null
              )}
            </div>

          </div>

        </div>
      </div>

    </footer>
  )
}

export default Footer