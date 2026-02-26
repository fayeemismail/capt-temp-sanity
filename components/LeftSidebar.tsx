import Image from "next/image";
import Link from "next/link";
import { getLeftSidebar } from "./home/sidebar";

const LeftSidebar = async () => {
  const data = await getLeftSidebar();

  return (
    <aside className="left-sidebar hidden bg-black">
      <div className="hidden lg:flex gap-10 w-65 rounded-4xl text-center bg-linear-to-r from-[#878889] to-white rotate-270 p-3">
        {data?.map((item) => (
          <Link
            key={item._key}
            href={item.url || "#"}
            className="flex items-center text-md text-black gap-2 whitespace-nowrap uppercase"
          >
            {item.imageUrl && (
              <Image
                src={item.imageUrl}
                alt={item.text ?? "icon"}
                width={35}
                height={35}
                className="rotate-90"
              />
            )}
            {item.text && <span>{item.text}</span>}
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default LeftSidebar;