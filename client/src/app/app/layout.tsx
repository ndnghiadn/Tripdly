import Header from "@/components/header/header";
import LeftSideBar from "@/modules/home/LeftSideBar";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="px-[361px]">{children}</main>
    </div>
  );
};

export default AppLayout;
