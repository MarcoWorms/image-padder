const fileInput = document.getElementById('file-input');
const paddingColor = document.getElementById('padding-color');
const targetWidthInput = document.getElementById('target-width');
const targetHeightInput = document.getElementById('target-height');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const downloadButton = document.getElementById('download-button');

let currentImage = null;

function padImage() {
  if (!currentImage) return;

  const targetWidth = parseInt(targetWidthInput.value, 10);
  const targetHeight = parseInt(targetHeightInput.value, 10);

  // Update canvas size
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  // Calculate the new dimensions while maintaining the aspect ratio
  let newWidth = currentImage.width;
  let newHeight = currentImage.height;

  if (currentImage.width > targetWidth || currentImage.height > targetHeight) {
    const scaleFactor = Math.min(targetWidth / currentImage.width, targetHeight / currentImage.height);
    newWidth = currentImage.width * scaleFactor;
    newHeight = currentImage.height * scaleFactor;
  }

  const paddingX = (targetWidth - newWidth) / 2;
  const paddingY = (targetHeight - newHeight) / 2;

  ctx.fillStyle = paddingColor.value;
  ctx.fillRect(0, 0, targetWidth, targetHeight);
  ctx.drawImage(currentImage, paddingX, paddingY, newWidth, newHeight);

  canvas.style.display = 'block';
  downloadButton.style.display = 'block';
}

function handleImageUpload() {
  currentImage = new Image();
  currentImage.src = URL.createObjectURL(fileInput.files[0]);
  currentImage.onload = padImage;
}

function downloadPaddedImage() {
  const link = document.createElement('a');
  link.href = canvas.toDataURL('image/png');
  link.download = 'padded_image.png';
  link.click();
}

fileInput.addEventListener('change', handleImageUpload);
paddingColor.addEventListener('input', padImage);
targetWidthInput.addEventListener('input', padImage);
targetHeightInput.addEventListener('input ', padImage);
downloadButton.addEventListener('click', downloadPaddedImage);
