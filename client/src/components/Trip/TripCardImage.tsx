import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Location } from "@/constants";
import { FC } from "react";

export interface ITitleImg {
    dataImgs : Location[]
}

const TripCardImage:FC<ITitleImg> = (props) => {
    return (
        <Carousel className="w-full h-full">
          <CarouselContent>
            {props.dataImgs.map((curr: Location, index:number) => (
              <CarouselItem key={index}>
                <div className="flex gap-3 mt-5">
                    <figure className="relative">
                        <Image className="rounded-xl" loading={"eager"} width={500} height={350} key={index} src={curr.imageUrls[0]} alt="image description"/>
                        <figcaption className="absolute px-4 text-lg text-white bottom-6">
                            <p className="border-b border-solid border-white">{curr.name}</p>
                        </figcaption>
                    </figure>
                    <div className="flex flex-col gap-2">
                        {curr.imageUrls.slice(1).map((curr:string,index:number) => <Image className="rounded-xl" key={index} loading={"eager"} width={250} height={150} src={curr} alt="image description"/>)}
                    </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )
}
 
export default TripCardImage;