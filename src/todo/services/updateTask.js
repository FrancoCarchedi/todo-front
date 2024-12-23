import axios from "axios";

const cleanTaskData = (data) => {
  // Filtra los campos con valores no válidos
  return Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== undefined && value !== null && value !== '')
  );
};

const updateTask = async (taskId, taskData, token) => {
  try {
    const cleanedData = cleanTaskData(taskData);

    const response = await axios.patch(
      `${process.env.RENDER_API_URL}/tasks/${taskId}`,
      cleanedData,
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