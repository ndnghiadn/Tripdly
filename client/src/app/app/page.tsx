import Header from "@/components/home/header";
import LeftSideBar from "@/components/home/leftSideBar";
import MainContent from "@/components/home/mainContent";
import RightSideBar from "@/components/home/rightSideBar";

const HomePage = () => {
    return ( 
        <div className="flex flex-col min-h-screen">   
            <Header/>
            <main className="flex-1 grid md:grid-cols-[200px,1fr,300px]">
                <LeftSideBar/>
                <MainContent/>
                <RightSideBar/>
            </main>
        </div>
    );
}
 
export default HomePage;