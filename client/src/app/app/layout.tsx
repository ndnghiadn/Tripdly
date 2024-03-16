
import LeftSideBar from "@/views/home/LeftSideBar";
import Header  from "../../components/header/Header"
const AppLayout = ({children}) => {
    return ( 
        <div className="flex flex-col min-h-screen">   
            <Header/>
            <main className="flex-1 grid md:grid-cols-[200px,1fr]">
                <LeftSideBar/>
                {/* <MainContent/> */}
                {children}
            </main>
        </div>
    );
}
 
export default AppLayout;