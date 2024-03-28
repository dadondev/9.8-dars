"use client";
const BaseUrl = "http://localhost:3000/api/todos/";

import { useEffect, useRef, useState } from "react";
import { ITodo } from "../api/todos/db";

const Form = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [Id, setId] = useState<number | undefined>(undefined);
  const handleSubmit = (e: any) => {
    // console.log(e.target.input.value);
    if (e.target.input.value.length && !isEdit)
      createTodo({ text: e.target.input.value });
    if (isEdit) updateTodo({ id: Id, text: e.target.input.value });
  };

  const createTodo = async (obj: any) => {
    const req = await fetch(BaseUrl, {
      cache: "no-store",
      method: "POST",
      body: JSON.stringify({ ...obj }),
    });
    const res = await req.json();
    getTodo();
    clearInput();
  };

  const getTodo = async () => {
    setLoading(true);
    const req = await fetch("http://localhost:3000/api/todos");
    const res = await req.json();
    setTodos([...res]);
    setLoading(false);
  };

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const updateTodo = async (data: {
    id?: number;
    completed?: boolean;
    text: string;
  }) => {
    const newData = {
      completed: data.completed ? false : true,
      text: data.text,
    };
    fetch(BaseUrl + data.id, {
      cache: "no-store",
      method: "PUT",
      body: JSON.stringify(newData),
    }).finally(() => {
      if (inputRef.current) inputRef.current.value = "";
      setIsEdit(false);
      setId(undefined);
      getTodo();
    });
  };

  const handleClick = (data: {
    id: number;
    completed: boolean;
    text: string;
  }) => {
    updateTodo(data);
  };
  const handleUpdate = (id: number) => {
    setIsEdit(true);
    if (inputRef.current) inputRef.current.value = todos[id - 1].text;
    setId(id);
  };
  useEffect(() => {
    getTodo();
    clearInput();
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          !loading && handleSubmit(e);
        }}
      >
        <input ref={inputRef} type="text" name="input" />
        <button disabled={loading}>submit</button>
      </form>
      <ol>
        {todos.map((e, i) => (
          <li
            style={{
              cursor: "pointer",
              textDecoration: e.completed ? "line-through" : "none",
            }}
            key={i}
            onClick={() => {
              handleClick({ id: i + 1, completed: e.completed, text: e.text });
            }}
          >
            {e.text}

            <button
              onClick={() => {
                fetch(BaseUrl + (i + 1), {
                  method: "DELETE",
                  cache: "no-store",
                }).finally(() => {
                  getTodo();
                });
              }}
            >
              del
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleUpdate(i + 1);
              }}
            >
              edit
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Form;
