import React from "react";
import { StyleSheet, View } from "react-native";

function Separator({ color = "#eee" }: { color?: string }) {
  return <View style={[styles.separator, { backgroundColor: color }]} />;
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
  },
});

export default Separator;
