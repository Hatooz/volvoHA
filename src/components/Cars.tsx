/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import chevron from "../../docs/chevron-circled.svg";
import chevronSmall from "../../docs/chevron-small.svg";

type Car = {
  id: string;
  modelName: string;
  bodyType: string;
  modelType: string;
  imageUrl: string;
};

export default function Cars({ cars }: { cars: Car[] }) {
  const [activeDot, setActiveDot] = useState(0);
  const carSlider = useRef<HTMLDivElement>(null);
  const [filteredCars, setFilteredCars] = useState(cars.slice());

  const slide = (direction: string) => {
    if (carSlider.current)
      carSlider.current.scrollLeft += direction === "left" ? 500 : -500;
  };

  const dotNavigate = (index: number) => {
    if (carSlider.current) carSlider.current.scrollLeft = 300 * index;
    setActiveDot(index);
  };

  const bodyTypes: string[] = [
    ...new Set(cars.map((car) => car.bodyType)),
  ] as string[];

  const filterCars = (type: string) => {
    setFilteredCars(
      type === "all"
        ? cars
        : cars.filter((car) => car.bodyType === type.toLocaleLowerCase())
    );
  };

  return (
    <>
      <div className="w-full flex justify-end bg-white text-2xl text-black border-b border mb-6">
        <select
          className=" w-full h-10  px-4 outline"
          onChange={(e) => filterCars(e.target.value)}
        >
          <option value="all">Filter</option>
          {bodyTypes.map((type) => {
            return (
              <option key={type} value={type}>
                {type.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div
        ref={carSlider}
        className="w-full flex h-full overflow-x-scroll overflow-y-hidden scroll whitespace-nowrap scroll-smooth scrollbar-hide"
      >
        {filteredCars.map((car) => {
          return (
            <div key={car.id} className="shrink-0 max-sm:w-[300px] w-[500px]">
              <div className="text-2xl text-gray-500 font-semibold">
                {car.bodyType.toUpperCase()}
              </div>
              <div className="text-2xl font-bold flex max-sm:flex-col lg:flex-row">
                <span className="mr-4">{car.modelName}</span>
                <div className="text-2xl font-normal text-gray-500">
                  {car.modelType}
                </div>
              </div>

              <div className="snap-mandatory">
                <img
                  key={car.id}
                  src={car.imageUrl}
                  className="inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-100"
                  alt="/"
                ></img>
              </div>
              <div></div>
              <div className="flex justify-center mt-20">
                <div className="max-sm:text-2xl text-4xl text-[#4682b4] mx-4">
                  <div className="flex ">
                    <Link href={`/learn/${car.id}`}>
                      <a className="font-semibold mr-6">LEARN</a>
                    </Link>
                    <Image
                      src={chevronSmall}
                      alt="My SVG"
                      width={30}
                      onClick={() => slide("right")}
                    />
                  </div>
                </div>
                <div className="max-sm:text-2xl text-4xl text-[#4682b4] mx-4">
                  <div className="flex ">
                    <Link href={`/shop/${car.id}`}>
                      <a className="font-semibold mr-6">SHOP</a>
                    </Link>
                    <Image
                      src={chevronSmall}
                      alt="My SVG"
                      width={30}
                      onClick={() => slide("right")}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end pr-10 mt-20 max-sm:hidden">
        <Image
          src={chevron}
          alt="My SVG"
          width={70}
          height={70}
          className="rotate-180"
          onClick={() => slide("right")}
        />
        <Image
          src={chevron}
          alt="My SVG"
          width={70}
          height={70}
          onClick={() => slide("left")}
        />
      </div>
      <div className="dots w-full flex justify-center text-9xl sm:hidden">
        {cars.map((car, index) => {
          return (
            <div
              key={car.id}
              onClick={() => dotNavigate(index)}
              className={index === activeDot ? "text-black" : "text-gray-200"}
            >
              .
            </div>
          );
        })}
      </div>
    </>
  );
}
