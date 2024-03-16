
import Header from "@/components/header/header";
import LeftSideBar from "@/views/home/LeftSideBar";

const AppLayout = ({children}) => {
    return ( 
        <div className="flex flex-col min-h-screen">   
            <Header/>
            <main className="flex-1 grid md:grid-cols-[200px,1fr]">
                <LeftSideBar/>
                {children}
            </main>
        </div>
    );
}
 
export default AppLayout;