import Header from "@/modules/LandingPage/Header";
import Footer from "@/modules/LandingPage/Footer";
import Content from "@/modules/LandingPage/Content";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-yellow-50 to-green-100">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
