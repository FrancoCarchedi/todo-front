import axios from "axios";

const getTasksById = async (taskId, token) => {
  try {
    const response = await axios.get(
      `${process.env.RENDER_API_URL}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    );
    const task = response.data;
    return task;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default getTasksById;