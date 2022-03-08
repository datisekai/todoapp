import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "../index.css";
import Ticket from "./Ticket";
import swal from "sweetalert";

const TodoList = () => {
  const [content, setContent] = useState({
    todos: {
      key: "todos",
      tickets: [
        {
          id: uuidv4(),
          text: "Zontrax",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "todos",
        },
        {
          id: uuidv4(),
          text: "Stronghold",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "todos",
        },
        {
          id: uuidv4(),
          text: "Viva",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "todos",
        },
      ],
    },
    inProgress: {
      key: "in-progress",
      tickets: [
        {
          id: uuidv4(),
          text: "Zontrax",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "in-progress",
        },
        {
          id: uuidv4(),
          text: "Tin",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "in-progress",
        },
      ],
    },
    done: {
      key: "done",
      tickets: [
        {
          id: uuidv4(),
          text: "Namfix",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "done",
        },
        {
          id: uuidv4(),
          text: "Bitwolf",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "done",
        },
      ],
    },
    needReview: {
      key: "need-review",
      tickets: [
        {
          id: uuidv4(),
          text: "Cardguard",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "need-review",
        },
        {
          id: uuidv4(),
          text: "Trippledex",
          createdDate: (new Date()).toISOString(),
          currentColumnKey: "need-review",
        },
      ],
    },
  });

  const [text, setText] = useState("");

  const handleAddToDo = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      swal("Oops", "Please enter content for ticket!", "error");
    } else if (text.trim().length < 4) {
      swal("Oops", " Please enter at least 4 characters!", "error");
    } else {
      const objNew = {
        ...content,
        todos: {
          ...content.todos,
          tickets: [
            ...content.todos.tickets,
            {
              id: uuidv4(),
              text,
              createdDate: (new Date()).toISOString(),
              currentColumnKey: "todos",
            },
          ],
        },
      };
      setContent(objNew);
      swal("Successfull", "Add successfull", "success");
      setText("");
    }
  };

  const handleMove = (currentColumnkey, targetColumnKey, id) => {
    const currentTicket = content[currentColumnkey].tickets.filter(
      (item) => item.id === id
    );

    const newTickets = content[currentColumnkey].tickets.filter(
      (item) => item.id !== id
    );

    setContent({
      ...content,
      [currentColumnkey]: { ...content[currentColumnkey], tickets: newTickets },
      [targetColumnKey.key]: {
        ...content[targetColumnKey.key],
        tickets: [
          ...content[targetColumnKey.key].tickets,
          { ...currentTicket[0], key: targetColumnKey.todos,currentColumnKey:targetColumnKey.todos },
        ],
      },
    });
  };

  const handleDelete = (currentColumnKey, id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        const newTickets = content[currentColumnKey].tickets.filter(
          (item) => item.id !== id
        );
        setContent({
          ...content,
          [currentColumnKey]: {
            ...content[currentColumnKey],
            tickets: newTickets,
          },
        });
      }
    });
  };

  const handleEdit = (currentColumnKey, id, text, e) => {
    e.preventDefault();
    if (!text.trim()) {
      swal("Oops", "Please enter content for ticket!", "error");
    } else if (text.trim().length < 4) {
      swal("Oops", " Please enter at least 4 characters!", "error");
    } else {
      const newTickets = content[currentColumnKey].tickets.map((item) =>
        item.id === id ? { ...item, text, lastModifiedDate: (new Date()).toISOString() } : item
      );
      setContent({
        ...content,
        [currentColumnKey]: {
          ...content[currentColumnKey],
          tickets: newTickets,
        },
      });
    }
  };

  return (
    <div className="bg-[#222222]">
      <div className="max-w-[1200px] mx-auto flex justify-center items-center flex-col min-h-screen p-5">
        <div className="bg-[#2a2a2a] p-5 rounded-md mt-5 w-full">
          <form
            onSubmit={(e) => handleAddToDo(e)}
            className="flex flex-col justify-between md:flex-row"
          >
            <input
              type="textarea"
              placeholder="Enter to do..."
              className="px-5 py-1 bg-transparent border-b w-full md:w-[80%] outline-none text-gray-100 border-blue-400 rounded-md"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="submit"
              className="px-5 py-1 mt-3 md:mt-0 rounded-md w-full md:w-[20%] text-gray-100 bg-blue-500 border hover:bg-blue-700 transition-all"
              onClick={(e) => handleAddToDo(e)}
            >
              Add to do
            </button>
          </form>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-[#2a2a2a] p-5 rounded-md">
            <h1 className="under-gra rounded-md text-gray-100 text-xl uppercase">
              TODO
            </h1>
            {content.todos.tickets &&
              content.todos.tickets.map((item) => (
                <Ticket
                  ticket={item}
                  ticketKey={"todos"}
                  key={item.id}
                  handleMove={handleMove}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
          </div>

          <div className="bg-[#2a2a2a] p-5 rounded-md">
            <h1 className="under-gra rounded-md text-gray-100 text-xl uppercase">
              In-progress
            </h1>
            {content.inProgress.tickets &&
              content.inProgress.tickets.map((item) => (
                <Ticket
                  ticket={item}
                  ticketKey={"inProgress"}
                  key={item.id}
                  handleMove={handleMove}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
          </div>

          <div className="bg-[#2a2a2a] p-5 rounded-md">
            <h1 className="under-gra rounded-md text-gray-100 text-xl uppercase">
              Done
            </h1>
            {content.done.tickets &&
              content.done.tickets.map((item) => (
                <Ticket
                  ticket={item}
                  ticketKey={"done"}
                  key={item.id}
                  handleMove={handleMove}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
          </div>

          <div className="bg-[#2a2a2a] p-5 rounded-md">
            <h1 className="under-gra rounded-md text-gray-100 text-xl uppercase">
              Need-review
            </h1>
            {content.needReview.tickets &&
              content.needReview.tickets.map((item) => (
                <Ticket
                  ticket={item}
                  ticketKey={"needReview"}
                  key={item.id}
                  handleMove={handleMove}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
