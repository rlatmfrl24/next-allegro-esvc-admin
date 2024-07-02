"use client";

import { HTMLAttributes, useEffect, useRef, useState } from "react";

export default function SimpleHuePicker({
  onColorChange,
  className,
  ...props
}: {
  onColorChange?: (color: string) => void;
  className?: string;
} & HTMLAttributes<HTMLDivElement>) {
  // make input slider using div tag

  const sliderRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<HTMLDivElement>(null);

  // make backgroud color with gradient color from
  const backgroundColor =
    "linear-gradient(90deg, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)";

  const [position, setPosition] = useState(0);

  const handleMouseMove = (e: MouseEvent) => {
    const newPosition = calculatePosition(e.clientX);
    setPosition(newPosition);
  };

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const calculatePosition = (clientX: number) => {
    if (!sliderRef.current) {
      return 0;
    }

    const rect = sliderRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    if (position < 1) {
      return 1;
    } else if (position > 99) {
      return 99;
    } else {
      return position;
    }
  };

  const getColorHueFromPosition = (position: number) => {
    // convert position to hue value
    return (position / 98) * 360;
  };

  useEffect(() => {
    // convert position to hue value
    const hue = getColorHueFromPosition(position);
    const hexCode = hueToHex(hue);
    // console.log(hexCode);
    if (onColorChange) {
      onColorChange(hexCode);
    }
  }, [onColorChange, position]);

  return (
    <div
      {...props}
      ref={sliderRef}
      className={`w-full h-4 rounded-lg relative ${className}`}
      style={{ background: backgroundColor }}
    >
      <div
        ref={pointerRef}
        className="absolute w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center cursor-pointer"
        style={{
          left: `${position}%`,
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        onMouseDown={handleMouseDown}
      >
        <div
          className="w-6 h-6 rounded-full"
          style={{
            background: `hsl(${getColorHueFromPosition(position)}, 100%, 50%)`,
          }}
        ></div>
      </div>
    </div>
  );
}

function hueToHex(h: number) {
  // Normalize hue value to 0-360 range
  h = (h + 360) % 360;

  // Convert hue to RGB
  let r, g, b;
  if (h >= 0 && h < 60) {
    r = 1;
    g = h / 60;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = (120 - h) / 60;
    g = 1;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = 1;
    b = (h - 120) / 60;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = (240 - h) / 60;
    b = 1;
  } else if (h >= 240 && h < 300) {
    r = (h - 240) / 60;
    g = 0;
    b = 1;
  } else {
    r = 1;
    g = 0;
    b = (360 - h) / 60;
  }

  // Normalize RGB values to 0-1 range
  r = Math.min(1, r);
  g = Math.min(1, g);
  b = Math.min(1, b);

  // Convert RGB to hex
  const rgb = [r, g, b].map((component) => {
    const hex = Math.round(component * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  });

  return "#" + rgb.join("");
}
