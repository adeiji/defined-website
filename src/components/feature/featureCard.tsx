import React from "react";

const FeatureCard = (props: {
    icon: any,
    title: string,
    description: string
}) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm h-full">
            <div className="flex items-center mb-2">
                {props.icon}
            </div>
            <h2 className="font-bold text-base" style={{ color: "#074a5a" }}>{props.title}</h2>
            <p className="text-gray-500 text-sm mt-1">
                {props.description}
            </p>
        </div>
    );
};

export default FeatureCard;