import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";

export default function App() {
  let tasks = [
    { key: "1", nome: "Trabalhar durante fim de semana" },
    { key: "2", nome: "Estudar" },
  ];

  const [user, setUser] = useState(null);
  const [newTask, setNewTask] = useState("");

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  function handleDelete(key) {
    console.log(key);
  }

  function handleEdit(data) {
    console.log("ITEM CLICADO: " + JSON.stringify(data));
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
        />
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TaskList
            data={item}
            deleteItem={handleDelete}
            editItem={handleEdit}
          />
        )}
      />
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
  containerTask: {
    flexDirection: "row",
  },
  input: {
    flex: 1,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#141414",
    height: 45,
  },
  buttonAdd: {
    backgroundColor: "#141414",
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
    paddingHorizontal: 14,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 22,
  },
});
