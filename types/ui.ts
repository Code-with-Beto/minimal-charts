import { Color } from "@/constants/TWPalette";

// Shared UI component types
export type UISize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type UIRadius =
  | "none"
  | "xxs"
  | "xs"
  | "sm"
  | "md"
  | "default"
  | "lg"
  | "xl"
  | "full";

export type UIColor =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "black"
  | "white";

// Shared radius values mapping
export const RADIUS_VALUES: Record<UIRadius, number> = {
  none: 0,
  xxs: 4,
  xs: 6,
  sm: 8,
  md: 12,
  default: 14,
  lg: 16,
  xl: 20,
  full: 32,
};

// Shared color configuration interface
export interface ColorConfig {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  borderWidth: number;
}

// Extended color configuration for Input components (includes placeholder)
export interface InputColorConfig extends ColorConfig {
  placeholderColor: string;
}

// Shared utility function to get color values
export const getColorValue = (color: UIColor, shade: number = 500): string => {
  if (color === "black") {
    return (
      Color.grayscale[shade as keyof typeof Color.grayscale] ||
      Color.grayscale[500]
    );
  }
  if (color === "white") {
    return (
      Color.grayscale[shade as keyof typeof Color.grayscale] ||
      Color.grayscale[500]
    );
  }

  const colorObj = Color[color] as any;
  return colorObj[shade] || colorObj[500] || colorObj.DEFAULT;
};
