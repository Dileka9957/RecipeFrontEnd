"use clinet";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../../components/Navbar";

export default function Home() {
  const meals = [
    {
      strCategory: "Pasta",
    },
    {
      strCategory: "Side",
    },
    {
      strCategory: "Starter",
    },
    {
      strCategory: "Vegan",
    },
    {
      strCategory: "Vegetarian",
    },
  ];

  return (
    <>
      <div className=" h-screen flex justify-center bg-[#eee6f0] z-1 overflow-y-auto">
        <Navbar />
        <div>
          <div className="flex justify-center" style={{ marginTop: 140 }}>
            <div className="grid gap-10 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex flex-col ">
              {meals?.map(
                (task, index) =>
                  task !== null && (
                    <div key={index}>
                      <div
                        style={{
                          width: 180,
                          height: 180,
                        }}
                        className="bg-zinc-400 rounded-3xl"
                      ></div>
                      <h2 className="text-md mt-3 text-black font-medium">
                        {task.strCategory}
                      </h2>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
