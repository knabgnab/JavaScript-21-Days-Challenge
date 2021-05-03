(() => {
  // เริ่มเขียนโค้ด
  function setup() {
    var pictureElement = document.getElementById("falling-snow-canvas");
    pictureElement.width = window.innerWidth; // window.innerWidth not window.width(undefined)
    pictureElement.height = window.innerHeight;
    console.log(
      `innerWidth * innerHeight: ${window.innerWidth} * ${window.innerHeight}`
    );
    return {
      ctx: pictureElement.getContext("2d"),
      snowballNumber: 250,
      maxWidth: window.innerWidth,
      maxHeight: window.innerHeight,
    };
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getSnowData(maxWidth, maxHeight) {
    return {
      xPlot: getRndInteger(0, maxWidth),
      yPlot: getRndInteger(0, maxHeight),
      snowSize: getRndInteger(1, 5),
      opacity: getRndInteger(0.5, 1),
      xSpeed: getRndInteger(-5, 5),
      ySpeed: getRndInteger(1, 3),
    };
  }

  function plotSnowStart(ctx) {
    return ({ xPlot, yPlot, snowSize, opacity }) => {
      // console.log(`moveing ${xPlot}, ${yPlot}`)
      ctx.beginPath();
      ctx.arc(xPlot, yPlot, snowSize, 0, Math.PI * 2, true);
      ctx.fillStyle = `rgba(250, 250, 250, ${opacity})`;
      ctx.fill();
    };
  }

  function plotSnowMoving() {
    return (snow) => {
      snow.xPlot += snow.xSpeed;
      snow.yPlot += snow.ySpeed;

      if (snow.xPlot > window.innerWidth) {
        snow.xPlot = 0;
      } else if (snow.xPlot < 0) {
        snow.xPlot = window.innerWidth;
      }
      if (snow.yPlot > window.innerHeight) {
        snow.yPlot = 0;
      }
    };
  }
  function run() {
    const { ctx, maxWidth, maxHeight, snowballNumber } = setup();
    const snowData = [...Array(snowballNumber)].map(() =>
      getSnowData(maxWidth, maxHeight)
    );
    const plotSnow = plotSnowStart(ctx);
    const moveSnow = plotSnowMoving();

    setInterval(function () {
      ctx.clearRect(0, 0, maxWidth, maxHeight);
      snowData.forEach(plotSnow);
      snowData.forEach(moveSnow);
    }, 50);
  }

  run();
})();
