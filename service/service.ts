import axios from "axios";

interface PostInfo {
  front: string;
  back: string;
  image?: string;
  image_extension?: string;
  file_name?: string;
}

axios.defaults.baseURL = "http://localhost:3000";

const getCards = async (page: number, limit: number) => {
  try {
    const cards = await axios.get(`/api/cards/?page=${page}&limit=${limit}`);
    return cards;
  } catch (err) {
    console.error(err);
  }
};

const postCard = async (info: PostInfo) => {
  const { front, back, image, image_extension, file_name } = info;
  try {
    if (image) {
      await axios.post("/api/cards", {
        front,
        back,
        image,
        image_extension,
        file_name,
      });
    } else {
      await axios.post("/api/cards", {
        front,
        back,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteCard = async (id: number) => {
  try {
    await axios.delete(`/api/cards/${id}`);
  } catch (err) {
    console.error(err);
  }
};

export default { getCards, postCard, deleteCard };
