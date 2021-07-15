import axios from "axios";
const API_URL = `https://api.github.com`;

const getUser = async user => {
  const { data } = await axios.get(`${API_URL}/users/${user}`);
  return data;
};

const getUserFollowing = async user => {
  const { data } = await axios.get(`${API_URL}/users/${user}/following`);
  return data;
};

export { getUser, getUserFollowing };
