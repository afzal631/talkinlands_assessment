import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen overflow-x-hidden grid grid-cols-3"
      style={
        {
          // backgroundImage: "url(https://wallpapercave.com/wp/wp9735891.jpg)",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
        }
      }
    >
      {/* <div className="min-h-[100vh]  mx-[20rem] flex justify-center items-center gap-[3rem]"> */}
      <div
        onClick={() => {
          navigate("/search-map");
        }}
        className="h-full w-full bg-[url('https://i.ibb.co/dBKsFfH/bg1.jpg')] bg-cover bg-slate-500 shadow-[inset_0_-60px_100px_0px_rgba(0,0,0,1)] hover:shadow-[inset_0_-100px_100px_0px_rgba(0,0,0,1)] hover:text-[2.2rem] transition-all flex justify-center items-end text-4xl text-center p-7 text-white font-bold  cursor-pointer"
      >
        Search any place in your mind
      </div>
      <div
        onClick={() => {
          navigate("/Inida-tourism");
        }}
        className="h-full w-full bg-[url('https://i.ibb.co/YQR04Wg/bg2.jpg')] bg-cover bg-red-500 shadow-[inset_0_-60px_100px_0px_rgba(0,0,0,1)] hover:shadow-[inset_0_-100px_100px_0px_rgba(0,0,0,1)] hover:text-[2.2rem] transition-all flex justify-center items-end text-4xl text-center p-7 text-white font-bold  cursor-pointer"
      >
        Top 10 tourist attractions in India
      </div>
      <div
        onClick={() => {
          navigate("/US-population");
        }}
        className="h-full w-full bg-[url('https://i.ibb.co/TY0mSFq/bg3.jpg')] bg-cover bg-yellow-500 shadow-[inset_0_-60px_100px_0px_rgba(0,0,0,1)] hover:shadow-[inset_0_-100px_100px_0px_rgba(0,0,0,1)] hover:text-[2.2rem] transition-all shadow-black flex justify-center text-center p-7 items-end text-4xl text-white font-bold  cursor-pointer"
      >
        US map based on population.
      </div>
    </div>
    // </div>
  );
}

export default Home;
