import { monthlyData, weeklyData, yearlyData } from "@/constants/DummyData";
import { useState } from "react";
import { Dimensions, SafeAreaView, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Button } from "./ui/Button";

type TimeRange = "yearly" | "weekly" | "monthly";

interface BarData {
  value: number;
  label?: string;
  frontColor?: string;
  [key: string]: any;
}

export default function MinimalChart() {
  const [timeRange, setTimeRange] = useState<TimeRange>("weekly");

  const getDataForTimeRange = () => {
    const data = (() => {
      switch (timeRange) {
        case "yearly":
          return yearlyData;
        case "monthly":
          return monthlyData;
        case "weekly":
        default:
          return weeklyData;
      }
    })();

    return data;
  };
  const chartWidth = Dimensions.get("window").width - 56;

  const BAR_WIDTHS: Record<TimeRange, number> = {
    weekly: 18,
    monthly: 6,
    yearly: 12,
  };

  const BAR_SPACING: Record<TimeRange, number> = {
    weekly: 40,
    monthly: 6,
    yearly: 20,
  };

  const barWidth = BAR_WIDTHS[timeRange];
  const barSpacing = BAR_SPACING[timeRange];

  return (
    <SafeAreaView
      style={{ flex: 1, flexDirection: "column", gap: 48, marginTop: 24 }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: "red",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 50,
        }}
      >
        <Button
          onPress={() => setTimeRange("weekly")}
          variant={timeRange === "weekly" ? "solid" : "outline"}
          style={{ width: "33%" }}
          size="sm"
          title="Week"
          color="black"
        />
        <Button
          onPress={() => setTimeRange("monthly")}
          variant={timeRange === "monthly" ? "solid" : "outline"}
          style={{ width: "33%" }}
          size="sm"
          title="Month"
          color="black"
        />
        <Button
          onPress={() => setTimeRange("yearly")}
          variant={timeRange === "yearly" ? "solid" : "outline"}
          style={{ width: "33%" }}
          size="sm"
          title="Year"
          color="black"
        />
      </View>
      <View style={{ flex: 1 }}>
        <BarChart
          barMarginBottom={0}
          width={chartWidth}
          height={200}
          noOfSections={3}
          barWidth={barWidth}
          spacing={barSpacing}
          initialSpacing={10}
          endSpacing={10}
          barBorderRadius={8}
          data={getDataForTimeRange()}
          yAxisThickness={0}
          xAxisThickness={0}
          hideYAxisText
          xAxisLabelTextStyle={{ display: "none" }}
          showXAxisIndices={false}
          renderTooltip={() => null}
          disableScroll
          isAnimated
          animationDuration={800}
          onPress={(item: BarData, index: number) => {
            console.log("Bar pressed:", item, "at index:", index);
          }}
        />
      </View>
    </SafeAreaView>
  );
}
