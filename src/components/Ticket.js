import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Ticket = ({
  ticket,
  handleMove,
  ticketKey,
  handleDelete,
  handleEdit,
}) => {
  const buttonArray = [
    { todos: "todos", key: "todos", id: uuidv4() },
    { todos: "in-progress", key: "inProgress", id: uuidv4() },
    { todos: "done", key: "done", id: uuidv4() },
    { todos: "need-review", key: "needReview", id: uuidv4() },
    { todos: "delete", key: "delete", id: uuidv4() },
    { todos: "edit", key: "edit", id: uuidv4() },
  ];
  const buttonRender =
    ticket &&
    buttonArray.filter((item) => item.todos !== ticket.currentColumnKey);

  const [flagText, setFlagText] = useState(false);
  const [text, setText] = useState("");
  return (
    <div className="border-b border-blue-400 py-2 mt-2">
      <p className="text-gray-100 uppercase">
        id: <span className="text-blue-400">{ticket.id}</span>
      </p>
      {!flagText ? (
        <p className="text-gray-100 uppercase">
          Text: <span className="text-blue-400">{ticket.text}</span>
        </p>
      ) : (
        <div className="flex justify-between items-center">
          <form>
            <input
              className="bg-transparent border-b px-4 py-1 w-[70%] border-blue-400 outline-none text-gray-100"
              placeholder="Enter your new text.."
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></input>
            <button
              type="submit"
              onClick={(e) => {
                setFlagText(false);
                return handleEdit(ticketKey, ticket.id, text, e);
              }}
              className="bg-blue-400 px-4 py-1 w-[30%] text-gray-100 hover:bg-blue-700 transition-all rounded-md"
            >
              Edit
            </button>
          </form>
        </div>
      )}
      <p className="text-gray-100 uppercase">
        createdDate: <span className="text-blue-400">{ticket.createdDate}</span>
      </p>
      {ticket.lastModifiedDate && (
        <p className="text-gray-100 uppercase">
          lastModifiedDate:{" "}
          <span className="text-blue-400">{ticket.createdDate}</span>
        </p>
      )}
      <p className="text-gray-100 uppercase">
        currentColumnKey:{" "}
        <span className="text-blue-400">{ticket.currentColumnKey}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 mt-2">
        {buttonRender &&
          buttonRender.map((item) => (
            <button
              key={item.id}
              onClick={
                item.key === "edit"
                  ? () => {
                      setFlagText(!flagText);
                      return () => handleEdit(ticketKey, ticket.id, text);
                    }
                  : item.key === "delete"
                  ? () => handleDelete(ticketKey, ticket.id)
                  : () => handleMove(ticketKey, item, ticket.id)
              }
              className={`px-5 py-1 text-gray-100 bg-blue-500 m-2 rounded-md hover:bg-blue-700 transition-all truncate uppercase text-sm ${
                item.key === "edit"
                  ? "bg-gradient-to-r from-yellow-400 to-red-400"
                  : item.key === "delete"
                  ? "bg-gradient-to-r from-red-400 to-yellow-400"
                  : "bg-gradient-to-r from-gray-400 to-blue-400"
              }`}
            >
              {item.todos}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Ticket;
