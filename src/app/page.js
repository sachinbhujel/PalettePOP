"use client";
import { Vibrant } from "node-vibrant/browser";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { demoImage } from "@/data/data";
import { SpeedInsights } from "@vercel/speed-insights/next";

import * as htmlToImage from "html-to-image";
import React, { useEffect, useState } from "react";
import ColorShow from "./components/ColorShow";
import Footer from "./components/Footer";

export default function Home() {
    const [preview, setPreview] = useState(null);
    const [colorData, setColorData] = useState({
        primary: null,
        background: null,
        text: null,
        primaryText: null,
    });
    const [exportColorData, setExportColorData] = useState({
        vibrant: `"Select"`,
        muted: `"Select"`,
        lightVibrant: `"Select"`,
        lightMuted: `"Select"`,
        darkVibrant: `"Select"`,
        darkMuted: `"Select"`,
    });
    const [data, setData] = useState(null);

    const [startingImage, setStartingImage] = useState(2);
    const [demoNum, setDemoNum] = useState(0);
    const [isColorCopy, setIsColorCopy] = useState(false);
    const [colorCode, setColorCode] = useState("hex");
    const [exportDivShow, setExportDivShow] = useState(false);
    const [active, setActive] = useState("css");
    const [activeCode, setActiveCode] = useState("");
    const [hexShow, setHexShow] = useState(false);
    const [exportCopy, setExportCopy] = useState(false);

    useEffect(() => {
        const image = `/${demoImage[startingImage]}.jpg`;
        Vibrant.from(image)
            .getPalette()
            .then((palette) => {
                setData(palette);
            });
    }, [startingImage]);

    useEffect(() => {
        if (data) {
            setExportColorData({
                vibrant: data.Vibrant.hex,
                muted: data.Muted.hex,
                lightVibrant: data.LightVibrant.hex,
                lightMuted: data.LightMuted.hex,
                darkVibrant: data.DarkVibrant.hex,
                darkMuted: data.DarkMuted.hex,
            });
        }
    }, [data]);

    if (demoNum >= demoImage.length) {
        setDemoNum((prev) => prev * 0);
    }
    const handleDemoImage = () => {
        const image = `/${demoImage[demoNum]}.jpg`;
        Vibrant.from(image)
            .getPalette()
            .then((palette) => {
                setColorData({
                    primary: palette.DarkMuted.hex,
                    background: palette.LightVibrant.hex,
                    text: palette.DarkVibrant.hex,
                });
                setData(palette);
            });

        setPreview(image);
        setStartingImage(demoNum);
        setDemoNum((prev) => prev + 1);
    };

    const handleFile = async (event) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const imageUrl = URL.createObjectURL(file);

            Vibrant.from(imageUrl)
                .getPalette()
                .then((palette) => {
                    setColorData({
                        primary: palette.DarkMuted.hex,
                        background: palette.LightVibrant.hex,
                        text: palette.DarkVibrant.hex,
                    });
                    setData(palette);
                });

            setPreview(imageUrl);
        } else {
            setPreview(null);
        }
    };

    const handleExportData = (exportCode) => {
        setHexShow(true);
        setActiveCode(exportCode);
        if (exportCode === "hex") {
            setExportColorData({
                vibrant: data.Vibrant.hex,
                muted: data.Muted.hex,
                lightVibrant: data.LightVibrant.hex,
                lightMuted: data.LightMuted.hex,
                darkVibrant: data.DarkVibrant.hex,
                darkMuted: data.DarkMuted.hex,
            });
        } else if (exportCode === "rgb") {
            setExportColorData({
                vibrant: `rgb(${
                    data.Vibrant.rgb[0].toString().split(".")[0]
                }, ${data.Vibrant.rgb[1].toString().split(".")[0]}, ${
                    data.Vibrant.rgb[2].toString().split(".")[0]
                })`,
                muted: `rgb(${data.Muted.rgb[0].toString().split(".")[0]}, ${
                    data.Muted.rgb[1].toString().split(".")[0]
                }, ${data.Muted.rgb[2].toString().split(".")[0]})`,
                lightVibrant: `rgb(${
                    data.LightVibrant.rgb[0].toString().split(".")[0]
                }, ${data.LightVibrant.rgb[1].toString().split(".")[0]}, ${
                    data.LightVibrant.rgb[2].toString().split(".")[0]
                })`,
                lightMuted: `rgb(${
                    data.LightMuted.rgb[0].toString().split(".")[0]
                }, ${data.LightMuted.rgb[1].toString().split(".")[0]}, ${
                    data.LightMuted.rgb[2].toString().split(".")[0]
                })`,
                darkVibrant: `rgb(${
                    data.DarkVibrant.rgb[0].toString().split(".")[0]
                }, ${data.DarkVibrant.rgb[1].toString().split(".")[0]}, ${
                    data.DarkVibrant.rgb[2].toString().split(".")[0]
                })`,
                darkMuted: `rgb(${
                    data.DarkMuted.rgb[0].toString().split(".")[0]
                }, ${data.DarkMuted.rgb[1].toString().split(".")[0]}, ${
                    data.DarkMuted.rgb[2].toString().split(".")[0]
                })`,
            });
        } else {
            setExportColorData({
                vibrant: `hsl(${
                    (data.Vibrant.hsl[0] * 360).toString().split(".")[0]
                }, ${(data.Vibrant.hsl[1] * 100).toString().split(".")[0]}%, ${
                    (data.Vibrant.hsl[2] * 100).toString().split(".")[0]
                }%)`,
                muted: `hsl(${
                    (data.Muted.hsl[0] * 360).toString().split(".")[0]
                }, ${(data.Muted.hsl[1] * 100).toString().split(".")[0]}%, ${
                    (data.Muted.hsl[2] * 100).toString().split(".")[0]
                }%)`,
                lightVibrant: `hsl(${
                    (data.LightVibrant.hsl[0] * 360).toString().split(".")[0]
                }, ${
                    (data.LightVibrant.hsl[1] * 100).toString().split(".")[0]
                }%, ${
                    (data.LightVibrant.hsl[2] * 100).toString().split(".")[0]
                }%)`,
                lightMuted: `hsl(${
                    (data.LightMuted.hsl[0] * 360).toString().split(".")[0]
                }, ${
                    (data.LightMuted.hsl[1] * 100).toString().split(".")[0]
                }%, ${
                    (data.LightMuted.hsl[2] * 100).toString().split(".")[0]
                }%)`,
                darkVibrant: `hsl(${
                    (data.DarkVibrant.hsl[0] * 360).toString().split(".")[0]
                }, ${
                    (data.DarkVibrant.hsl[1] * 100).toString().split(".")[0]
                }%, ${
                    (data.DarkVibrant.hsl[2] * 100).toString().split(".")[0]
                }%)`,
                darkMuted: `hsl(${
                    (data.DarkMuted.hsl[0] * 360).toString().split(".")[0]
                }, ${
                    (data.DarkMuted.hsl[1] * 100).toString().split(".")[0]
                }%, ${
                    (data.DarkMuted.hsl[2] * 100).toString().split(".")[0]
                }%)`,
            });
        }
    };

    const handleCopyData = (exportData) => {
        setExportCopy(true);

        setTimeout(() => {
            setExportCopy(false);
        }, 600);

        if (active === "css") {
            const formattedData = Object.entries(exportData)
                .map(([key, value]) => `--${key}: ${value};`)
                .join("\n");

            navigator.clipboard
                .writeText(formattedData)
                .then(() => {
                    console.log("JSON data copied to clipboard successfully!");
                })
                .catch((err) => {
                    console.error(
                        "Failed to copy JSON data to clipboard:",
                        err
                    );
                });
        } else if (active === "tailwind") {
            const formattedData = Object.entries(exportData)
                .map(([key, value]) => `--${key}: ${value};`)
                .join("\n");

            navigator.clipboard
                .writeText(`colors: { \n ${formattedData} \n}`)
                .then(() => {
                    console.log("JSON data copied to clipboard successfully!");
                })
                .catch((err) => {
                    console.error(
                        "Failed to copy JSON data to clipboard:",
                        err
                    );
                });
        }
    };

    const handleDownload = () => {
        console.log("hi");
        const node = document.getElementById("export-color-data");
        htmlToImage.toPng(node).then((dataUrl) => {
            var link = document.createElement("a");
            link.download = "palette.png";
            link.href = dataUrl;
            link.click();
        });
    };

    return (
        <div
            className={`min-h-screen m-auto p-4 relative`}
            style={{
                backgroundColor: exportDivShow
                    ? "#00000066"
                    : colorData.background,
            }}
        >
            <Navbar primary={colorData.primary} />
            <div className="mt-10 flex sm:flex-row flex-col p-2 gap-4 items-center justify-center">
                <div className="sm:w-[50%] flex flex-col gap-4">
                    <h2
                        className="font-bold text-3xl"
                        style={{ color: colorData.primary }}
                    >
                        Extract beautiful palettes from your photos.
                    </h2>
                    <p style={{ color: colorData.text }}>
                        {" "}
                        Want a color scheme that perfectly matches your favorite
                        images? Simply upload a photo, and we’ll use the hues in
                        the photo to create your palette.
                    </p>
                    <div className="flex items-center gap-4">
                        <div className="flex justify-center">
                            <label
                                className="px-5 cursor-pointer py-2 rounded-md bg-[#5e00ff] text-sm text-white"
                                style={{
                                    backgroundColor: colorData.primary,
                                    color: colorData.primaryText,
                                }}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFile}
                                    className="hidden"
                                />
                                Upload Image
                            </label>
                        </div>
                        <div onClick={handleDemoImage}>
                            <button
                                className="border rounded-md text-sm cursor-pointer p-2"
                                style={{
                                    color: colorData.text,
                                    border: `1px solid ${colorData.primary}`,
                                }}
                            >
                                Try demo image
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    className="h-70 sm:w-[50%] w-[100%] border-2 p-2 rounded-md"
                    style={{ borderColor: colorData.primary }}
                >
                    {preview ? (
                        <div className="h-full w-full relative">
                            <Image
                                src={preview}
                                fill
                                alt="Description of the image"
                                className="rounded-md object-cover"
                            />
                        </div>
                    ) : (
                        <div className="h-full w-full relative">
                            <Image
                                src={`/${demoImage[startingImage]}.jpg`}
                                fill
                                alt="demo-image"
                                className="rounded-md object-cover"
                                priority
                            />
                        </div>
                    )}
                </div>
            </div>
            <ColorShow
                setExportDivShow={setExportDivShow}
                primary={colorData.primary}
                data={data}
                isColorCopy={isColorCopy}
                setIsColorCopy={setIsColorCopy}
                colorCode={colorCode}
                setColorCode={setColorCode}
            />
            <Footer primary={colorData.primary} />
            <SpeedInsights />
            {exportDivShow && (
                <>
                    {active === "css" && (
                        <div className="rounded-md bg-white shadow-lg p-4 flex flex-col gap-2 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[50%] w-[90%]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 sm:text-lg text-base font-semibold">
                                    <p
                                        className={`cursor-pointer ${
                                            active === "css"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("css")}
                                    >
                                        CSS
                                    </p>
                                    <p
                                        className={`cursor-pointer ${
                                            active === "tailwind"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("tailwind")}
                                    >
                                        Tailwind CSS
                                    </p>
                                    <p
                                        className={`cursor-pointer ${
                                            active === "png"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("png")}
                                    >
                                        PNG
                                    </p>
                                </div>
                                <div
                                    className="border rounded-md p-1 cursor-pointer"
                                    onClick={() => setExportDivShow(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-x-icon lucide-x"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </div>
                            </div>
                            <hr />
                            <div className="flex items-center mt-2 gap-4 text-sm">
                                {hexShow ? (
                                    <p
                                        onClick={() => handleExportData("hex")}
                                        className={`border px-4 py-1 rounded-lg cursor-pointer ${
                                            activeCode === "hex"
                                                ? "bg-black text-white"
                                                : ""
                                        }`}
                                    >
                                        Hex
                                    </p>
                                ) : (
                                    <p
                                        onClick={() => handleExportData("hex")}
                                        className={`border px-4 py-1 rounded-lg cursor-pointer bg-black text-white`}
                                    >
                                        Hex
                                    </p>
                                )}
                                <p
                                    onClick={() => handleExportData("rgb")}
                                    className={`border px-4 py-1 rounded-lg cursor-pointer ${
                                        activeCode === "rgb"
                                            ? "bg-black text-white"
                                            : ""
                                    }`}
                                >
                                    Rgb
                                </p>
                                <p
                                    onClick={() => handleExportData("hsl")}
                                    className={`border px-4 py-1 rounded-lg cursor-pointer ${
                                        activeCode === "hsl"
                                            ? "bg-black text-white"
                                            : ""
                                    }`}
                                >
                                    Hsl
                                </p>
                            </div>
                            <div className="flex flex-col mt-4 gap-1">
                                <div className="flex flex-col border p-2 gap-2 bg-gray-200 relative">
                                    {Object.entries(exportColorData).map(
                                        ([data, code]) => (
                                            <div
                                                key={data}
                                                className="flex text-lg items-center gap-2"
                                            >
                                                <h2 className="font-semibold">
                                                    --{data}:
                                                </h2>
                                                <h2>{code};</h2>
                                            </div>
                                        )
                                    )}
                                    <div className="w-full flex justify-end absolute top-2 right-2">
                                        <div
                                            className="w-max cursor-pointer"
                                            onClick={() =>
                                                handleCopyData(exportColorData)
                                            }
                                        >
                                            {exportCopy ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
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
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {active === "tailwind" && (
                        <div className="rounded-md bg-white shadow-lg p-4 flex flex-col gap-2 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[50%] w-[90%]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 sm:text-lg text-base font-semibold">
                                    <p
                                        className={`cursor-pointer ${
                                            active === "css"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("css")}
                                    >
                                        CSS
                                    </p>
                                    <p
                                        className={`cursor-pointer ${
                                            active === "tailwind"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("tailwind")}
                                    >
                                        Tailwind CSS
                                    </p>
                                    <p
                                        className={`cursor-pointer ${
                                            active === "png"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("png")}
                                    >
                                        PNG
                                    </p>
                                </div>
                                <div
                                    className="border rounded-md p-1 cursor-pointer"
                                    onClick={() => setExportDivShow(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-x-icon lucide-x"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </div>
                            </div>
                            <hr />
                            <div className="flex items-center mt-2 gap-4 text-sm">
                                {hexShow ? (
                                    <p
                                        onClick={() => handleExportData("hex")}
                                        className={`border px-4 py-1 rounded-lg cursor-pointer ${
                                            activeCode === "hex"
                                                ? "bg-black text-white"
                                                : ""
                                        }`}
                                    >
                                        Hex
                                    </p>
                                ) : (
                                    <p
                                        onClick={() => handleExportData("hex")}
                                        className={`border px-4 py-1 rounded-lg cursor-pointer bg-black text-white`}
                                    >
                                        Hex
                                    </p>
                                )}
                                <p
                                    onClick={() => handleExportData("rgb")}
                                    className={`border px-4 py-1 rounded-lg cursor-pointer ${
                                        activeCode === "rgb"
                                            ? "bg-black text-white"
                                            : ""
                                    }`}
                                >
                                    Rgb
                                </p>
                                <p
                                    onClick={() => handleExportData("hsl")}
                                    className={`border px-4 py-1 rounded-lg cursor-pointer ${
                                        activeCode === "hsl"
                                            ? "bg-black text-white"
                                            : ""
                                    }`}
                                >
                                    Hsl
                                </p>
                            </div>
                            <div className="flex flex-col mt-4 gap-1">
                                <div className="flex flex-col border p-2 gap-2 bg-gray-200 relative">
                                    <div className="text-lg font-semibold">
                                        colors: {`{`}
                                    </div>
                                    {Object.entries(exportColorData).map(
                                        ([data, code]) => (
                                            <div
                                                key={data}
                                                className="flex text-lg items-center gap-2"
                                            >
                                                <h2 className="font-semibold">
                                                    --{data}:
                                                </h2>
                                                <h2>{code};</h2>
                                            </div>
                                        )
                                    )}
                                    <div className="text-lg font-semibold">{`}`}</div>
                                    <div className="w-full flex justify-end absolute top-2 right-2">
                                        <div
                                            className="w-max cursor-pointer"
                                            onClick={() =>
                                                handleCopyData(exportColorData)
                                            }
                                        >
                                            {exportCopy ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
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
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {active === "png" && (
                        <div className="rounded-md bg-white shadow-lg p-4 flex flex-col gap-2 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[50%] w-[90%]">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 sm:text-lg text-base font-semibold">
                                    <p
                                        className={`cursor-pointer ${
                                            active === "css"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("css")}
                                    >
                                        CSS
                                    </p>
                                    <p
                                        className={`cursor-pointer ${
                                            active === "tailwind"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("tailwind")}
                                    >
                                        Tailwind CSS
                                    </p>
                                    <p
                                        className={`cursor-pointer ${
                                            active === "png"
                                                ? "border-b-2 border-blue-500"
                                                : ""
                                        }`}
                                        onClick={() => setActive("png")}
                                    >
                                        PNG
                                    </p>
                                </div>
                                <div
                                    className="border rounded-md p-1 cursor-pointer"
                                    onClick={() => setExportDivShow(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-x-icon lucide-x"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </div>
                            </div>
                            <hr />
                            <div
                                className="flex flex-col mt-4 gap-1"
                                id="export-color-data"
                            >
                                <div className="flex flex-wrap h-60">
                                    {Object.entries(data).map(
                                        ([colorName, value]) => {
                                            const bgColor = value[colorCode];

                                            return (
                                                <div
                                                    className="cursor-pointer w-1/3 sm:w-1/6 h-30 sm:h-full relative"
                                                    key={colorName}
                                                >
                                                    <div
                                                        className="w-full h-full"
                                                        style={{
                                                            backgroundColor: `${bgColor}`,
                                                        }}
                                                    ></div>
                                                    <div className="w-full h-max absolute top-12">
                                                        <p
                                                            className="text-sm text-center"
                                                            style={{
                                                                color: value.bodyTextColor,
                                                            }}
                                                        >
                                                            {bgColor}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                            <div
                                className="border px-4 py-1 mt-2 rounded-lg cursor-pointer w-max hover:bg-black hover:text-white"
                                onClick={handleDownload}
                            >
                                <p>Download</p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
