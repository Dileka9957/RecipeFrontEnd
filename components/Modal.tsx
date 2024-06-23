"use client";
import Image from "next/image";
import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: { strMeal: string; strMealThumb: string };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, meal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-screen flex items-center justify-center z-2 block overflow-auto">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        className="absolute bg-white block overflow-hidden rounded-xl"
        style={{
          top: "15%",
          left: "50%",
          transform: "translate(-50%)",
          border: "1px solid black",
          padding: "30px 30px 30px",
        }}
      >
        <button
          type="button"
          className="absolute top-0 right-0 font-semibold text-black text-3xl "
          onClick={onClose}
        >
          X
        </button>
        <div className="flex flex-wrap items-center w-full">
          <div className="overflow-hidden block overflow-hidden object-cover">
            <Image
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className=" object-cover rounded-lg mb-2 mt-10"
              height={300}
              width={300}
            />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-black mb-2 mt-3">
            {meal.strMeal}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Modal;
