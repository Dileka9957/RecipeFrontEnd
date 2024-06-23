import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="">
      <div className="absolute top-0 left-0 w-full bg-white ">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                width={100}
                height={0}
                className="mx-auto "
                alt=""
              />
            </Link>
          </div>
          <div className="flex justify-between gap-10">
            <Link
              className="text-black text-xs md:text-base uppercase"
              href={"/"}
            >
              Home
            </Link>
            <Link
              className="text-black text-xs md:text-base uppercase"
              href={"/favourite"}
            >
              Favourite
            </Link>
          </div>
          <div className="flex items-center">
            <button type="button" className=" text-black text-xs md:text-base">
              &nbsp;Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
