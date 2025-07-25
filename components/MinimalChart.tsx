import {
  generateMonthlyData,
  weeklyData,
  yearlyData,
} from "@/constants/DummyData";
import { getColorValue } from "@/types/ui";
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

type TimeRange = "yearly" | "weekly" | "monthly";

interface BarData {
  value: number;
  label?: string;
  frontColor?: string;
  [key: string]: any;
}

// Apple-inspired color themes
const colorThemes = {
  purple: { primary: "purple", gradient: ["purple", "pink"] },
  blue: { primary: "blue", gradient: ["blue", "cyan"] },
  green: { primary: "green", gradient: ["green", "emerald"] },
  orange: { primary: "orange", gradient: ["orange", "amber"] },
  pink: { primary: "pink", gradient: ["pink", "rose"] },
  indigo: { primary: "indigo", gradient: ["indigo", "blue"] },
} as const;

type ColorTheme = keyof typeof colorThemes;

export default function MinimalChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [colorTheme, setColorTheme] = useState<ColorTheme>("purple");
  const isDarkMode = useColorScheme() === "dark";

  const theme = colorThemes[colorTheme];

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

  const getDataForTimeRange = () => {
    const baseData = (() => {
      switch (timeRange) {
        case "yearly":
          return yearlyData;
        case "monthly":
          return generateMonthlyData(currentYear, currentMonth + 1);
        case "weekly":
        default:
          return weeklyData;
      }
    })();

    // Add colors based on theme and dark mode
    return baseData.map((item, index) => ({
      ...item,
      frontColor:
        selectedBarIndex === index
          ? getColorValue(theme.primary as any, isDarkMode ? 500 : 600)
          : getColorValue(theme.primary as any, isDarkMode ? 400 : 500),
      gradientColor:
        selectedBarIndex === index
          ? getColorValue(theme.primary as any, isDarkMode ? 300 : 400)
          : getColorValue(theme.primary as any, isDarkMode ? 200 : 300),
      topLabelComponent: () =>
        selectedBarIndex === index ? (
          <Text
            style={{
              color: getColorValue(
                theme.primary as any,
                isDarkMode ? 300 : 700
              ),
              fontSize: 12,
              fontWeight: "600",
              marginBottom: 6,
            }}
          >
            {item.value}
          </Text>
        ) : null,
    }));
  };

  const chartWidth = Dimensions.get("window").width - 40;

  const BAR_WIDTHS: Record<TimeRange, number> = {
    weekly: 36,
    monthly: 10,
    yearly: 24,
  };

  const BAR_SPACING: Record<TimeRange, number> = {
    weekly: 24,
    monthly: 3,
    yearly: 14,
  };

  const barWidth = BAR_WIDTHS[timeRange];
  const barSpacing = BAR_SPACING[timeRange];

  const bgColors = isDarkMode
    ? (["#1a1a1a", "#2a2a2a", "#1a1a1a"] as const)
    : ([
        getColorValue(theme.gradient[0] as any, 50),
        getColorValue(theme.gradient[1] as any, 50),
        "white",
      ] as const);

  return (
    <LinearGradient
      colors={bgColors}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ paddingHorizontal: 16 }}>
          {/* Header */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                color: isDarkMode ? "#999999" : getColorValue("gray", 600),
              }}
            >
              Track your performance metrics
            </Text>
          </View>

          {/* Color Theme Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 16 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {(Object.keys(colorThemes) as ColorTheme[]).map((theme) => (
              <Pressable
                key={theme}
                onPress={() => {
                  setColorTheme(theme);
                  setSelectedBarIndex(null);
                }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: getColorValue(
                    colorThemes[theme].primary as any,
                    500
                  ),
                  borderWidth: colorTheme === theme ? 3 : 0,
                  borderColor: isDarkMode ? "#ffffff" : "#000000",
                  marginRight: 8,
                  boxShadow:
                    colorTheme === theme
                      ? "0px 2px 8px rgba(0,0,0,0.15)"
                      : "none",
                }}
              />
            ))}
          </ScrollView>

          {/* Time Range Selector */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: isDarkMode
                ? "#2a2a2a"
                : getColorValue("gray", 100),
              borderRadius: 12,
              padding: 4,
              marginBottom: 16,
              boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
            }}
          >
            {(["weekly", "monthly", "yearly"] as TimeRange[]).map((range) => (
              <Pressable
                key={range}
                onPress={() => {
                  setTimeRange(range);
                  setSelectedBarIndex(null);
                }}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  backgroundColor:
                    timeRange === range
                      ? getColorValue(
                          theme.primary as any,
                          isDarkMode ? 600 : 500
                        )
                      : "transparent",
                  marginHorizontal: 2,
                  boxShadow:
                    timeRange === range
                      ? "0px 2px 6px rgba(0,0,0,0.1)"
                      : "none",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      timeRange === range
                        ? "#ffffff"
                        : isDarkMode
                        ? "#999999"
                        : getColorValue("gray", 600),
                    fontWeight: timeRange === range ? "600" : "500",
                    fontSize: 14,
                  }}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Month Navigation (only for monthly view) */}
          {timeRange === "monthly" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
                paddingHorizontal: 10,
              }}
            >
              <Pressable
                onPress={() => navigateMonth(-1)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: isDarkMode
                    ? "#3a3a3a"
                    : getColorValue("gray", 200),
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }}
                >
                  ←
                </Text>
              </Pressable>

              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: isDarkMode ? "#ffffff" : getColorValue("gray", 900),
                }}
              >
                {getMonthName(currentMonth)} {currentYear}
              </Text>

              <Pressable
                onPress={() => navigateMonth(1)}
                style={{
                  padding: 8,
                  borderRadius: 8,
                  backgroundColor: isDarkMode
                    ? "#3a3a3a"
                    : getColorValue("gray", 200),
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }}
                >
                  →
                </Text>
              </Pressable>
            </View>
          )}

          {/* Chart Container */}
          <View
            style={{
              backgroundColor: isDarkMode ? "#2a2a2a" : "white",
              borderRadius: 20,
              padding: 20,
              marginBottom: 16,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                barMarginBottom={0}
                width={
                  chartWidth
                  // timeRange === "monthly"
                  //   ? Math.max(
                  //       chartWidth,
                  //       getDataForTimeRange().length * (barWidth + barSpacing)
                  //     )
                  //   : chartWidth
                }
                height={220}
                noOfSections={4}
                barWidth={barWidth}
                spacing={barSpacing}
                initialSpacing={16}
                endSpacing={16}
                barBorderRadius={12}
                data={getDataForTimeRange()}
                yAxisThickness={0}
                xAxisThickness={0}
                hideYAxisText
                xAxisLabelTextStyle={{
                  color: isDarkMode ? "#666666" : getColorValue("gray", 500),
                  fontSize: 11,
                  fontWeight: "500",
                }}
                showXAxisIndices={false}
                renderTooltip={() => null}
                disableScroll={timeRange !== "monthly"}
                isAnimated
                animationDuration={500}
                onPress={(_item: BarData, index: number) => {
                  setSelectedBarIndex(
                    selectedBarIndex === index ? null : index
                  );
                }}
                showGradient
                gradientColor={getColorValue(
                  theme.primary as any,
                  isDarkMode ? 200 : 300
                )}
                frontColor={getColorValue(
                  theme.primary as any,
                  isDarkMode ? 400 : 500
                )}
                backgroundColor="transparent"
                rulesType="solid"
                rulesColor={isDarkMode ? "#3a3a3a" : getColorValue("gray", 200)}
                dashGap={0}
              />
            </ScrollView>
          </View>

          {/* Stats Cards */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: isDarkMode ? "#2a2a2a" : "white",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: isDarkMode ? "#999999" : getColorValue("gray", 600),
                  marginBottom: 4,
                }}
              >
                Average
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: isDarkMode ? "#ffffff" : getColorValue("gray", 900),
                }}
              >
                {Math.round(
                  getDataForTimeRange().reduce(
                    (sum, item) => sum + item.value,
                    0
                  ) / getDataForTimeRange().length
                )}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: isDarkMode ? "#2a2a2a" : "white",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: isDarkMode ? "#999999" : getColorValue("gray", 600),
                  marginBottom: 4,
                }}
              >
                Total
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: isDarkMode ? "#ffffff" : getColorValue("gray", 900),
                }}
              >
                {getDataForTimeRange().reduce(
                  (sum, item) => sum + item.value,
                  0
                )}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: isDarkMode ? "#2a2a2a" : "white",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: isDarkMode ? "#999999" : getColorValue("gray", 600),
                  marginBottom: 4,
                }}
              >
                Peak
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  color: isDarkMode ? "#ffffff" : getColorValue("gray", 900),
                }}
              >
                {Math.max(...getDataForTimeRange().map((item) => item.value))}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
