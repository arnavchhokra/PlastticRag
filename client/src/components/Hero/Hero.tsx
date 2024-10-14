"use client"
import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useRouter} from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import FileUpload from "../FileUpload/FileUpload";
import { useRecoilState } from "recoil";
import { userAtom } from "@/atom/atom";

function Hero()
{
  const [user, setUser] = useRecoilState(userAtom);
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["essential", "timeless", "magnetic", "striking", "radiant"],
    []
  );


  useEffect(()=>{
    const token = localStorage.getItem("looksmax");
    if(token)
    {
      setUser(token);
    }


  },[setUser])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const router = useRouter();

  return (
    <div  className="px-5 w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">Good Looks are</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
            Good Looks is an AI powered platform that allows to upload photos and get personalized ratings and improvement tips. Our AI analyzes your features and provides tailored advice on skincare, grooming, and style. It helps you enhance your appearance and build confidence.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Dialog>
  <DialogTrigger className="border-2 border-white-500 rounded-lg p-2 pl-2 pr-2">Upload Image</DialogTrigger>
  <DialogContent className="flex items-center justify-center">
    <DialogHeader className="w-[300px]">
      <DialogDescription>
        <FileUpload/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
{
  !user && <Button onClick={()=>{router.push("/signup")}}size="lg" className="gap-4">
  Sign up
</Button>
}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Hero;