import axios from "axios";

const deleteTask = async (taskId, token) => {
  try {
    const response = await axios.delete(
      `${process.env.RENDER_API_URL}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error)
    throw error;
  }
};

export default deleteTask;