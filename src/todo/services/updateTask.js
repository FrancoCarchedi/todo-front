import axios from "axios";

const updateTask = async (taskId, taskData, token) => {
  try {
    const response = await axios.patch(
      `${process.env.RENDER_API_URL}/tasks/${taskId}`,
      taskData,
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

export default updateTask;