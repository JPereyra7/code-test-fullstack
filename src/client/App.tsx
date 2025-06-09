import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { AddInput } from "./components/AddInput";
import { TodoItem, Todo } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import { Header } from "./components/Header";

import "./App.css";

import * as API from "./api";

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

  const addTodo = useCallback(async (description: string) => {
    await API.addTodo(description);
    API.getTodos().then(setTodos);
  }, []);

  const handleChange = useCallback(async (id: number, isCompleted: boolean) => {
    await API.toggleTodo(id, isCompleted);
    API.getTodos().then(setTodos);
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
