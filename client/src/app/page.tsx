import Header from "@/components/landingPage/header";
import Footer from "@/components/landingPage/footer";
import Content from "@/components/landingPage/content";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh] bg-gradient-to-b from-yellow-200 to-green-400">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
