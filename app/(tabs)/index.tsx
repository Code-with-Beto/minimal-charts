import MinimalChart from "@/components/MinimalChart";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function InputsScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <MinimalChart />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    margin: "auto",
    height: "auto",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "gray",
  },
});
