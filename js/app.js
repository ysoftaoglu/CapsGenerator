// Variables
let canvas = document.querySelector('.jsCanvas'),
  ctx = canvas.getContext('2d'),
  jsCaptionInput = document.querySelector('.jsCaptionInput'),
  captionText = document.querySelector('.jsCaptionInput').value,
  saveButton = document.querySelector('.jsSaveImage'),
  jsFileInput = document.querySelector('.jsFileInput'),
  jsCaptionBg = document.querySelector('.jsCaptionBg'),
  jsCaptionBgVal = document.querySelector('.jsCaptionBg').value,
  flag = 0;

// Canvas Styling
ctx.font = "15px Arial";
ctx.textAlign = "center";
ctx.fillStyle = '#fff';

// Create Image
let image = new Image();
image.src = 'https://ysoftaoglu.github.io/CapsGeneretor/img/caps.png';

// Positions
let posOption = {
  image: {
    width: 550,
    height: 450
  },
  caption: {
    x: 0,
    y: 350,
    width: 500,
    height: 50
  },
  text: {
    x: 250,
    y: 380
  }
};

// Write Text
function writeText(text, captionBg) {
  captionBg = captionBg || '#ff0000';
  text = text || "200 Tl'ye Site Yapılır.";
  ctx.fillStyle = captionBg;
  ctx.fillRect(posOption.caption.x, posOption.caption.y, posOption.caption.width, posOption.caption.height);
  ctx.fillStyle = '#fff';
  ctx.fillText(text, posOption.text.x, posOption.text.y);
}

// Draw Function
function drawImage(captionText, img, captionBg) {
  ctx.drawImage(img, 0, 0, posOption.image.width, posOption.image.height);
  writeText(captionText, captionBg);
}

// Image Loaded
image.onload = () => {
  ctx.drawImage(image, 0, 0, posOption.image.width, posOption.image.height);
  writeText(captionText);
};

// Image Uploaded
jsFileInput.addEventListener('change', () => {
  flag = 0;
  let img = document.querySelector('input[type=file]').files[0];
  let reader = new FileReader();

  if (img) {
    reader.readAsDataURL(img);
  }
  reader.onloadend = () => {
    jsCaptionBg.value = '#ff0000';
    captionText = document.querySelector('.jsCaptionInput').value;
    image.src = reader.result;
    drawImage(captionText, image, jsCaptionBg);
  }
});

// Save As Image
saveButton.addEventListener('click', (e) => {
  if (jsCaptionInput.value !== '') {
    captionText = '';
    jsCaptionBgVal = '#ff0000';
    let downloadLink = document.querySelector('.jsDownloadLink');
    downloadLink.href = canvas.toDataURL();
    downloadLink.download = 'caps.png';
  } else {
    e.preventDefault();
    document.querySelector('.jsError').style.display = 'inline-block';
  }
});

// Caption Text Change
jsCaptionInput.addEventListener('keyup', function () {
  document.querySelector('.jsError').style.display = 'none';
  captionText = this.value;
  jsCaptionBgVal = flag ? jsCaptionBgVal : '#ff0000';
  drawImage(captionText, image, jsCaptionBgVal);
});

// Caption Bg Change
jsCaptionBg.addEventListener('change', function () {
  flag = 1;
  jsCaptionBgVal = this.value;
  drawImage(captionText, image, jsCaptionBgVal);
});
