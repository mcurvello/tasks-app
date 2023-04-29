import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Login from "./src/components/Login";

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login />;
  }

  return (
    <View style={styles.container}>
      <Text>App Tarefas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 65,
    backgroundColor: "#f2f6fc",
  },
});
