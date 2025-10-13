import React from "react";

function ColorCopyMessage({ isColorCopy }) {
    return (
        <div>
            {isColorCopy && (
                <div className="absolute left-1/2 -translate-x-1/2 z-100 bg-black sm:mt-5 -mt-25 text-white flex items-center justify-center gap-3 p-4 rounded-full animate-bounce w-65">
                    <div className="p-0.5 bg-white text-black rounded-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-check-icon lucide-check"
                        >
                            <path d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <p className="text-sm font-semibold">
                        Color copied to the clipboard!
                    </p>
                </div>
            )}
        </div>
    );
}

export default ColorCopyMessage;
