import {
  Text as RNText,
  StyleSheet,
  type TextProps as RNTextProps,
} from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type TextProps = RNTextProps & {
  lightColor?: string;
  darkColor?: string;
  /**
   * Text size variants inspired by TailwindCSS.
   * "default" and "base" are aliases for the same size (16 / 24).
   */
  type?:
    | "default"
    | "base"
    | "xs"
    | "sm"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link"
    | "body"
    | "caption";
  weight?:
    | "ultralight"
    | "thin"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "heavy"
    | "black";
};

export function Text({
  style,
  lightColor,
  darkColor,
  type = "default",
  weight,
  ...rest
}: TextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  const sizeStyle = sizeStyles[type];
  const weightStyle = weight ? weightStyles[weight] : undefined;

  return (
    <RNText style={[{ color }, sizeStyle, weightStyle, style]} {...rest} />
  );
}

const sizeStyles = StyleSheet.create({
  default: { fontSize: 16, lineHeight: 24 },
  base: { fontSize: 16, lineHeight: 24 },
  xs: { fontSize: 12, lineHeight: 16 },
  sm: { fontSize: 14, lineHeight: 20 },
  lg: { fontSize: 18, lineHeight: 28 },
  xl: { fontSize: 20, lineHeight: 28 },
  "2xl": { fontSize: 24, lineHeight: 32 },
  "3xl": { fontSize: 30, lineHeight: 36 },
  "4xl": { fontSize: 36, lineHeight: 40 },
  "5xl": { fontSize: 48, lineHeight: 52 },
  "6xl": { fontSize: 60, lineHeight: 64 },
  "7xl": { fontSize: 72, lineHeight: 76 },
  title: { fontSize: 32, lineHeight: 32 },
  subtitle: { fontSize: 20, lineHeight: 28 },
  body: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12, lineHeight: 16 },
  link: { lineHeight: 30, fontSize: 16, color: "#0a7ea4" },
  defaultSemiBold: { fontSize: 16, lineHeight: 24, fontWeight: "600" },
});

const weightStyles = StyleSheet.create({
  ultralight: { fontWeight: "100" },
  thin: { fontWeight: "200" },
  light: { fontWeight: "300" },
  normal: { fontWeight: "400" },
  medium: { fontWeight: "500" },
  semibold: { fontWeight: "600" },
  bold: { fontWeight: "700" },
  heavy: { fontWeight: "800" },
  black: { fontWeight: "900" },
});
