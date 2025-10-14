import React from "react";

function ExportColors({ setExportDivShow }) {
    const handleExport = () => {
        setExportDivShow(true);
    };

    return (
        <div
            className="w-max p-1 rounded-md border cursor-pointer"
            onClick={handleExport}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-download-icon lucide-download"
            >
                <path d="M12 15V3" />
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <path d="m7 10 5 5 5-5" />
            </svg>
        </div>
    );
}

export default ExportColors;
