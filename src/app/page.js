"use client";
import { Vibrant } from "node-vibrant/browser";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { demoImage } from "@/data/data";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

    const [startingImage, setStartingImage] = useState(() =>
        Math.floor(Math.random() * demoImage.length)
    );
    const [demoNum, setDemoNum] = useState(0);
    const [isColorCopy, setIsColorCopy] = useState(false);
    const [colorCode, setColorCode] = useState("hex");
    const [exportDivShow, setExportDivShow] = useState(false);
    const [active, setActive] = useState("css");

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * demoImage.length);
        const image = `/${demoImage[randomNumber]}.jpg`;

        Vibrant.from(image)
            .getPalette()
            .then((palette) => {
                setData(palette);
            });
        setStartingImage(randomNumber);
    }, []);

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
                setExportColorData={setExportColorData}
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
                <div className="rounded-md bg-white shadow-lg p-4 flex flex-col gap-2 absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[50%] w-[90%]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-lg font-semibold">
                            <p
                                className={`cursor-pointer border p-1 px-3 rounded-md ${
                                    active === "css"
                                        ? "bg-blue-500 text-white shadow-md scale-105"
                                        : ""
                                }`}
                                onClick={() => setActive("css")}
                            >
                                CSS
                            </p>
                            <p
                                className={`cursor-pointer border p-1 px-3 rounded-md ${
                                    active === "tailwind"
                                        ? "bg-blue-500 text-white shadow-md scale-105"
                                        : ""
                                }`}
                                onClick={() => setActive("tailwind")}
                            >
                                Tailwind CSS
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
                    <div className="flex items-center mt-2 gap-4">
                        <p
                            onClick={() => handleExportData("hex")}
                            className="border px-4 py-0.5 rounded-lg cursor-pointer"
                        >
                            Hex
                        </p>
                        <p
                            onClick={() => handleExportData("rgb")}
                            className="border px-4 py-0.5 rounded-lg cursor-pointer"
                        >
                            Rgb
                        </p>
                        <p
                            onClick={() => handleExportData("hsl")}
                            className="border px-4 rounded-lg py-0.5 cursor-pointer"
                        >
                            Hsl
                        </p>
                    </div>
                    <div className="flex flex-col border p-2 gap-2 mt-4 bg-gray-200">
                        {Object.entries(exportColorData).map(([data, code]) => (
                            <div
                                key={data}
                                className="flex text-lg items-center gap-2"
                            >
                                <h2 className="font-semibold">--{data}:</h2>
                                <h2>{code}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
