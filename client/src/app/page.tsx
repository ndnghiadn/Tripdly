import Parallax from "@/components/home/parallax";
import Reveal from "@/components/home/reveal";

export default function Home() {
  return (
    <>
      <header id="header">
        <a href="#" className="logo">
          Tripdly
        </a>
        <ul>
          <li>
            <a className="active" href="#">
              Home
            </a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Destination</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </header>
      <div className="main-container">
        <Parallax />
        <Reveal />
      </div>
    </>
  );
}
