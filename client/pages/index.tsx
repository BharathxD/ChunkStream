import HomePage from "@/layout/HomePage";
import { Inter } from "next/font/google";
import { ReactElement } from "react";

const Home = () => {
  return <h1>Home Page</h1>;
};

Home.getLayout = function (page: ReactElement) {
  return <HomePage>{page}</HomePage>;
};

export default Home;
