import { Button } from "@/components/ui/Button";
import { SafeAreaView, StyleSheet } from "react-native";

export default function ButtonsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        variant="outline"
        color="white"
        title="Outline"
        onPress={() => {}}
      />
      <Button variant="soft" color="white" title="Soft" onPress={() => {}} />
      <Button
        variant="subtle"
        color="white"
        title="Subtle"
        onPress={() => {}}
      />
      <Button
        variant="outline"
        color="white"
        title="Outline"
        onPress={() => {}}
      />
      <Button variant="solid" color="white" title="Solid" onPress={() => {}} />
      <Button variant="link" color="white" title="Link" onPress={() => {}} />
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
