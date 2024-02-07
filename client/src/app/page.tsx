import Header from "@/components/landingPage/header";
import Parallax from "@/components/landingPage/parallax";
import Reveal from "@/components/landingPage/reveal";

export default function Home() {
  return (
    <>
      <Header />
      <div className="main-container">
        <Parallax />
        <Reveal />
      </div>
    </>
  );
}
