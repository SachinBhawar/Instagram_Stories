import { useState, useEffect, useRef } from "react";

const STORY_DURATION = 5; // this is given in problem statement

const StoryPage = ({ users, initialUserIdx = 0, onClose, seenUserRef }) => {
    const [userIdx, setUserIdx] = useState(initialUserIdx);
    const [storyIdx, setStoryIdx] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef(null);

    const currentUser = users[userIdx];
    const currentStories = currentUser.stories;
    const currentStoryImage = currentStories[storyIdx];

    useEffect(() => {
        const addToSeenUsers = (userId) => {
            if (seenUserRef.current) {
                if (!seenUserRef.current.includes(userId)) {
                    seenUserRef.current.push(userId);
                }
            } else {
                seenUserRef.current = [];
                seenUserRef.current.push(userId);
            }
        };
        setProgress(0);
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(intervalRef.current);
                    if (storyIdx < currentStories.length - 1) {
                        setStoryIdx((s) => s + 1);
                        return 0;
                    } else if (userIdx < users.length - 1) {
                        setUserIdx((u) => u + 1);
                        setStoryIdx(0);
                        addToSeenUsers(users[userIdx].userId);
                        return 0;
                    } else if (onClose) {
                        onClose();
                        addToSeenUsers(users[userIdx].userId);
                        return 100;
                    }
                    return 100;
                }
                return prev + 100 / (STORY_DURATION * 10);
            });
        }, 100);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [userIdx, storyIdx]);

    const handleStoryClick = (e) => {
        const x = e.clientX;
        const width = window.innerWidth;
        if (x > width / 2) {
            // Forward navigation
            if (storyIdx < currentStories.length - 1) {
                setStoryIdx((s) => s + 1);
            } else if (userIdx < users.length - 1) {
                setUserIdx((u) => u + 1);
                setStoryIdx(0);
            } else if (onClose) {
                onClose();
            }
        } else {
            // Backward navigation
            if (storyIdx > 0) {
                setStoryIdx((s) => s - 1);
            } else if (userIdx > 0) {
                setUserIdx((u) => u - 1);
                const prevStories = users[userIdx - 1].stories;
                setStoryIdx(prevStories.length - 1);
            }
        }
    };

    return (
        <div
            className="fixed top-0 left-0 w-screen h-screen bg-black overflow-hidden font-sans"
            onClick={handleStoryClick}
        >
            {/* Close Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (onClose) onClose();
                }}
                aria-label="Close"
                className="absolute top-4 right-6 z-50 bg-black/60 text-white text-3xl rounded-full w-10 h-10 flex items-center justify-center border-none cursor-pointer"
            >
                ×
            </button>

            {/* Progress Bars and User Info */}
            <div className="absolute top-0 left-0 w-screen z-40">
                {/* Progress bars container */}
                <div className="flex w-screen h-1 bg-white/20">
                    {currentStories.map((_, idx) => (
                        <div key={idx} className={`flex-1 mr-1 last:mr-0 relative bg-white/20 h-full`}>
                            <div
                                className={`absolute top-0 left-0 h-full bg-white transition-[width] duration-100 linear`}
                                style={{
                                    width: idx < storyIdx ? "100%" : idx === storyIdx ? `${progress}%` : "0%",
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* User info */}
                <div className="flex items-center mt-2 ml-5 mb-3">
                    <img
                        src={currentUser.userImage}
                        alt="user"
                        className="w-9 h-9 rounded-full border-2 border-white object-cover mr-2.5"
                    />
                    <span className="text-white font-semibold text-lg drop-shadow-md">
                        {currentUser.username}
                    </span>
                </div>
            </div>

            {/* Story Image */}
            <img
                src={currentStoryImage}
                alt="story"
                className="absolute top-0 left-0 w-screen h-screen object-cover z-10 select-none"
                draggable={false}
            />
        </div>
    );
};

export default StoryPage;
