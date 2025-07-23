import { useColorScheme } from "@/hooks/useColorScheme";
import {
  InputColorConfig,
  RADIUS_VALUES,
  UIColor,
  UIRadius,
  UISize,
  getColorValue,
} from "@/types/ui";
import React, { forwardRef, useMemo } from "react";
import { StyleSheet, TextInput, type TextInputProps } from "react-native";

type InputVariant = "outline" | "soft" | "subtle" | "underline";

const generateVariantConfig = (
  color: UIColor,
  colorScheme: "light" | "dark"
): Record<InputVariant, InputColorConfig> => {
  const isDark = colorScheme === "dark";

  if (color === "black") {
    const bgColor = getColorValue("black", 50);
    const borderColor = getColorValue("black", 50);
    const placeholderColor = getColorValue("black", 600);

    return {
      outline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: getColorValue("black", 50),
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      soft: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: "transparent",
        textColor: getColorValue("black", 50),
        placeholderColor: placeholderColor,
        borderWidth: 0,
      },
      subtle: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: borderColor,
        textColor: getColorValue("black", 50),
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      underline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: getColorValue("black", 50),
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
    };
  }

  if (color === "white") {
    const bgColor = getColorValue("white", 950);
    const borderColor = getColorValue("white", 950);
    const placeholderColor = getColorValue("white", 600);

    return {
      outline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: getColorValue("white", 950),
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      soft: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: "transparent",
        textColor: getColorValue("white", 950),
        placeholderColor: placeholderColor,
        borderWidth: 0,
      },
      subtle: {
        backgroundColor: `${bgColor}${isDark ? "20" : "10"}`,
        borderColor: borderColor,
        textColor: getColorValue("white", 950),
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
      underline: {
        backgroundColor: "transparent",
        borderColor: borderColor,
        textColor: getColorValue("white", 950),
        placeholderColor: placeholderColor,
        borderWidth: 1,
      },
    };
  }

  return {
    outline: {
      backgroundColor: "transparent",
      borderColor: getColorValue(color, isDark ? 500 : 600),
      textColor: getColorValue(color, isDark ? 500 : 600),
      placeholderColor: getColorValue(color, isDark ? 900 : 300),
      borderWidth: 1,
    },
    soft: {
      backgroundColor: `${getColorValue(color, isDark ? 500 : 600)}${
        isDark ? "20" : "10"
      }`,
      borderColor: "transparent",
      textColor: getColorValue(color, isDark ? 500 : 600),
      placeholderColor: getColorValue(color, isDark ? 900 : 500),
      borderWidth: 0,
    },
    subtle: {
      backgroundColor: `${getColorValue(color, isDark ? 500 : 600)}${
        isDark ? "20" : "10"
      }`,
      borderColor: getColorValue(color, isDark ? 500 : 600),
      textColor: getColorValue(color, isDark ? 500 : 600),
      placeholderColor: getColorValue(color, isDark ? 900 : 500),
      borderWidth: 1,
    },
    underline: {
      backgroundColor: "transparent",
      borderColor: getColorValue(color, isDark ? 500 : 600),
      textColor: getColorValue(color, isDark ? 500 : 600),
      placeholderColor: getColorValue(color, isDark ? 900 : 500),
      borderWidth: 1,
    },
  };
};

export type ThemedInputProps = TextInputProps & {
  size?: UISize;
  variant?: InputVariant;
  color?: UIColor;
  radius?: UIRadius;
};

export const Input = forwardRef<TextInput, ThemedInputProps>(
  (
    {
      style,
      placeholderTextColor,
      size = "md",
      variant = "outline",
      color = "black",
      radius = "default",
      ...rest
    },
    ref
  ) => {
    const colorScheme = useColorScheme();

    const variantConfig = useMemo(() => {
      const variants = generateVariantConfig(color, colorScheme ?? "light");
      return variants[variant];
    }, [color, colorScheme, variant]);

    const inputStyles = useMemo(() => {
      const baseStyles = {
        backgroundColor: variantConfig.backgroundColor,
        color: variantConfig.textColor,
        borderColor: variantConfig.borderColor,
        fontSize: FONT_SIZE_STYLES[size].fontSize,
      };

      // Handle underline variant with only bottom border
      if (variant === "underline") {
        return [
          styles.input,
          SIZE_STYLES[size],
          {
            ...baseStyles,
            borderBottomWidth: variantConfig.borderWidth,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            borderRadius: 0,
          },
          style,
        ];
      }

      return [
        styles.input,
        SIZE_STYLES[size],
        {
          ...baseStyles,
          borderWidth: variantConfig.borderWidth,
          borderRadius: RADIUS_VALUES[radius],
        },
        style,
      ];
    }, [size, variantConfig, radius, variant, style]);

    return (
      <TextInput
        ref={ref}
        style={inputStyles}
        placeholderTextColor={
          placeholderTextColor || variantConfig.placeholderColor
        }
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";

const styles = StyleSheet.create({
  input: { paddingHorizontal: 16, width: "100%" },
  xs: { height: 28 },
  sm: { height: 36 },
  md: { height: 48 },
  lg: { height: 56 },
  xl: { height: 64 },
  xxl: { height: 72 },
});

const SIZE_STYLES = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
  "2xl": styles.xxl,
} as const;

const FONT_SIZE_STYLES = {
  xs: { fontSize: 12 },
  sm: { fontSize: 14 },
  md: { fontSize: 16 },
  lg: { fontSize: 18 },
  xl: { fontSize: 20 },
  "2xl": { fontSize: 22 },
} as const;
