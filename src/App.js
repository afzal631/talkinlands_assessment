import React, { useEffect, useState } from "react";
import IndiaTourism from "./IndiaTourism";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import USpopulation from "./USpopulation";
import SearchMap from "./SearchMap";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-map" element={<SearchMap />} />
        <Route path="/US-population" element={<USpopulation />} />
        <Route path="/Inida-tourism" element={<IndiaTourism />} />
      </Routes>
    </BrowserRouter>
    // <div
    //   className="h-[100%] overflow-x-hidden"
    //   style={{
    //     backgroundImage: "url(https://wallpapercave.com/wp/wp9735891.jpg)",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //   }}
    // >
    //   <div className="min-h-[100vh]  mx-[20rem] flex flex-col justify-center items-center gap-[3rem]">
    //     <div className="h-[8rem] w-[20rem] bg-slate-500 rounded-lg flex justify-center items-center text-lg text-white font-bold hover:scale-105 transition-all delay-100 cursor-pointer">
    //       Search any place in your mind
    //     </div>
    //     <div className="h-[8rem] w-[20rem] bg-red-500 rounded-lg flex justify-center items-center text-lg text-white font-bold hover:scale-105 transition-all delay-100 cursor-pointer">
    //       Top 10 tourist attractions in India
    //     </div>
    //     <div className="h-[8rem] w-[20rem] bg-yellow-500 rounded-lg flex justify-center items-center text-lg text-white font-bold hover:scale-105 transition-all delay-100 cursor-pointer">
    //       US map based on population.
    //     </div>
    //   </div>
    // </div>
  );
}
