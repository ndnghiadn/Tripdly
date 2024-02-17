import { Button } from "@/components/ui/button"
import RightSideBar from "./rightSideBar";
const MainContent = () => {
    return ( 
      <div className="flex-1 grid md:grid-cols-[1fr,300px]">
      
      <div className="space-y-4 p-4 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img
                alt="Avatar"
                className="rounded-full"
                height="48"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "48/48",
                  objectFit: "cover",
                }}
                width="48"
              />
            </div>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className="font-semibold">Acme Inc</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">@acmeinc · 2m</div>
              </div>
              <div className="line-clamp-2">
                Hey there! We're excited to announce the launch of our brand new app. It's been a labor of love, and we
                can't wait for you to try it out. Let us know what you think! 🚀
              </div>
              <img
                alt="Cover image"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center"
                height="250"
                src="/placeholder.svg"
                width="500"
              />
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost">
                    <HeartIcon className="w-4 h-4" />
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MessageCircleIcon className="w-4 h-4" />
                    <span className="sr-only">Comment</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <RepeatIcon className="w-4 h-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Button size="icon" variant="ghost">
                    <CameraIcon className="w-4 h-4" />
                    <span className="sr-only">Image</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <VideoIcon className="w-4 h-4" />
                    <span className="sr-only">Video</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <img
                alt="Avatar"
                className="rounded-full"
                height="48"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "48/48",
                  objectFit: "cover",
                }}
                width="48"
              />
            </div>
            <div className="grid gap-1.5">
              <div className="flex items-center gap-1.5">
                <div className="font-semibold">Grace Lee</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">@gracelee · 5m</div>
              </div>
              <div className="line-clamp-2">
                {`\n                Just finished reading the latest bestseller and I&apos;m\n                absolutely blown away. The plot twists, the character\n                development, everything about it is just so captivating. I\n                highly recommend it! 📚❤\u{fe0f}\n              `}
              </div>
              <div className="grid w-full gap-4 images justify-start">
                <img
                  alt="Image"
                  className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                  height="150"
                  src="/placeholder.svg"
                  width="150"
                />
                <img
                  alt="Image"
                  className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                  height="150"
                  src="/placeholder.svg"
                  width="150"
                />
                <img
                  alt="Image"
                  className="aspect-square overflow-hidden rounded-lg object-cover object-center"
                  height="150"
                  src="/placeholder.svg"
                  width="150"
                />
              </div>
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost">
                    <HeartIcon className="w-4 h-4" />
                    <span className="sr-only">Like</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MessageCircleIcon className="w-4 h-4" />
                    <span className="sr-only">Comment</span>
                  </Button>
                  <Button size="icon" variant="ghost">
                    <RepeatIcon className="w-4 h-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
                <Button size="icon" variant="outline">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Add to favorites</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      <RightSideBar/>
      </div>
     );
}
 
export default MainContent;
function HeartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  }

  function MessageCircleIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
      </svg>
    )
  }
  function RepeatIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m17 2 4 4-4 4" />
        <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
        <path d="m7 22-4-4 4-4" />
        <path d="M21 13v1a4 4 0 0 1-4 4H3" />
      </svg>
    )
  }
  function CameraIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    )
  }
  function VideoIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m22 8-6 4 6 4V8Z" />
        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
      </svg>
    )
  }
  function PlusIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }