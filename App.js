import { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

import Login from "./src/components/Login";
import TaskList from "./src/components/TaskList";
import firebase from "./src/services/firebaseConnection";

export default function App() {
  const [user, setUser] = useState(null);

  const inputRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [key, setKey] = useState("");

  useEffect(() => {
    function getUser() {
      if (!user) {
        return;
      }
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .once("value", (snapshot) => {
          setTasks([]);
          snapshot?.forEach((childItem) => {
            let data = {
              key: childItem.key,
              nome: childItem.val().nome,
            };
            setTasks((oldTasks) => [...oldTasks, data]);
          });
        });
    }

    getUser();
  }, [user]);

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />;
  }

  function handleAdd() {
    if (newTask === "") {
      return;
    }

    // Editar tarefa
    if (key !== "") {
      firebase
        .database()
        .ref("tarefas")
        .child(user)
        .child(key)
        .update({
          nome: newTask,
        })
        .then(() => {
          const taskIndex = tasks.findIndex((item) => item.key === key);
          const tasksClone = tasks;
          tasksClone[taskIndex].nome = newTask;
          setTasks([tasksClone]);
        });
      Keyboard.dismiss();
      setNewTask("");
      setKey("");
      return;
    }

    let tasks = firebase.database().ref("tarefas").child(user);
    let chave = tasks.push().key;

    tasks
      .child(chave)
      .set({
        nome: newTask,
      })
      .then(() => {
        const data = {
          key: chave,
          nome: newTask,
        };
        setTasks((oldTasks) => [...oldTasks, data]);
      });
    setNewTask("");
    Keyboard.dismiss();
  }

  function handleDelete(key) {
    firebase
      .database()
      .ref("tarefas")
      .child(user)
      .child(key)
      .remove()
      .then(() => {
        const findTasks = tasks.filter((item) => item.key !== key);
        setTasks(findTasks);
      });
  }

  function handleEdit(data) {
    setNewTask(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey("");
    setNewTask("");
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          placeholder="O que vai fazer hoje?"
          value={newTask}
          onChangeText={(text) => setNewTask(text)}
          ref={inputRef}
        />
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      {key.length > 0 && (
        <View
          style={{
            flexDirection: "row",
            marginBottom: 8,
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={cancelEdit}>
            <Feather name="x-circle" size={20} color="#ff0000" />
          </TouchableOpacity>
          <Text style={{ marginLeft: 5, color: "#ff0000", fontWeight: "600" }}>
            Você está editando uma tarefa!
          </Text>
        </View>
      )}
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
