import { Hero } from "@/components";
import { Carosuel } from "@/components/Carousel/Carousel";
import { Feature } from "@/components/Feature/Feature";
import Navbar from "@/components/Navbar/Navbar";
import { Pricing } from "@/components/Pricing/Pricing";

export default function Home() {
  return (
   <div>
    <Navbar/>
     <Hero />
     <Carosuel/>
     <Feature/>
     <Pricing/>
   </div>
  );
}
