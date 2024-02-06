import React, { useState } from "react";

export type ListProps = {
  lists: {
    id: number;
    list: string;
    isFinished: boolean;
  }[];
  setLists: any;
};

function List({ lists, setLists }: ListProps) {
  const [editValue, setEditValue] = useState("");
  const [editid, setEditId] = useState(0);

  const onCheckedList = (id: number) => {
    setLists(
      lists.map((list) => {
        if (list.id === id) {
          return { ...list, isFinished: !list.isFinished };
        }
        return list;
      })
    );
  };

  const handleDeleteTodoList = (id: number) => {
    setLists(lists.filter((todo) => todo.id !== id));
  };

  const handleEditTodoList = (id: number) => {
    const todoList = lists.find((list) => list.id === id);

    setEditId(id);
    setEditValue(todoList?.list || "");
  };

  const handleSaveEditTodoList = (id: number) => {
    setLists(
      lists.map((list) => {
        if (list.id === id) {
          return { ...list, list: editValue };
        }
        return list;
      })
    );
    cancelEditTodoList();
  };

  const cancelEditTodoList = () => {
    setEditId(0);
    setEditValue("");
  };

  return (
    <ul role="list">
      {lists?.map((list, key) => (
        <li key={key}>
          <div className="text-slate-900 flex space-x-2 p-4 justify-between items-center ">
            <div className="flex space-x-2">
              <input
                type="checkbox"
                key={list.id}
                checked={list.isFinished}
                onChange={() => onCheckedList(list.id)}
              />
              <div className="ml-10">
                {list.id === editid ? (
                  <div className="border-solid border-b-1">
                    <input
                      type="text"
                      name="todo_list"
                      value={editValue}
                      onChange={(e) => {
                        setEditValue(e.currentTarget.value);
                      }}
                      className=" border-white focus:outline-none"
                      autoFocus
                    />
                  </div>
                ) : list.isFinished ? (
                  <p className="line-through">{list.list}</p>
                ) : (
                  <p>{list.list}</p>
                )}
              </div>
            </div>

            <div className="flex space-x-1">
              {list.id === editid ? (
                <>
                  <button
                    className="flex bg-yellow-500 text-white rounded-full w-8 h-8 justify-center items-center text-lg"
                    onClick={() => handleSaveEditTodoList(list.id)}
                  >
                    s
                  </button>
                  <button
                    className="flex bg-red-400 text-white rounded-full w-8 h-8 justify-center items-center text-lg"
                    onClick={cancelEditTodoList}
                  >
                    x
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="flex bg-yellow-500 text-white rounded-full w-8 h-8 justify-center items-center text-lg"
                    onClick={() => handleEditTodoList(list.id)}
                  >
                    !
                  </button>
                  <button
                    className="flex bg-red-400 text-white rounded-full w-8 h-8 justify-center items-center font-bold text-lg"
                    onClick={() => handleDeleteTodoList(list.id)}
                  >
                    -
                  </button>
                </>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default List;
