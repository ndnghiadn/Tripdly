import Link from "next/link";
import { Button } from "../ui/button";

const RightSideBar = () => {
    return ( 
        <div className="hidden md:flex flex-col gap-4 border-l border-gray-200 bg-gray-100 px-4 py-6 dark:border-gray-800 dark:bg-gray-800">
          <div className="flex items-center gap-4">
            <div className="font-semibold">Who to follow</div>
            <Button>Refresh</Button>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center gap-4">
              <div className="rounded-full overflow-hidden aspect-square w-12 h-12">
                <img
                  alt="Avatar"
                  className="object-cover object-center rounded-full"
                  height="56"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width="56"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Alice Johnson</div>
                <div className="text-gray-500 text-sm dark:text-gray-400">@alicejohnson</div>
              </div>
              <Button className="ml-auto">
                Follow
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full overflow-hidden aspect-square w-12 h-12">
                <img
                  alt="Avatar"
                  className="object-cover object-center rounded-full"
                  height="56"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width="56"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Bob Smith</div>
                <div className="text-gray-500 text-sm dark:text-gray-400">@bobsmith</div>
              </div>
              <Button className="ml-auto">
                Follow
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-full overflow-hidden aspect-square w-12 h-12">
                <img
                  alt="Avatar"
                  className="object-cover object-center rounded-full"
                  height="56"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "56/56",
                    objectFit: "cover",
                  }}
                  width="56"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">Charlie Brown</div>
                <div className="text-gray-500 text-sm dark:text-gray-400">@charliebrown</div>
              </div>
              <Button className="ml-auto">
                Follow
              </Button>
            </div>
          </div>
        </div>
     );
}
 
export default RightSideBar;
