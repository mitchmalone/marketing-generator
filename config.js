const config = {
  delay: 1000,
  paths: {
    output: "./images",
    fonts: "./fonts",
    database: "./database.txt",
  },
  canvases: [
    {
      name: "Instagram Feed",
      suffix: `ig-feed`,
      width: 2160,
      height: 1536,
      bgColor: "#ff0000",
      layers: {
        background: {
          width: 2160,
          height: 1536,
          xPos: 0,
          yPos: 0,
        },
        overlay: {
          image: "./overlay.png",
          width: 1080,
          height: 1400,
          xPos: 0,
          yPos: 605,
        },
      },
      text: [
        {
          text: "NEW BLOG POST",
          color: "#023047",
          font: "regular 48px rubik-medium",
          pos: 550,
          maxWidth: 960,
          lineHeight: 48,
        },
        {
          text: "European cities embracing remote work with digital nomad villages",
          color: "#023047",
          font: "regular 90px montserrat",
          pos: 640,
          maxWidth: 960,
          lineHeight: 90,
        },
        {
          text: "Paris France",
          color: "#023047",
          font: "regular 50px rubik-semibold",
          pos: 1136,
          maxWidth: 960,
          lineHeight: 50,
        },
        {
          text: "48°53'18\" N 2°20'12\" E",
          color: "#023047",
          font: "regular 50px rubik-light",
          pos: 1205,
          maxWidth: 960,
          lineHeight: 50,
        },
      ],
    },
    {
      name: "Instagram Story",
      suffix: `ig-story`,
      width: 2160,
      height: 3840,
      bgColor: "#ff0000",
      layers: {
        background: {
          width: 2160,
          height: 1536,
          xPos: 0,
          yPos: 0,
        },
        overlay: {
          image: "./overlay2.png",
          width: 2160,
          height: 2800,
          xPos: 1040,
          yPos: 0,
        },
      },
      text: [
        {
          text: "NEW BLOG POST",
          color: "#023047",
          font: "regular 96px rubik-medium",
          pos: 2098,
          maxWidth: 1800,
          lineHeight: 96,
        },
        {
          text: "European cities embracing remote work with digital nomad villages",
          color: "#023047",
          font: "regular 140px montserrat",
          pos: 2319,
          maxWidth: 1800,
          lineHeight: 160,
        },
        {
          text: "Paris France",
          color: "#023047",
          font: "regular 96px rubik-semibold",
          pos: 3241,
          maxWidth: 1800,
          lineHeight: 96,
        },
        {
          text: "48°53'18\" N 2°20'12\" E",
          color: "#023047",
          font: "regular 72px rubik-light",
          pos: 3373,
          maxWidth: 1800,
          lineHeight: 72,
        },
      ],
    },
  ],
};

export default config;
