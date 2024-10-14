"use client";

import { useEffect, useState} from "react";
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import image1 from '@/public/1.webp';
import image2 from '@/public/2.webp';
import image3 from '@/public/3.webp';
import image4 from '@/public/4.webp';
import image5 from '@/public/5.webp';
import image6 from '@/public/6.webp';
import image7 from '@/public/7.webp';
import image8 from '@/public/8.webp';
import image9 from '@/public/9.webp';
import image10 from '@/public/10.webp';

const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
];

export default function CarouselComponent() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
        return;
        }

        setTimeout(() => {
        if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
            setCurrent(0);
            api.scrollTo(0);
        } else {
            api.scrollNext();
            setCurrent(current + 1);
        }
        }, 1000);
    }, [api, current]);



    return (
        <div id="car" className="px-5 w-full py-20 lg:py-40">
            <div className="container mx-auto">
                <div className="grid grid-cols-5 gap-10 items-center">
                    <h3 className="text-xl tracking-tighter lg:max-w-xl font-regular text-left">
                        Trusted by hundreds of people
                    </h3>
                    <div className="relative w-full col-span-4">
                        <div className="bg-gradient-to-r from-background via-white/0 to-background z-10 absolute left-0 top-0 right-0 bottom-0 w-full h-full"></div>
                        <Carousel setApi={setApi} className="w-full">
                            <CarouselContent>
                                {images.map((image, index) => (
                                    <CarouselItem
                                        className="carousel-item basis-1/ lg:basis-1/5 xl:basis-1/8"
                                        key={index}
                                    >
                                        <div className="flex max-h-[150px] rounded-md aspect-square bg-muted items-center justify-center p-1">
                                                <Image
                                                    width="100"
                                                    height="100"
                                                    loading="lazy"
                                                    src={image.src}
                                                    alt={`Image ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </div>
    );
};
