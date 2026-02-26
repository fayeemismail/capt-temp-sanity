import Link from "next/link";
import Image from "next/image";
import { getRightSidebar } from "./home/sidebar";

const RightSidebar = async () => {
  const data = await getRightSidebar();

  return (
    <aside className="right-sidebar  ">
      <div className="hidden lg:flex gap-5 w-45  rounded-4xl bg-linear-to-r from-[#878889] to-white rotate-90 p-2">
        {data?.map((item) => (
        <Link key={item._key} href={item.url || "#"}
        className="flex items-center text-md text-black justify-center gap-2 whitespace-nowrap uppercase">
          {item.text && (
            <span className="right-text ">{item.text}</span>
          )}

          {item.imageUrl && (
            <Image
              src={item.imageUrl}
              alt="icon"
              width={30}
              height={30}
              className="rotate-270 "
            />
          )}
        </Link>
      ))}
      </div>
      
    </aside>
  );
};

export default RightSidebar;