import axios from "axios";

const getTasksByUser = async (userId, token, orderBy = "id", orderDirection = "ASC") => {
  try {
    const response = await axios.get(
      `${process.env.RENDER_API_URL}/tasks/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
        params: {
          orderBy,
          orderDirection,
        }
      }
    );
    const tasks = response.data;
    return tasks;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default getTasksByUser;