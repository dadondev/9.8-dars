export interface ITodo {
  completed: boolean;
  text: string;
}

const todosMap = new Map<number, ITodo>();
todosMap.set(1, { text: "task 1", completed: false });
let id = 1;
export function getTodos(id?: number) {
  if (id) return { id, ...todosMap.get(id) };
  return Array.from(todosMap, ([key, value]) => ({
    ...value,
    id: key,
    completed: false,
  }));
}

export function createTodo(todo: string) {
  const newTodo = {
    text: todo,
    completed: false,
  };
  todosMap.set(++id, newTodo);
}

export function DeleteTodo(id: number) {
  todosMap.delete(id);
}

export function updateTodo(id: number, body: ITodo) {
  if (todosMap.has(id)) {
    const prevTodo = todosMap.get(id);
    todosMap.set(id, { ...prevTodo, ...body });
  }
}
