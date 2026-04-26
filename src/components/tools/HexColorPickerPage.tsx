import React, { useState, useEffect, useCallback } from 'react';
import type { FAQItem } from '../../hooks/useSEO'
import type { RelatedTool } from '../../lib/types';

// Helper function to convert HEX to RGB
const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

// Helper function to convert RGB to HSL
const rgbToHsl = (r: number, g: number, b: number) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const HexColorPickerPage: React.FC = () => {
  const [hexColor, setHexColor] = useState<string>('#1B6B45'); // Default to forest green
  const [rgbColor, setRgbColor] = useState<string>('');
  const [hslColor, setHslColor] = useState<string>('');

  const updateColors = useCallback((hex: string) => {
    setHexColor(hex);
    const rgb = hexToRgb(hex);
    if (rgb) {
      setRgbColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHslColor(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`);
    } else {
      setRgbColor('Invalid Color');
      setHslColor('Invalid Color');
    }
  }, []);

  useEffect(() => {
    updateColors(hexColor);
  }, [hexColor, updateColors]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    if (newHex.match(/^#([0-9A-Fa-f]{3}){1,2}$/)) {
      updateColors(newHex);
    } else if (newHex === '' || newHex === '#') {
      setHexColor(newHex);
      setRgbColor('');
      setHslColor('');
    } else {
      setHexColor(newHex); // Allow typing, but don't update conversions until valid
    }
  };

  const handleColorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateColors(e.target.value);
  };

  const faqs: FAQItem[] = [
    {
      question: 'What is a Hex Color Picker?',
      answer: 'A Hex Color Picker is a tool that allows users to select a color visually and obtain its hexadecimal (HEX) code, along with its equivalent RGB (Red, Green, Blue) and HSL (Hue, Saturation, Lightness) values. These color codes are essential for web design, graphic design, and digital art to ensure consistent color representation across different platforms and devices.',
    },
    {
      question: 'How do HEX, RGB, and HSL differ?',
      answer: 'HEX (Hexadecimal) is a six-digit alphanumeric code representing color in web development, like #RRGGBB. RGB (Red, Green, Blue) defines color by combining varying intensities of red, green, and blue light, typically with values from 0 to 255 for each. HSL (Hue, Saturation, Lightness) describes color based on its hue (the color itself), saturation (intensity), and lightness (brightness), making it more intuitive for human perception.',
    },
    {
      question: 'Why are different color formats important?',
      answer: 'Different color formats are important because they serve various purposes and are used in different contexts. HEX is standard for web design, RGB is common in digital displays and image editing, while HSL is often preferred by designers for its intuitive approach to color manipulation. Understanding and converting between these formats ensures flexibility and accuracy in color reproduction across diverse media.',
    },
    {
      question: 'Can I use this tool to find complementary colors?',
      answer: 'While this Hex Color Picker primarily provides the HEX, RGB, and HSL values for a selected color, you can use the HSL values to help identify complementary colors. A complementary color is typically found by rotating the hue (H) by 180 degrees. For example, if your current hue is 60, its complement would be 240. You would then input this new hue value into a separate color theory tool or manually adjust to find the exact complementary color.',
    },
    {
      question: 'Is the color selection accurate across all screens?',
      answer: 'The accuracy of color selection can vary across different screens and devices due to variations in display calibration, color profiles, and ambient lighting conditions. While this tool provides precise digital color codes, the visual representation on your screen might differ slightly from another. For critical color matching, it is recommended to use calibrated monitors and consider professional color management practices.',
    },
  ];

  const relatedTools: RelatedTool[] = [
    {
      title: 'Color Converter',
      slug: '/color-converter',
      emoji: '🎨',
    },
    {
      title: 'Hex to RGB',
      slug: '/hex-to-rgb',
      emoji: '🔢',
    },
    {
      title: 'CSS Animation Generator',
      slug: '/css-animation-generator',
      emoji: '✨',
    },
  ];

  return (
    <div className="tool-widget-content">
      <div className="flex flex-col items-center justify-center p-4 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <label htmlFor="color-input" className="text-lg font-medium text-gray-700">Choose your color:</label>
          <input
            type="color"
            id="color-input"
            value={hexColor}
            onChange={handleColorInputChange}
            className="w-32 h-32 rounded-full border-4 border-gray-300 cursor-pointer shadow-lg"
            style={{ backgroundColor: hexColor }}
          />
        </div>

        <div className="w-full max-w-md space-y-4">
          <div className="flex flex-col">
            <label htmlFor="hex-value" className="text-sm font-medium text-gray-600">HEX Value:</label>
            <input
              type="text"
              id="hex-value"
              value={hexColor}
              onChange={handleHexChange}
              className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-700 focus:border-transparent transition-all duration-200 text-gray-800 font-mono"
              placeholder="#RRGGBB"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rgb-value" className="text-sm font-medium text-gray-600">RGB Value:</label>
            <input
              type="text"
              id="rgb-value"
              value={rgbColor}
              readOnly
              className="p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-mono cursor-not-allowed"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="hsl-value" className="text-sm font-medium text-gray-600">HSL Value:</label>
            <input
              type="text"
              id="hsl-value"
              value={hslColor}
              readOnly
              className="p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-700 font-mono cursor-not-allowed"
            />
          </div>
        </div>

        <div
          className="w-48 h-24 rounded-lg shadow-inner flex items-center justify-center border border-gray-200"
          style={{ backgroundColor: hexColor }}
        >
          <span className="text-white text-xl font-bold drop-shadow-md"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            Preview
          </span>
        </div>
      </div>
    </div>
  );
};

export default HexColorPickerPage;