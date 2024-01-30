import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByJob = (job) => {
    return users["users_list"].filter((user) => user["job"] === job);
};

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const removeUserById = (id) => {
  if (findUserById(id) === undefined) {
    return false;
  }
  const newUsers = users["users_list"].filter((user) => user["id"] !== id);
  users["users_list"] = newUsers;
  return true;
}

function generateId(){
    return Math.random().toString(36).substr(2, 9);
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  let finalUsers = [];
  if (name == undefined && job == undefined) {
    finalUsers = users["users_list"];
  }
  if (job != undefined) {
    finalUsers = findUserByJob(job);
  }
  if (name != undefined) {
    const usersWithName = findUserByName(name);
    if (finalUsers.length === 0) {
      finalUsers = usersWithName;
    } else {
        finalUsers = finalUsers.filter((user) =>
            usersWithName.includes(user)
        );
    }
  } 
  res.send({ users_list : finalUsers });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userToAdd["id"] = generateId();
  addUser(userToAdd);
  res.status(201).send(userToAdd);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    res.status(removeUserById(id) ? 204 : 404).send();
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
