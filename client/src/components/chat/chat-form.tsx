"use client";
import React, { useEffect } from "react";

const ChatForm = ({ roomId }) => {
  useEffect(() => {
    document.cookie = "roomId=" + roomId + "; path=/";
    const socket = new WebSocket("ws://localhost:9999/noti");

    const addMessage = (message) => {
      console.log("message added", message);
      // Create an element for message
      const el = document.createElement("h3");

      // Set text of element to be message
      el.appendChild(
        document.createTextNode(message.username + ": " + message.text)
      );

      // Scroll to bottom of messages element
      const messagesEl = document.getElementById("messages");
      messagesEl.appendChild(el);
      messagesEl.scrollTo(0, messagesEl.scrollHeight);
    };

    const setMessages = (messages) => {
      // Clear messages
      document.getElementById("messages").innerHTML = "";
      // Loop through and add each message
      messages.forEach((message) => addMessage(message));
    };

    const addUser = (username) => {
      // Create an element for username
      const el = document.createElement("h4");

      // Set id of element for easy remove
      el.setAttribute("id", username);

      el.appendChild(document.createTextNode(username));
      document.getElementById("users").appendChild(el);
    };

    const removeUser = (username) => {
      document.getElementById(username).outerHTML = "";
    };

    const setUsers = (usernames) => {
      // Clear usernames
      document.getElementById("users").innerHTML = "";
      // Loop through and add each username
      usernames.forEach((username) => addUser(username));
    };

    // Listen for messages
    socket.addEventListener("message", (e) => {
      // Data sent will be a string so parse into an object
      const event = JSON.parse(e.data);
      console.log("event message", event);

      // Server sets a type for each message
      switch (event.type) {
        case "MESSAGES_ADD":
          addMessage(event.data);
          break;
        case "MESSAGES_SET":
          setMessages(event.data);
          break;
        case "USERS_ADD":
          addUser(event.data);
          break;
        case "USERS_REMOVE":
          removeUser(event.data);
          break;
        case "USERS_SET":
          setUsers(event.data);
          break;
      }
    });

    document.getElementById("form").addEventListener("submit", (event) => {
      // Prevent from submitting page
      event.preventDefault();

      const el = event.target.getElementsByTagName("input")[0];

      // Send the message text
      socket.send(
        JSON.stringify({
          text: el.value,
        })
      );

      // Clear the input
      el.value = "";
    });
  }, []);

  return (
    <>
      <body>
        <div className="chat-window">
          <div id="messages"></div>
          <div id="users"></div>
        </div>
        <form className="chat-box" id="form">
          <input name="text" placeholder="Message" />
          <button type="submit">Submit</button>
        </form>
      </body>
    </>
  );
};

export default ChatForm;
