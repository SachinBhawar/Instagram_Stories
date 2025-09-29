function StoriesBar({ users, activeUserIdx, onUserClick, seenUserRef }) {
    return (
        <div className="flex overflow-x-auto touch-auto py-4 bg-black/85 absolute top-0 left-0 w-screen z-30 gap-[18px] border-b border-white/10 no-scrollbar">
            {users.map((user, idx) => (
                <div
                    key={user.userId}
                    onClick={() => {
                        onUserClick(idx);
                    }}
                    className={`flex flex-col items-center cursor-pointer pb-0.5 min-w-[60px] no-scrollbar ${
                        idx === activeUserIdx ? "border-b-2 border-white" : "border-b-2 border-transparent"
                    }`}
                >
                    <div className="relative w-[54px] h-[54px] mb-1.5 flex items-center justify-center">
                        {/* Gradient ring behind profile image */}
                        <div
                            className={`
              absolute top-0 left-0 w-[54px] h-[54px] rounded-full z-[1] transition-shadow
              ${seenUserRef.current?.includes(user.userId) ? "bg-gray-700" : "bg-orange-400"}
             
              ${
                  idx === activeUserIdx
                      ? "brightness-110 shadow-[0_0_0_3px_white]"
                      : "shadow-[0_0_0_0px_white]"
              }
            `}
                        ></div>

                        {/* User profile image */}
                        <img
                            src={user.userImage}
                            alt={user.username}
                            className="w-12 h-12 rounded-full border-2 border-neutral-900 object-cover relative z-[2] bg-neutral-900"
                        />
                    </div>

                    {/* Username */}
                    <span className="text-white text-sm font-medium text-center max-w-[60px] truncate">
                        {user.username}
                    </span>
                </div>
            ))}
        </div>
    );
}
export default StoriesBar;
