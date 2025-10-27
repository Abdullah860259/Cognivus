import React from "react";

const DifficultyIndicator = ({ level }) => {
    const getColor = (lvl) => {
        switch (lvl) {
            case "Easy":
                return "bg-green-100 text-green-700 border-green-400";
            case "Medium":
                return "bg-yellow-100 text-yellow-700 border-yellow-400";
            case "Hard":
                return "bg-red-100 text-red-700 border-red-400";
            default:
                return "bg-gray-100 text-gray-700 border-gray-400";
        }
    };

    return (
        <span
            className={`px-3 py-1 text-sm font-semibold rounded-full border ${getColor(
                level
            )}`}
        >
            {level}
        </span>
    );
};

export default DifficultyIndicator;
