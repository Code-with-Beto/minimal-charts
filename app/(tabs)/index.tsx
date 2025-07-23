import { Input } from "@/components/ui/Input";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function InputsScreen() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Input placeholder="Search" color="white" variant="outline" />
        <Input placeholder="Search" color="white" variant="soft" />
        <Input placeholder="Search" color="white" variant="subtle" />
        <Input placeholder="Search" color="white" variant="underline" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    margin: "auto",
    gap: 24,
    marginTop: 48,
    paddingHorizontal: 16,
  },
});
