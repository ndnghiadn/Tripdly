import Link from "next/link";

const LeftSideBar = () => {
    return ( 
        <div className="hidden md:flex flex-col border-r bg-gray-100 py-4 px-2 dark:bg-gray-800">
        <div className="flex flex-col gap-2">
            <Link
              className="flex items-center gap-2 p-2 rounded-md bg-gray-100/50 text-gray-900 font-medium dark:bg-gray-800/50 dark:text-gray-50"
              href="#"
            >
              <HomeIcon className="w-4 h-4" />
              Home
            </Link>
            <Link
              className="flex items-center gap-2 p-2 rounded-md text-gray-500 font-medium dark:text-gray-400"
              href="#"
            >
              <BookmarkIcon className="w-4 h-4" />
              Bookmarks
            </Link>
            <Link
              className="flex items-center gap-2 p-2 rounded-md text-gray-500 font-medium dark:text-gray-400"
              href="/app/chat/123"
            >
              <BookmarkIcon className="w-4 h-4" />
              Chat
            </Link>
            
        </div>
        </div>
     );
}
 
export default LeftSideBar;

function HomeIcon(props) {
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
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }

  function BookmarkIcon(props) {
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
        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
      </svg>
    )
  }