import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import InputTodo from "./components/todo/input.todo";
import ListTodo from "./components/todo/list.todo";
import uuid from "react-native-uuid";

export default function App() {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const addTodo = (title: string) => {
    const id = uuid.v4().toString();
    const todo = { id, title };
    alert(`Thêm thành công với id là: ${todo.id}`);
    setTodoList([...todoList, todo]);
  };

  const deleteTodo = (id: string) => {
    const newTodo = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodo);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* close keyboard */}
      <View style={styles.container}>
        <InputTodo addTodo={addTodo} />
        <ListTodo todoList={todoList} deleteTodo={deleteTodo} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
});
