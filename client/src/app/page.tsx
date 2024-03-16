import Header from "@/views/landingPage/Header";
import Footer from "@/views/landingPage/Footer";
import Content from "@/views/landingPage/Content";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-yellow-50 to-green-100">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
