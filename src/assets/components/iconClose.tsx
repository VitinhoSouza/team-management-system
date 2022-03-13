import React from "react";

export const IconClose = ({
    height = "16px",
    width = "16px",
    color = "black",
}: React.SVGProps<SVGElement>) : JSX.Element => (
    <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0.824L15.176 0L7.976 7.2L0.824 0.0469999L0 0.871L7.153 8.024L0.0470002 15.129L0.871 15.953L7.977 8.847L15.13 16L15.954 15.176L8.8 8.024L16 0.824Z"
            fill={color}/>
    </svg>
)