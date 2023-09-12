let canvas, ctx, video;
const color = [181, 12, 85];

function main() {
    canvas = document.querySelector("#camera");
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (rawData) {
            video = document.createElement("video");
            video.srcObject = rawData;
            video.play();
            video.onloadeddata = animate;
        })
        .catch(function (error) { alert(error) })
}

function animate() {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const locations = getLocationsWithColor(imgData, { r: 255, g: 0, b: 0 });

    ctx.fillStyle = "yellow";
    locations.forEach(loc => {
        ctx.fillRect(loc.x, loc.y, 1, 1);
    })
    requestAnimationFrame(animate);
}

function getLocationsWithColor(imgData, color) {
    const locations = [];

    for (let i = 0; i < imgData.data.length; i += 4) {
        const pxColor = {
            r: imgData.data[i],
            g: imgData.data[i + 1],
            b: imgData.data[i + 2]
        };

        const pxIndex = i / 4;

        const pxLocation = {
            x: pxIndex % imgData.width,
            y: Math.floor(pxIndex / imgData.width)
        }

        if (colorsMatch(pxColor, color)) {
            locations.push(pxLocation);
        }
    }
    return locations;
}

function colorsMatch(pxColor, color, threshold = 160) {
    return sqDistance(pxColor, color) < threshold ** 2;
}

function sqDistance(pxColor, color) {
    return (pxColor.r - color.r) ** 2 +
        (pxColor.g - color.g) ** 2 +
        (pxColor.b - color.b) ** 2
}