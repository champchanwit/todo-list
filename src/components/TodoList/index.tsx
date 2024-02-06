"use client";

import React, { useState } from "react";
import List, { ListProps } from "./List";

interface todoList {
  id: number;
  list: string;
  isFinished: boolean;
}

function Index() {
  const [lists, setLists] = useState<todoList[]>([]);
  const [isVisibleAdd, setIsVisibleAdd] = useState(false);
  const [value, setValue] = useState("");
  const handleClick = () => {
    setIsVisibleAdd(!isVisibleAdd);
  };

  const handleAddTodoList = () => {
    const newTodoList = {
      id: Date.now(),
      list: value,
      isFinished: false,
    };

    setLists([newTodoList, ...lists]);
    setIsVisibleAdd(!isVisibleAdd);
    setValue("");
  };
  return (
    <div>
      <div className="grid lg:grid-cols-6 lg:mt-10 md:grid-cols-4 md:mt-10 sm:grid-cols-1 ">
        <div className="lg:col-start-3 md:col-start-2 col-span-2">
          {/* <div className="lg:col-start-3 lg:col-span-2 md:col-start-3  "> */}
          <div className="bg-cyan-600 rounded-t-lg h-16 px-4 pt-4">
            <div className="flex space-x-2 justify-between items-center">
              <div className="text-white font-bold">TodoList</div>
              {/* <div> */}
              {!isVisibleAdd && (
                <button
                  className="flex bg-slate-100 rounded-full w-10 h-10 justify-center items-center font-bold text-xl hover:bg-sky-300"
                  onClick={handleClick}
                >
                  +
                </button>
              )}
              {/* </div> */}
            </div>
          </div>
          {isVisibleAdd && (
            <>
              <div className="border-solid border-b-2 bg-white flex items-center  p-4 justify-between">
                <input
                  type="text"
                  name="todo_list"
                  onChange={(e) => {
                    setValue(e.currentTarget.value);
                  }}
                  placeholder="add your todolist"
                  className=" border-white focus:outline-none"
                  autoFocus
                />
                <button
                  className="flex bg-cyan-600 text-white rounded-full w-10 h-10 justify-center items-center font-bold text-xl hover:bg-sky-300"
                  onClick={handleAddTodoList}
                >
                  +
                </button>
              </div>
            </>
          )}
          <div className="bg-white rounded-b-lg min-h-80">
            <List lists={lists} setLists={setLists} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
