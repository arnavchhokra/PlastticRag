"use client";
import { Hero } from "@/components";
import { Feature } from "@/components/Feature/Feature";
import Navbar from "@/components/Navbar/Navbar";
import CarouselComponent from "@/components/Carousel/CarouselComponent";
import { Pricing } from "@/components/Pricing/Pricing";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atom/atom";
import { useEffect } from "react";

export default function Home() {

  const [token, setToken] = useRecoilState(userAtom);

  useEffect(() => {
    const token = localStorage.getItem("looksmax");
    if (token) {
      setToken(token);
    }
  }, [setToken]);


  return (
   <div>
    <Navbar/>
     <Hero />
     <CarouselComponent/>
     <Feature/>
     <Pricing/>
   </div>
  );
}
