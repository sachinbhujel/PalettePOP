import React, { useState } from "react";
import ColorCopyMessage from "./ColorCopyMessage";
import ChangeColorSelect from "./ChangeColorSelect";
import ExportColors from "./ExportColors";

function ColorShow({
    primary,
    data,
    isColorCopy,
    setIsColorCopy,
    colorCode,
    setColorCode,
    setExportDivShow,
    setExportColorData,
}) {
    const [color, setColor] = useState("");

    const handleCopyColor = (name, color) => {
        navigator.clipboard.writeText(color);
        setColor(name);

        setIsColorCopy(true);

        setTimeout(() => {
            setIsColorCopy(false);
            setColor("");
        }, 600);
    };

    return (
        <div className="flex flex-col gap-1 mt-8">
            <div className="flex items-center gap-2">
                <ChangeColorSelect
                    setColorCode={setColorCode}
                    primary={primary}
                />
                <ExportColors setExportDivShow={setExportDivShow} />
            </div>
            {data ? (
                <div
                    className="sm:flex grid grid-cols-3"
                    style={{
                        border: primary
                            ? `1px solid ${primary}`
                            : "1px solid black",
                    }}
                >
                    {Object.entries(data).map(([colorName, value]) => {
                        const bgColor = value[colorCode];
                        

                        return (
                            <div
                                className="color flex group cursor-pointer flex-col sm:w-1/6 h-20 relative"
                                key={colorName}
                                onClick={() =>
                                    handleCopyColor(
                                        colorName,
                                        colorCode === "rgb"
                                            ? `rgb(${bgColor})`
                                            : colorCode === "hsl"
                                            ? `hsl(${
                                                  (bgColor[0] * 360)
                                                      .toString()
                                                      .split(".")[0]
                                              }, ${
                                                  (bgColor[1] * 100)
                                                      .toString()
                                                      .split(".")[0]
                                              }%, ${
                                                  (bgColor[2] * 100)
                                                      .toString()
                                                      .split(".")[0]
                                              }%)`
                                            : `${bgColor}`
                                    )
                                }
                            >
                                <div
                                    className="w-full h-full"
                                    style={{
                                        backgroundColor:
                                            colorCode === "rgb"
                                                ? `rgb(${bgColor})`
                                                : colorCode === "hsl"
                                                ? `hsl(${
                                                      (bgColor[0] * 360)
                                                          .toString()
                                                          .split(".")[0]
                                                  }, ${
                                                      (bgColor[1] * 100)
                                                          .toString()
                                                          .split(".")[0]
                                                  }%, ${
                                                      (bgColor[2] * 100)
                                                          .toString()
                                                          .split(".")[0]
                                                  }%)`
                                                : `${bgColor}`,
                                    }}
                                ></div>
                                <div className="w-full flex flex-col items-center gap-2 absolute h-full pt-3">
                                    <div className="cursor-pointer opacity-0 group-hover:opacity-100">
                                        {color === colorName ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{
                                                    color: value.bodyTextColor,
                                                }}
                                                className="lucide lucide-check-icon lucide-check"
                                            >
                                                <path d="M20 6 9 17l-5-5" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                style={{
                                                    color: value.bodyTextColor,
                                                }}
                                                className="lucide lucide-copy-icon lucide-copy"
                                            >
                                                <rect
                                                    width="14"
                                                    height="14"
                                                    x="8"
                                                    y="8"
                                                    rx="2"
                                                    ry="2"
                                                />
                                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                            </svg>
                                        )}
                                    </div>
                                    <p
                                        className={`${
                                            colorCode === "rgb"
                                                ? "sm:text-sm text-xs"
                                                : colorCode === "hsl"
                                                ? "sm:text-sm text-xs"
                                                : "text-sm"
                                        } test text-center`}
                                        style={{ color: value.bodyTextColor }}
                                    >
                                        {colorCode === "rgb"
                                            ? `rgb(${
                                                  bgColor[0]
                                                      .toString()
                                                      .split(".")[0]
                                              }, ${
                                                  bgColor[1]
                                                      .toString()
                                                      .split(".")[0]
                                              }, ${
                                                  bgColor[2]
                                                      .toString()
                                                      .split(".")[0]
                                              })`
                                            : colorCode === "hsl"
                                            ? `hsl(${
                                                  (bgColor[0] * 360)
                                                      .toString()
                                                      .split(".")[0]
                                              }, ${
                                                  (bgColor[1] * 100)
                                                      .toString()
                                                      .split(".")[0]
                                              }%, ${
                                                  (bgColor[2] * 100)
                                                      .toString()
                                                      .split(".")[0]
                                              }%)`
                                            : `${bgColor}`}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <ColorCopyMessage isColorCopy={isColorCopy} />
                </div>
            ) : (
                <div
                    className="sm:flex grid grid-cols-3"
                    style={{
                        border: "1px solid black",
                    }}
                >
                    <div
                        className="flex group cursor-pointer flex-col sm:w-1/6 h-20 relative"
                        onClick={() => handleCopyColor("Color code")}
                    >
                        <div
                            className="w-full h-full border-r-1"
                            style={{
                                backgroundColor: "#ffffffff",
                            }}
                        ></div>
                        <div className="w-full flex flex-col items-center gap-2 absolute h-full pt-3">
                            <div className="cursor-pointer opacity-0 group-hover:opacity-100">
                                {isColorCopy ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-check-icon lucide-check"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-copy-icon lucide-copy"
                                    >
                                        <rect
                                            width="14"
                                            height="14"
                                            x="8"
                                            y="8"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm" style={{ color: "black" }}>
                                Color code
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex group cursor-pointer flex-col sm:w-1/6 h-20 relative"
                        onClick={() => handleCopyColor("Color code")}
                    >
                        <div
                            className="w-full h-full border-r-1"
                            style={{
                                backgroundColor: "#ffffffff",
                            }}
                        ></div>
                        <div className="w-full flex flex-col items-center gap-2 absolute h-full pt-3">
                            <div className="cursor-pointer opacity-0 group-hover:opacity-100">
                                {isColorCopy ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-check-icon lucide-check"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-copy-icon lucide-copy"
                                    >
                                        <rect
                                            width="14"
                                            height="14"
                                            x="8"
                                            y="8"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm" style={{ color: "black" }}>
                                Color code
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex group cursor-pointer flex-col sm:w-1/6 h-20 relative"
                        onClick={() => handleCopyColor("Color code")}
                    >
                        <div
                            className="w-full h-full border-r-1"
                            style={{
                                backgroundColor: "#ffffffff",
                            }}
                        ></div>
                        <div className="w-full flex flex-col items-center gap-2 absolute h-full pt-3">
                            <div className="cursor-pointer opacity-0 group-hover:opacity-100">
                                {isColorCopy ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-check-icon lucide-check"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-copy-icon lucide-copy"
                                    >
                                        <rect
                                            width="14"
                                            height="14"
                                            x="8"
                                            y="8"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm" style={{ color: "black" }}>
                                Color code
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex group cursor-pointer flex-col sm:w-1/6 h-20 relative"
                        onClick={() => handleCopyColor("Color code")}
                    >
                        <div
                            className="w-full h-full border-r-1"
                            style={{
                                backgroundColor: "#ffffffff",
                            }}
                        ></div>
                        <div className="w-full flex flex-col items-center gap-2 absolute h-full pt-3">
                            <div className="cursor-pointer opacity-0 group-hover:opacity-100">
                                {isColorCopy ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-check-icon lucide-check"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-copy-icon lucide-copy"
                                    >
                                        <rect
                                            width="14"
                                            height="14"
                                            x="8"
                                            y="8"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm" style={{ color: "black" }}>
                                Color code
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex group cursor-pointer flex-col sm:w-1/6 h-20 relative"
                        onClick={() => handleCopyColor("Color code")}
                    >
                        <div
                            className="w-full h-full border-r-1"
                            style={{
                                backgroundColor: "#ffffffff",
                            }}
                        ></div>
                        <div className="w-full flex flex-col items-center gap-2 absolute h-full pt-3">
                            <div className="cursor-pointer opacity-0 group-hover:opacity-100">
                                {isColorCopy ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-check-icon lucide-check"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-copy-icon lucide-copy"
                                    >
                                        <rect
                                            width="14"
                                            height="14"
                                            x="8"
                                            y="8"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm" style={{ color: "black" }}>
                                Color code
                            </p>
                        </div>
                    </div>
                    <div
                        className="flex group cursor-pointer flex-col sm:w-1/6 h-20 relative"
                        onClick={() => handleCopyColor("Color code")}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundColor: "#ffffffff",
                            }}
                        ></div>
                        <div className="w-full flex flex-col items-center gap-2 absolute h-full pt-3">
                            <div className="cursor-pointer opacity-0 group-hover:opacity-100">
                                {isColorCopy ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-check-icon lucide-check"
                                    >
                                        <path d="M20 6 9 17l-5-5" />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={{
                                            color: "black",
                                        }}
                                        className="lucide lucide-copy-icon lucide-copy"
                                    >
                                        <rect
                                            width="14"
                                            height="14"
                                            x="8"
                                            y="8"
                                            rx="2"
                                            ry="2"
                                        />
                                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                                    </svg>
                                )}
                            </div>
                            <p className="text-sm" style={{ color: "black" }}>
                                Color code
                            </p>
                        </div>
                    </div>
                    <ColorCopyMessage isColorCopy={isColorCopy} />
                </div>
            )}
        </div>
    );
}

export default ColorShow;
