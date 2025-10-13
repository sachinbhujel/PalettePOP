import React from "react";

function ChangeColorSelect({ setColorCode, primary }) {
    const handleCodeChange = (value) => {
        setColorCode(value);
    };

    return (
        <div
            className="w-max pr-2 rounded-md"
            style={{
                border: primary ? `1px solid ${primary}` : "1px solid black",
            }}
        >
            <select
                id="colorCode"
                name="colorCode"
                className="rounded-md px-2 w-[100%] py-1 text-sm focus:outline-none focus:ring-0"
                onChange={(e) => handleCodeChange(e.target.value)}
            >
                <option value="hex">HEX</option>
                <option value="rgb">RGB</option>
                <option value="hsl">HSL</option>
            </select>
        </div>
    );
}

export default ChangeColorSelect;
