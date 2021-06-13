import Service from "@/services/service";

const uploadImage = async (fileInfo, front, back, id, method) => {
  let service;
  method === "post"
    ? (service = Service.postCard)
    : (service = Service.putCard);

  if (fileInfo) {
    const image_extension = fileInfo.type.split("/")[1];
    const reader = new FileReader();
    reader.readAsDataURL(fileInfo);
    reader.onload = async () => {
      const image = String(reader.result).split(",")[1];
      await service({
        front,
        back,
        image,
        image_extension,
        file_name: fileInfo.name,
        id,
      });
    };
  } else {
    await service({
      front,
      back,
      id,
    });
  }
};

export default uploadImage;
