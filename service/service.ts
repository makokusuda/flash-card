import axios from "axios";

interface PostInfo {
  front: string;
  back: string;
  image: string;
  image_extension: string;
  file_name: string;
}

axios.defaults.baseURL = "http://localhost:3000";

const getCards = async (page: number, limit: number) => {
  const cards = await axios.get(`/api/cards/?page=${page}&limit=${limit}`);
  return cards;
};

const postCard = async (info: PostInfo) => {
  const { front, back, image, image_extension, file_name } = info;

  await axios.post("/api/cards", {
    front,
    back,
    image,
    image_extension,
    file_name,
  });
};

export default { getCards, postCard };
