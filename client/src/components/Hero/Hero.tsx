"use client"
import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";

import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "../ModeToggle/ModeToggle";
import { useRouter} from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import FileUpload from "../FileUpload/FileUpload";

function Hero()
{
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["amazing", "new", "wonderful", "beautiful", "smart"],
    []
  );

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
    <div className="px-5 w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">This is something</span>
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
              Managing a small business today is already tough. Avoid further
              complications by ditching outdated, tedious trade methods. Our
              goal is to streamline SMB trade, making it easier and faster than
              ever.
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
            <Button onClick={()=>{router.push("/signup")}}size="lg" className="gap-4">
              Sign up
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Hero;