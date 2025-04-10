import { User } from "@/types/user";

// temporary user storage

let users: User[] = [
  {
    id: 0,
    name: "John Doe",
    username: "luke",
    password: "$2b$10$JiwvGdgXJTZESTZJgVpImOsUFK17TCwWy/Q.HJsvnN3mlN3T6FC3K", // "Password"
  },
];
let userIndex = 1;

// Function to get all users
export const getDBUsers = () => {
  return users;
};

// Function to create a new user
export const createDBUser = (
  name: string,
  username: string,
  password: string
) => {
  const newUser: User = { id: userIndex, name, username, password };
  userIndex++;
  users.push(newUser);
  console.log(`User created: ${username}`);
  return { id: newUser.id, name: newUser.name, username: newUser.username };
};

// Function to find a user by username
export const findUserByUsername = (username: string) => {
  return users.find((user) => user.username === username);
};

// Function to find a user by ID
export const findUserById = (id: number) => {
  return users.find((user) => user.id === id);
};
