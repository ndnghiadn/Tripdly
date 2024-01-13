import Header from "@/components/home/header";
import Parallax from "@/components/home/parallax";
import Reveal from "@/components/home/reveal";

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
