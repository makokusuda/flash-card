import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000";

const getCards = async () => {
  const cards = await axios.get("/api/cards");
  return cards;
};

const postCard = async (front, back, image, image_extension, file_name) => {
  await axios.post("/api/cards", {
    front,
    back,
    image,
    image_extension,
    file_name,
  });
};

export default { getCards, postCard };
