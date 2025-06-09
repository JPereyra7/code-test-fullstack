export interface Todo {
  id: number;
  completed: boolean;
  description: string;
}

export interface TodoItemProps {
  todo: Todo;
  toggle?: (id: number, isCompleted: boolean) => void;
  edit?: (id: number, newDesc: string) => void;
}

