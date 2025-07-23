/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#7c3aed';
const tintColorDark = '#a855f7';
const light = '#09090b';
const dark = '#fafafa';
const borderLight = '#09090b20'
const borderDark = '#fafafa20'
const iconLight = '#a1a1aa'
const iconDark = '#d4d4d8'

export const Colors = {
  light: {
    text: light,
    background: dark,
    border: borderLight,
    tint: tintColorLight,
    icon: iconLight,
    tabIconDefault: iconLight,
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: dark,
    background: light,
    border: borderDark,
    tint: tintColorDark,
    icon: iconDark,
    tabIconDefault: iconDark,
    tabIconSelected: tintColorDark,
  },
  };