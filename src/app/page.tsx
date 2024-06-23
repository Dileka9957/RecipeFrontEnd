"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import Modal from "../../components/Modal";
import Navbar from "../../components/Navbar";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Beef");
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [clickedMeal, setClickedMeal] = useState({
    strMeal: "",
    strMealThumb: "",
  });
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/recipes/getMealsByCategory/${selectedCategory}`
      )
      .then((response) => {
        // console.log("response", response.data);
        setMeals(response?.data?.meals);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedCategory]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/recipes/getAllMealCategories")
      .then((response) => {
        // console.log("response", response.data);
        setCategories(response?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddToFavorites = (meal) => {
    axios
      .post("http://localhost:5000/favorites/add", { meal })
      .then((response) => {
        if (response.data.success) {
          alert("Meal added to favorites!");
        }
      })
      .catch((error) => {
        console.error(
          "There was an error adding the meal to favorites!",
          error
        );
      });
  };

  return (
    <>
      {isOpenModel && (
        <Modal
          onClose={() => setIsOpenModel(false)}
          isOpen={isOpenModel}
          meal={clickedMeal}
        />
      )}
      <div className=" h-screen justify-center bg-white z-10 overflow-y-auto">
        <Navbar />

        <div className="px-10">
          <div className="flex justify-between" style={{ marginTop: 120 }}>
            <div className="grid gap-10 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex flex-col ">
              {categories?.map(
                (category, index) =>
                  category !== null && (
                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setSelectedCategory(
                          (category as { strCategory: string }).strCategory
                        )
                      }
                      className={`px-3 py-1 md:px-6 md:py-3 text-[#f54e86] text-xs md:text-base font-semibold uppercase rounded-full border-[#f54e86] border-2 ${
                        selectedCategory ===
                        (category as { strCategory: string }).strCategory
                          ? "bg-pink-500"
                          : ""
                      } ${
                        selectedCategory ===
                        (category as { strCategory: string }).strCategory
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {(category as { strCategory: string }).strCategory}
                    </button>
                  )
              )}
            </div>
          </div>
          <div className="flex justify-center" style={{ marginTop: 65 }}>
            <div className="grid gap-10 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex flex-col">
              {meals?.map(
                (meal, index) =>
                  meal !== null && (
                    <div
                      key={index}
                      onClick={() => {
                        setIsOpenModel(true);
                        setClickedMeal(meal);
                      }}
                      className="flex flex-col items-center justify-center"
                    >
                      <div
                        style={{
                          width: 180,
                          height: 180,
                        }}
                        className="bg-zinc-400 rounded-3xl"
                      ></div>
                      <div className="flex justify-between items">
                        <h2 className="text-md mt-3 text-gray-600 font-medium mt-0 mr-2">
                          Soup
                        </h2>
                        {/* <button>
                          <svg
                            className="text-red-400 w-5 h-auto fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z" />
                          </svg>
                        </button> */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the modal
                            handleAddToFavorites(meal);
                          }}
                        >
                          <svg
                            className="text-red-400 w-5 h-auto fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
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
