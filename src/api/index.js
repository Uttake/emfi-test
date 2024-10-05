import axios from "axios";

export const getInfo = async (url) => {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    });
    if (res) {
      return res.data;
    }
  } catch (error) {
    throw new Error(`Ошибка при получении данных: ${error.message}`);
  }
};
