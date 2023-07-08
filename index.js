import fs from "fs";
import { createCanvas, loadImage } from "canvas";
import { rimraf } from "rimraf";
import ogs from "open-graph-scraper";
import minimist from "minimist";

import { wrapText, registerFonts, slugify } from "./utils.js";
import config from "./config.js";
import getMetaData from "./helpers/getMetaData.js";
import imageConverter from "./helpers/imageConverter.js";
import textSwap from "./helpers/textSwap.js";

// Register custom fonts
registerFonts(config.paths.fonts);

// Delete the directory content and ensure folde exists
rimraf.sync(config.paths.output);
fs.mkdir(config.paths.output, () => {});

const argv = minimist(process.argv.slice(2));
const url = argv.url;
const city = argv.city;
const coordinate = argv.coordinate;

if (url) {
  ogs({
    url,
  })
    .then((data) => {
      const { error, result } = data;

      if (!error) {
        config.canvases.map(async (canvas) => {
          console.log(`Generating images for ${canvas.name}`);

          const imageCover = result.ogImage;
          let imgCoverUrl = imageCover[0].url;

          // Get image metadata
          const meta = await getMetaData(imgCoverUrl);

          // Convert image to png
          const convertedImage = await imageConverter(imgCoverUrl);

          // Generate base canvaas and fill
          const imageCanvas = createCanvas(canvas.width, canvas.height);
          const context = imageCanvas.getContext("2d");

          await loadImage(convertedImage).then((image) => {
            context.drawImage(
              image,
              canvas.layers.background.xPos,
              canvas.layers.background.yPos,
              canvas.width,
              canvas.height
            );

            loadImage(canvas.layers.overlay.image).then((image) => {
              context.drawImage(
                image,
                canvas.layers.overlay.yPos,
                canvas.layers.overlay.xPos,
                canvas.layers.overlay.width,
                canvas.layers.overlay.height
              );

              // Add text items
              canvas.text.map((text, index) => {
                const ogTitle = result.ogTitle.split("|");
                context.font = text.font;
                context.textAlign = "center";
                context.textBaseline = "top";
                context.fillStyle = text.color;
                wrapText(
                  context,
                  textSwap(ogTitle[0], text, index, city, coordinate),
                  canvas.layers.overlay.yPos + canvas.layers.overlay.width / 2,
                  text.pos,
                  text.maxWidth,
                  text.lineHeight
                );
              });

              const targetDir = `./images/${slugify(result.ogTitle)}`;

              if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir);
              }

              fs.writeFileSync(
                `${targetDir}/${canvas.suffix}.png`,
                imageCanvas.toBuffer("image/png")
              );
            });
          });
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
