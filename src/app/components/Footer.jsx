import React from "react";

function Footer({ primary }) {
    return (
        <div className="mt-4">
            <p className="text-sm text-center">
                Made with ❤️ by{" "}
                <a
                    href="https://github.com/sachinbhujel"
                    style={{ color: primary }}
                    target="_blank"
                    className="font-semibold underline"
                >
                    Sachin Bhujel
                </a>
            </p>
        </div>
    );
}

export default Footer;
