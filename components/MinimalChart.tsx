import { generateMonthlyData } from "@/constants/DummyData";
import { Color } from "@/constants/TWPalette";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Icon } from "./ui/Icon";

interface BarData {
  value: number;
  label?: string;
  frontColor?: string;
  [key: string]: any;
}

// Color themes using TWPalette
const colorThemes = {
  blue: { name: "blue", primary: 500, accent: 600 },
  purple: { name: "purple", primary: 500, accent: 600 },
  emerald: { name: "emerald", primary: 500, accent: 600 },
  orange: { name: "orange", primary: 500, accent: 600 },
  pink: { name: "pink", primary: 500, accent: 600 },
  cyan: { name: "cyan", primary: 500, accent: 600 },
} as const;

type ColorTheme = keyof typeof colorThemes;

export default function MinimalChart() {
  const [selectedBarIndex, setSelectedBarIndex] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [colorTheme, setColorTheme] = useState<ColorTheme>("blue");

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

  const monthlyData = useMemo(
    () => generateMonthlyData(currentYear, currentMonth + 1),
    [currentYear, currentMonth]
  );

  const getChartData = useCallback(() => {
    return monthlyData.map((item, index) => ({
      ...item,
      frontColor:
        selectedBarIndex === index
          ? themeColor[theme.accent]
          : themeColor[theme.primary],
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
  }, [monthlyData, selectedBarIndex, themeColor, theme]);

  const bgColors = [
    Color[colorThemes[colorTheme].name][100],
    "#ffffff",
    Color[colorThemes[colorTheme].name][100],
  ] as const;

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
        {/* Stats Cards */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 12,
            marginVertical: 32,
            paddingHorizontal: 16,
          }}
        >
          <View style={{ flex: 1, ...styles.card }}>
            <Text style={styles.label}>Average</Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: Color.gray[900],
                marginTop: 4,
              }}
            >
              {Math.round(
                monthlyData.reduce((sum, item) => sum + item.value, 0) /
                  monthlyData.length
              )}
            </Text>
          </View>

          <View style={{ flex: 1, ...styles.card }}>
            <Text style={styles.label}>Total</Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: Color.gray[900],
                marginTop: 4,
              }}
            >
              {monthlyData.reduce((sum, item) => sum + item.value, 0)}
            </Text>
          </View>

          <View style={{ flex: 1, ...styles.card }}>
            <Text style={styles.label}>Peak</Text>
            <Text
              style={{
                fontSize: 24,
                fontWeight: "700",
                color: Color.gray[900],
                marginTop: 4,
              }}
            >
              {Math.max(...monthlyData.map((item) => item.value))}
            </Text>
          </View>
        </View>

        {/* Month Navigation */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
            paddingHorizontal: 16,
          }}
        >
          <Pressable
            onPress={() => navigateMonth(-1)}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <Icon
              symbol={"chevron.backward"}
              size="sm"
              color={Color.gray[500]}
            />
          </Pressable>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: Color.gray[900],
            }}
          >
            {getMonthName(currentMonth)} {currentYear}
          </Text>

          <Pressable
            onPress={() => navigateMonth(1)}
            style={{
              padding: 8,
              borderRadius: 8,
            }}
            hitSlop={20}
          >
            <Icon
              symbol={"chevron.forward"}
              size="sm"
              color={Color.gray[500]}
            />
          </Pressable>
        </View>

        {/* Chart Container */}
        <View
          style={{
            marginBottom: 32,
            overflow: "hidden",
          }}
        >
          <BarChart
            noOfSections={4}
            barBorderRadius={4}
            data={getChartData()}
            yAxisThickness={0}
            xAxisThickness={0}
            // hideYAxisText
            xAxisLabelTextStyle={{
              color: Color.gray[400],
              fontSize: 12,
              fontWeight: "500",
            }}
            yAxisTextStyle={{
              color: Color.gray[400],
              fontSize: 12,
              fontWeight: "500",
            }}
            showXAxisIndices={false}
            // renderTooltip={() => (
            //   <View style={{ backgroundColor: "white" }}>
            //     <Text>Tooltip</Text>
            //   </View>
            // )}
            isAnimated
            animationDuration={300}
            onPress={(_item: BarData, index: number) => {
              setSelectedBarIndex(selectedBarIndex === index ? null : index);
            }}
            showGradient
            dashGap={10}
          />
        </View>
        {/* Color Theme Selector */}
        <View style={{ paddingHorizontal: 16 }}>
          <Text
            style={{
              ...styles.label,
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
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor:
                    Color[colorThemes[theme].name as keyof typeof Color][500],
                  borderWidth: colorTheme === theme ? 3 : 0,
                  borderColor: Color.gray[900],
                  boxShadow:
                    colorTheme === theme
                      ? "0px 2px 8px rgba(0,0,0,0.2)"
                      : "none",
                }}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
  },
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Color.gray[900],
  },
  subtitle: {
    fontSize: 16,
    color: Color.gray[600],
  },
  label: {
    fontSize: 14,
    color: Color.gray[600],
  },
});
