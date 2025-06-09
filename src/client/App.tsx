import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

import "./App.css";

import * as API from "./api";
import { Todo } from "./services/TodoInterface";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: 300,
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    try {
      API.getTodos().then(setTodos);
    } catch (err) {
      console.log("failed to fetch todos", err);
    }
  }, []);

  const addTodo = useCallback(async(description: string) => {
    const tempId = Date.now();
    const optimisticTodo: Todo = {
      id: tempId,
      description,
      completed: false,
    };
    setTodos((prev) => [optimisticTodo, ...prev]);
    try {
      await API.addTodo(description);

      API.getTodos().then(setTodos);
    } catch (err) {
      setTodos((prev) => prev.filter((todo) => todo.id !== tempId));
      alert("Could not save, todo removed");
    }
  }, []);

  const handleChange = useCallback(async (id: number, isCompleted: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: isCompleted } : todo
      )
    );

    try {
      await API.toggleTodo(id, isCompleted);
    } catch (err) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !isCompleted } : todo
        )
      );
      alert("Could not save, change restored");
    }
  }, []);

  const handleEdit = useCallback((id: number, newDesc: string) => {
  setTodos(prev =>
    prev.map(todo => (todo.id === id ? { ...todo, description: newDesc } : todo))
  );

  (async () => {
    try {
      await API.updateTodoDescription(id, newDesc);
    } catch {
      // rollback
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, description: todo.description } : todo
        )
      );
      alert("Could not save description, reverted.");
    }
  })();
}, []);

  return (
    <Wrapper>
      <Header>Todo List</Header>
      <AddInput onAdd={addTodo} />
      <TodoList>
        {todos.map((todo) => (
          <TodoItem todo={todo} toggle={handleChange} />
        ))}
      </TodoList>
    </Wrapper>
  );
}

export default App;
