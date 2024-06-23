"use client";

import Navbar from "../../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [meals, setFavourites] = useState<Meal[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/meal/getAllFavouriteMeals")
      .then((response) => {
        setFavourites(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  interface Meal {
    _id: string;
    strMeal: string;
    strMealThumb: string;
  }

  const handleDeleteFavorites = async (meal: Meal) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/meal/deleteFavouriteMeals/${meal._id}` // Use the object ID in the URL
      );

      if (response.status === 200) {
        // Update the state to remove the deleted meal
        setFavourites((prevMeals) =>
          prevMeals.filter((m) => m._id !== meal._id)
        );
      } else {
        console.error("Error deleting favorite meal:", response);
        alert("Failed to delete meal.");
      }
    } catch (error) {
      console.error(error);
      alert(`Failed to delete meal: ${error}`);
    }
  };

  return (
    <>
      <div className=" h-screen flex justify-center bg-[#eee6f0] z-1 overflow-y-auto">
        <Navbar />
        <div>
          <div className="flex justify-center" style={{ marginTop: 140 }}>
            <div className="grid gap-10 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex flex-col ">
              {meals?.map(
                (meal, index) =>
                  meal !== null && (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center"
                    >
                      <div
                        style={{
                          width: 180,
                          height: 180,
                        }}
                        className="bg-zinc-400 rounded-3xl"
                      ></div>
                      <div className="flex justify-between mt-3">
                        <h2 className="text-md text-gray-600 font-medium mt-0 mr-2">
                          Soup
                        </h2>
                        <button
                          type="button"
                          title="no title"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the modal
                            handleDeleteFavorites(meal);
                          }}
                        >
                          <svg
                            className="text-red-400 w-5 h-auto fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                          </svg>
                        </button>
                      </div>
                      <h2 className="text-md mt-3 text-black font-medium">
                        {(meal as { strMeal: string }).strMeal}
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
