import axios from "axios";
import sharp from "sharp";

const imageConverter = async (imgUrl = "") => {
  const imageResponse = await axios.get(imgUrl, {
    responseType: "arraybuffer",
  });

  const imageResult = await sharp(imageResponse.data)
    .toFormat("png")
    .toBuffer();

  return imageResult;
};

export default imageConverter;
