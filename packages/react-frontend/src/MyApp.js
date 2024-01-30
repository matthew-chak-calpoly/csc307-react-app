import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function removeOneCharacter(index) {
    const character = characters[index];
    try{
      const deleteResp = await fetch(`http://localhost:8000/users/${character.id}`, {
        method: "DELETE",
      });
      if (deleteResp.status === 204){
        setCharacters(characters.filter((_, i) => i !== index));
      } else {
        console.error("Delete unsuccessful")
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function updateList(person) {
    try {
      const resp = await postUser(person);
      if (resp.status === 201){
        const json = await resp.json();
        setCharacters([...characters, json]);
      } else {
        console.error("Post unsuccessful")
      }
    } catch (error) {
      console.error(error);
    }
  }

  function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, []);

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList}/>
    </div>
  );
}
export default MyApp;