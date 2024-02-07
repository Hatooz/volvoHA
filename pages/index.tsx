import { InferGetServerSidePropsType } from "next";
import Cars from "../src/components/Cars";

export default function Home({
  cars,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Cars cars={cars} />
    </>
  );
}

export async function getServerSideProps() {
  const cars = await (await fetch(process.env.URL + "/api/cars.json")).json();

  return {
    props: {
      cars: cars,
    },
  };
}
