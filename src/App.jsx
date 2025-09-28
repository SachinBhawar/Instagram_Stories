import { useState, useEffect } from "react";
import "./App.css";
import StoriesBar from "./Components/StoriesBar";
import StoryPage from "./Pages/StoryPage";
import USERS from "../src/assets/data.json";

function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [activeUserIdx, setActiveUserIdx] = useState(null);
    

    useEffect(() => {}, [activeUserIdx]);

    useEffect(() => {
        const checkDeviceWidth = () => {
            const width = window.innerWidth;
            setIsMobile(width <= 768); // You can adjust the breakpoint if needed
        };

        checkDeviceWidth();

        window.addEventListener("resize", checkDeviceWidth);
        return () => window.removeEventListener("resize", checkDeviceWidth);
    }, []);

    if (!isMobile) {
        return (
            <div className="w-screen h-screen flex flex-row justify-center items-center">
                <div>This webpage is visible on mobile devices please open in mobile device.</div>
            </div>
        );
    }

    return (
        <div className="w-screen h-screen bg-black overflow-hidden fixed top-0 left-0 font-sans">
            {activeUserIdx === null ? (
                <>
                    <StoriesBar users={USERS} activeUserIdx={-1} onUserClick={setActiveUserIdx} />
                    <div className="absolute top-0 left-0 w-screen h-screen flex flex-col items-center justify-center pointer-events-none z-10">
                        <span className="text-white text-base font-medium tracking-[0.2px] text-center opacity-70 bg-black/30 rounded-lg px-4 py-2 pointer-events-none select-none">
                            Click on a user to start seeing their stories
                        </span>
                    </div>
                </>
            ) : (
                <StoryPage
                    users={USERS}
                    initialUserIdx={activeUserIdx}
                    onClose={() => setActiveUserIdx(null)}
                />
            )}
        </div>
    );
}

export default App;
