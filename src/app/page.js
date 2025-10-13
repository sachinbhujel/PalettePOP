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
    const [data, setData] = useState(null);

    const [startingImage, setStartingImage] = useState(() =>
        Math.floor(Math.random() * demoImage.length)
    );
    const [demoNum, setDemoNum] = useState(0);
    const [isColorCopy, setIsColorCopy] = useState(false);
    const [colorCode, setColorCode] = useState("hex");

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

    return (
        <div
            className="min-h-screen m-auto p-4"
            style={{ backgroundColor: colorData.background }}
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
                primary={colorData.primary}
                data={data}
                isColorCopy={isColorCopy}
                setIsColorCopy={setIsColorCopy}
                colorCode={colorCode}
                setColorCode={setColorCode}
            />
            <Footer primary={colorData.primary} />
            <SpeedInsights />
        </div>
    );
}
