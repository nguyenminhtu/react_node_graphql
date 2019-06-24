import { createWriteStream } from "fs";
import * as mkdirp from "mkdirp";
import slugify from "slugify";

import Image from "../models/Image";

const uploadDir = "./uploads";
mkdirp.sync(uploadDir);

const storeUpload = async ({ stream, filename }: any): Promise<any> => {
  const path = `${uploadDir}/${slugify(filename)}-${Date.now()}`;

  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on("finish", () => resolve({ path }))
      .on("error", reject)
  );
};

const recordFile = async (path: any) => {
  const image: any = await Image.create({ path });
  return { path: image.path };
};

export const processUpload = async (file: any) => {
  const { createReadStream, filename } = await file;
  const stream = createReadStream();
  const { path } = await storeUpload({ stream, filename });
  return recordFile(path);
};
