import * as React from "react";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  ScrollView: {
    paddingHorizontal: 20,
  },
  viewContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  headerText: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
  },
  themeOptions: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
    color: "blue",
  },
});
export { styles };
