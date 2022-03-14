import React from "react";

export const IconArrowDown = ({
  height = "16px",
  width = "16px",
  color = "currentColor",
}: React.SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 16 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8 9.38L16 1.38L15.24 0.620005L8 7.86L0.760001 0.620003L6.99382e-07 1.38L8 9.38Z"
      fill={color}
    />
  </svg>
);