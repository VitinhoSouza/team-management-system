import React from "react";

export const IconDelete = ({
    height = "16px",
    width = "16px",
    color = "black",
}: React.SVGProps<SVGElement>) : JSX.Element => (
    <svg enableBackground="new 0 0 91 91" height={height} width={width} id="Layer_1" version="1.1" viewBox="0 0 91 91" 
       /*  xml:space="preserve" */ xmlns="http://www.w3.org/2000/svg" /* xmlns:xlink="http://www.w3.org/1999/xlink" */>
            <g>
                <path fill={color} d="M67.305,36.442v-8.055c0-0.939-0.762-1.701-1.7-1.701H54.342v-5.524c0-0.938-0.761-1.7-1.699-1.7h-12.75   c-0.939,0-1.701,0.762-1.701,1.7v5.524H26.93c-0.939,0-1.7,0.762-1.7,1.701v8.055c0,0.938,0.761,1.699,1.7,1.699h0.488v34.021   c0,0.938,0.761,1.7,1.699,1.7h29.481c3.595,0,6.52-2.924,6.52-6.518V38.142h0.486C66.543,38.142,67.305,37.381,67.305,36.442z    M41.592,22.862h9.35v3.824h-9.35V22.862z M61.719,67.345c0,1.719-1.4,3.117-3.12,3.117h-27.78v-32.32l30.9,0.002V67.345z    M63.904,34.742H28.629v-4.655h11.264h12.75h11.262V34.742z"/>
                <rect height="19.975" width="3.4" x="36.066" y="44.962" fill={color} />
                <rect height="19.975" width="3.4" x="44.566" y="44.962" fill={color} />
                <rect height="19.975" width="3.4" x="53.066" y="44.962" fill={color} />
            </g>
    </svg>
)