import fs from "fs";
import { registerFont } from "canvas";

const getLines = (content) => content.split(/\r?\n/);

const wrapText = (ctx, text, x, y, maxTextWidth, lineHeight) => {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n += 1) {
    const testLine = `${line + words[n]} `;
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxTextWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = `${words[n]} `;
      // eslint-disable-next-line no-param-reassign
      y += lineHeight * 1.2;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
};

const registerFonts = (path) => {
  fs.readdir(path, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    files.forEach(function (file) {
      const fontName = file.split(".")[0];
      registerFont(`${path}/${file}`, { family: fontName });
    });
  });
};

const slugify = (str) => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export { getLines, wrapText, registerFonts, slugify };
