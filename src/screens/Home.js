import React, { useEffect } from "react";

import Banner from "../components/home/Banner";
import Deal from "../components/home/Deal";
import Technology from "../components/home/Technology";
import Trademark from "../components/home/Trademark";
import { TopProduct } from "../components/product/TopProduct";

const Home = () => {
  return (
    <div className="m-2 lg:m-0">
      <Banner />
      <Technology />
      <Trademark />
      <Deal />
      <TopProduct />
    </div>
  );
};

export default Home;
