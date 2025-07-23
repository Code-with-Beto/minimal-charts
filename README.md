# Expo Starter Kit

A minimal and clean Expo starter kit with essential UI components ready to use. Includes a set of customizable components with a consistent color system inspired by TailwindCSS.

## Quick Start

1. Clone and install:

```bash
git clone <your-repo-url>
cd starter-kit
bun install
```

2. Start development:

```bash
npx expo start
```

## UI Components

### Button

```tsx
import { Button } from "@/components/ui/Button";

<Button title="Click me" onPress={() => {}} />;
```

Props:

- `title` (required): Button text
- `onPress` (required): Function to call when pressed
- `variant`: "solid" | "outline" | "soft" | "subtle" | "link"
- `color`: Any TailwindCSS color
- `size`: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
- `radius`: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "full"
- `disabled`: boolean
- `loading`: boolean
- `symbol`: SF Symbol name for icon
- `style`: ViewStyle for custom styles

### Input

```tsx
import { Input } from "@/components/ui/Input";

<Input placeholder="Enter text" onChangeText={setText} />;
```

Props:

- `variant`: "outline" | "soft" | "subtle" | "underline"
- `color`: Any TailwindCSS color
- `size`: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
- `radius`: "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "full"
- All standard TextInput props are supported

Sizes reference:

- xs: 28px height
- sm: 36px height
- md: 48px height
- lg: 56px height
- xl: 64px height
- 2xl: 72px height

### Text

```tsx
import { Text } from "@/components/ui/Text";

<Text type="body">Hello World</Text>;
```

Props:

- `type`: Text style preset
  - Basic sizes: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl"
  - Special variants: "default" | "defaultSemiBold" | "title" | "subtitle" | "body" | "caption" | "link"
- `weight`: "ultralight" | "thin" | "light" | "normal" | "medium" | "semibold" | "bold" | "heavy" | "black"
- `lightColor`: Color for light mode
- `darkColor`: Color for dark mode

Size reference (fontSize/lineHeight):

- xs: 12px/16px
- sm: 14px/20px
- base/default: 16px/24px
- lg: 18px/28px
- xl: 20px/28px
- 2xl: 24px/32px
- 3xl: 30px/36px
- 4xl: 36px/40px
- 5xl: 48px/52px
- 6xl: 60px/64px
- 7xl: 72px/76px

Special variants:

- title: 32px/32px
- subtitle: 20px/28px
- body: 14px/20px
- caption: 12px/16px
- link: 16px/30px (includes blue color)
- defaultSemiBold: 16px/24px with semibold weight

### Icon

```tsx
import { Icon } from "@/components/ui/Icon";

<Icon symbol="star.fill" size="md" color="#000" />;
```

Props:

- `symbol` (required): SF Symbol name
- `size`: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | number
- `color`: Color string
- `type`: "monochrome" | "hierarchical" | "palette" | "multicolor"

Size reference:

- xs: 14px
- sm: 18px
- md: 22px
- lg: 26px
- xl: 30px
- 2xl: 34px

## Available Colors

TailwindCSS colors available for all components:

- Base: black, white
- Gray scales: slate, gray, zinc, neutral, stone
- Colors: red, orange, amber, yellow, lime, green
- Cool: emerald, teal, cyan, sky, blue, indigo
- Warm: violet, purple, fuchsia, pink, rose

Each color has shades from 50 (lightest) to 950 (darkest)
