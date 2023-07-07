const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const rimraf = require('rimraf');
const utils = require('./utils');
const config = require('./config');

// Configuration
let throttle = 0;

// Register custom fonts
utils.registerFonts(config.paths.fonts)

// Delete the directory content and ensure folde exists
rimraf.sync(config.paths.output);
fs.mkdir(config.paths.output, () => {});

// Read the database file and get all the lines in an array
const databaseContent = fs.readFileSync(config.paths.database, { encoding: 'utf8', flag: 'r' });
const lines = utils.getLines(databaseContent);

lines.forEach((line) => {
  setTimeout(() => {
    config.canvases.map(canvas => {
      console.log(`Generating images for ${canvas.name}`);

      // Generate base canvaas and fill
      const imageCanvas = createCanvas(canvas.width,canvas.height);
      const context = imageCanvas.getContext('2d');

      // loadImage(config.paths.backgroundImage).then((image) => {
      loadImage(canvas.layers.background.image).then((image) => {
        context.drawImage(image, canvas.layers.background.xPos, canvas.layers.background.yPos, canvas.width, canvas.height);

        loadImage(canvas.layers.overlay.image).then((image) => {
          context.drawImage(image, canvas.layers.overlay.yPos, canvas.layers.overlay.xPos, canvas.layers.overlay.width, canvas.layers.overlay.height);

          // Add text items
          canvas.text.map(text => {
            context.font = text.font;
            context.textAlign = 'center';
            context.textBaseline = 'top';
            context.fillStyle = text.color;
            utils.wrapText(
              context,
              text.text,
              canvas.layers.overlay.yPos + (canvas.layers.overlay.width / 2),
              text.pos,
              text.maxWidth,
              text.lineHeight
            );
          })

          fs.writeFileSync(
            `./images/test${canvas.suffix}.png`,
            imageCanvas.toBuffer('image/png'),
          );
        });
      })
    });
  }, throttle);

  throttle += config.delay;
});