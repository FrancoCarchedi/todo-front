import axios from "axios";

const createTask = async (taskName, userId, token) => {
  try {
    const response = await axios.post(
      `${process.env.RENDER_API_URL}/tasks`,
      {
        name: taskName,
        status: "pending",
        userId: userId
      },
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

export default createTask;