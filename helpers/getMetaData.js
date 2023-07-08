import got from "got";
import { fileTypeFromStream } from "file-type";

const getMetaData = async (url) => {
  const stream = got.stream(url);

  return await fileTypeFromStream(stream);
};

export default getMetaData;
