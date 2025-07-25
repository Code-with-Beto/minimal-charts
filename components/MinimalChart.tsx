import { generateMonthlyData } from "@/constants/DummyData";
import { Color } from "@/constants/TWPalette";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { BarChart } from "react-native-gifted-charts";

interface BarData {
  value: number;
  label?: string;
  frontColor?: string;
  [key: string]: any;
}

// Color themes using TWPalette
const colorThemes = {
  blue: { name: "blue", light: 500, dark: 600 },
  purple: { name: "purple", light: 500, dark: 600 },
  emerald: { name: "emerald", light: 500, dark: 600 },
  orange: { name: "orange", light: 500, dark: 600 },
  pink: { name: "pink", light: 500, dark: 600 },
  cyan: { name: "cyan", light: 500, dark: 600 },
} as const;

type ColorTheme = keyof typeof colorThemes;

// Reusable styles
const createCardStyle = (isDark: boolean) => ({
  backgroundColor: isDark ? Color.gray[800] : "#ffffff",
  borderRadius: 16,
  padding: 16,
  boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
});

const createTextStyle = (
  isDark: boolean,
  type: "title" | "subtitle" | "label"
) => {
  const styles = {
    title: {
      fontSize: 28,
      fontWeight: "700" as const,
      color: isDark ? "#ffffff" : Color.gray[900],
    },
    subtitle: {
      fontSize: 16,
      color: isDark ? Color.gray[400] : Color.gray[600],
    },
    label: {
      fontSize: 14,
      color: isDark ? Color.gray[400] : Color.gray[600],
    },
  };
  return styles[type];
};

export default function MinimalChart() {
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");
  const isDarkMode = useColorScheme() === "dark";

  const theme = colorThemes[colorTheme];
  const themeColor = Color[theme.name as keyof typeof Color];

  const getMonthName = (month: number) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[month];
  };

  const navigateMonth = (direction: number) => {
    let newMonth = currentMonth + direction;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
    setSelectedBarIndex(null);
  };

  const monthlyData = generateMonthlyData(currentYear, currentMonth + 1);

  // Calculate dynamic bar width to fit all days without scrolling
  const screenWidth = Dimensions.get("window").width;
  const chartPadding = 80; // Total padding (40 on each side)
  const availableWidth = screenWidth - chartPadding;
  const numberOfBars = monthlyData.length;
  const totalSpacing = 2 * (numberOfBars - 1); // 2px between each bar
  const barWidth = 12;

  const getChartData = () => {
    return monthlyData.map((item, index) => ({
      ...item,
      frontColor:
        selectedBarIndex === index
          ? themeColor[theme.dark]
          : themeColor[theme.light],
      gradientColor:
        selectedBarIndex === index ? themeColor[400] : themeColor[300],
      topLabelComponent: () =>
        selectedBarIndex === index ? (
          <Text
            style={{
              color: themeColor[700],
              fontSize: 10,
              fontWeight: "600",
              marginBottom: 4,
            }}
          >
            {item.value}
          </Text>
        ) : null,
    }));
  };

  const bgColors = isDarkMode
    ? ([
        Color[colorThemes[colorTheme].name][900],
        Color[colorThemes[colorTheme].name][800],
        Color[colorThemes[colorTheme].name][900],
      ] as const)
    : ([
        Color[colorThemes[colorTheme].name][50],
        "#ffffff",
        Color[colorThemes[colorTheme].name][50],
      ] as const);

  return (
    <LinearGradient
      colors={bgColors}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20 }}>
          {/* Color Theme Selector */}
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                ...createTextStyle(isDarkMode, "label"),
                marginBottom: 12,
              }}
            >
              Choose Theme
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 12 }}
            >
              {(Object.keys(colorThemes) as ColorTheme[]).map((theme) => (
                <Pressable
                  key={theme}
                  onPress={() => {
                    setColorTheme(theme);
                    setSelectedBarIndex(null);
                  }}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor:
                      Color[colorThemes[theme].name as keyof typeof Color][500],
                    borderWidth: colorTheme === theme ? 3 : 0,
                    borderColor: isDarkMode ? "#ffffff" : Color.gray[900],
                    boxShadow:
                      colorTheme === theme
                        ? "0px 2px 8px rgba(0,0,0,0.2)"
                        : "none",
                  }}
                />
              ))}
            </ScrollView>
          </View>

          {/* Month Navigation */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
              ...createCardStyle(isDarkMode),
            }}
          >
            <Pressable
              onPress={() => navigateMonth(-1)}
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: isDarkMode ? Color.gray[700] : Color.gray[100],
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: isDarkMode ? "#ffffff" : Color.gray[900],
                }}
              >
                ‹
              </Text>
            </Pressable>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: isDarkMode ? Color.white : Color.gray[900],
              }}
            >
              {getMonthName(currentMonth)} {currentYear}
            </Text>

            <Pressable
              onPress={() => navigateMonth(1)}
              style={{
                padding: 8,
                borderRadius: 8,
                backgroundColor: isDarkMode ? Color.gray[700] : Color.gray[100],
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: isDarkMode ? "#ffffff" : Color.gray[900],
                }}
              >
                ›
              </Text>
            </Pressable>
          </View>

          {/* Chart Container */}
          <View
            style={{
              ...createCardStyle(isDarkMode),
              marginBottom: 20,
            }}
          >
            <BarChart
              barMarginBottom={0}
              width={availableWidth}
              height={200}
              noOfSections={4}
              barWidth={barWidth}
              spacing={10}
              barBorderRadius={4}
              data={getChartData()}
              yAxisThickness={0}
              xAxisThickness={0}
              hideYAxisText
              xAxisLabelTextStyle={{
                color: isDarkMode ? Color.gray[500] : Color.gray[400],
                fontSize: 9,
                fontWeight: "500",
              }}
              showXAxisIndices={false}
              renderTooltip={() => null}
              isAnimated
              animationDuration={300}
              onPress={(_item: BarData, index: number) => {
                setSelectedBarIndex(selectedBarIndex === index ? null : index);
              }}
              showGradient
              gradientColor={themeColor[300]}
              frontColor={themeColor[500]}
              backgroundColor="transparent"
              rulesType="solid"
              rulesColor={isDarkMode ? Color.gray[700] : Color.gray[200]}
              dashGap={0}
            />
          </View>

          {/* Stats Cards */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <View style={{ flex: 1, ...createCardStyle(isDarkMode) }}>
              <Text style={createTextStyle(isDarkMode, "label")}>Average</Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: isDarkMode ? Color.white : Color.gray[900],
                  marginTop: 4,
                }}
              >
                {Math.round(
                  monthlyData.reduce((sum, item) => sum + item.value, 0) /
                    monthlyData.length
                )}
              </Text>
            </View>

            <View style={{ flex: 1, ...createCardStyle(isDarkMode) }}>
              <Text style={createTextStyle(isDarkMode, "label")}>Total</Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: isDarkMode ? Color.white : Color.gray[900],
                  marginTop: 4,
                }}
              >
                {monthlyData.reduce((sum, item) => sum + item.value, 0)}
              </Text>
            </View>

            <View style={{ flex: 1, ...createCardStyle(isDarkMode) }}>
              <Text style={createTextStyle(isDarkMode, "label")}>Peak</Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: isDarkMode ? Color.white : Color.gray[900],
                  marginTop: 4,
                }}
              >
                {Math.max(...monthlyData.map((item) => item.value))}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
