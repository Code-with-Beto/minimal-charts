import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import "react-native-reanimated";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerLargeTitle: true,
            headerTitle: "Analytics Overview",
            headerBlurEffect: "light",
            headerTransparent: Platform.OS === "ios" ? true : false,
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
