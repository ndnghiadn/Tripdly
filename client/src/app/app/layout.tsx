import Header from "@/components/header/header";
import LeftSideBar from "@/views/home/LeftSideBar";
import RightSideBar from "@/views/home/RightSideBar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 grid md:grid-cols-[200px,1fr,500px]">
        <LeftSideBar />
        {children}
        <RightSideBar />
      </main>
    </div>
  );
};

export default AppLayout;
