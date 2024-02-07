import Link from "next/link";
import { Button } from "../ui/button";
import { Input } from "antd";

const Header = () => {
    return ( 
        <header className="flex items-center h-16 border-b px-4 shrink-0 md:px-6">
            <div className="flex items-center gap-4 lg:gap-8">
                <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
                    <SunIcon className="w-5 h-5" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Input className="w-48 border-0 box-shadow-none" placeholder="Search..." type="text" />
                <Button className="rounded-full" size="icon" variant="ghost">
                    <SearchIcon className="w-4 h-4" />
                    <span className="sr-only">Search</span>
                </Button>
                </div>
                <div className="flex items-center space-x-4 ml-auto">
                <Button className="rounded-full" size="icon" variant="ghost">
                    <BellIcon className="w-4 h-4" />
                    <span className="sr-only">Notifications</span>
                </Button>
                <Button className="rounded-full" size="icon" variant="ghost">
                    <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src="/placeholder.svg"
                    style={{
                        aspectRatio: "32/32",
                        objectFit: "cover",
                    }}
                    width="32"
                    />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </div>
      </header>
     );
}
 
export default Header;

function SearchIcon(props) {
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
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }
  
  
  function SunIcon(props) {
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
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    )
  }
  function BellIcon(props) {
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
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
      </svg>
    )
  }
  