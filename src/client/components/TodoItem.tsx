import React, { FC, ChangeEvent, useState, KeyboardEvent } from "react";
import styled from "@emotion/styled";
import { TodoItemProps } from "../services/TodoInterface";

export const Wrapper = styled.label({
  display: "flex",
  alignItems: "center",
  width: "100%",
  borderRadius: 4,
  marginBottom: 8,
  padding: 16,
  background: "white",
  fontWeight: "400",
  fontSize: 14,
  cursor: "pointer",
});

const Label = styled.span<{ checked: boolean }>(({ checked }) => ({
  textDecoration: checked ? "line-through" : "none",
  fontSize: 20,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  flexWrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "center",
}));

const Checkbox = styled.input({
  width: 16,
  height: 16,
  marginRight: 12,
});

export const TodoItem = ({ todo, toggle, edit }:TodoItemProps) => {
  const { id, completed, description } = todo;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(description);



  const handleToggle = (e: ChangeEvent<HTMLInputElement>) => {
    if (toggle) {
      console.log(todo);
      console.log("hi there", e.target.checked, id);
      toggle(id, e.target.checked);
    }
  };
  const save = () => {
if (text !== description) edit?.(id, text);
setEditing(false);
};
const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
if (e.key === "Enter") (e.target as HTMLInputElement).blur();
};
  return (
    <Wrapper onDoubleClick={() => setEditing(true)}>
      <Checkbox
        type="checkbox"
        checked={completed}
        onChange={handleToggle}
      />

      {editing ? (
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={handleKey}
          autoFocus
          style={{ flex: 1, fontSize: 20 }}
        />
      ) : (
        <Label checked={completed}>{description}</Label>
      )}
    </Wrapper>
  );
};
