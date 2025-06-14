const canvas = document.getElementById("memeCanvas");
const ctx = canvas.getContext("2d");
let image = new Image();
let texts = [];
let selectedTextIndex = -1;
let isDragging = false;
let offsetX = 0;
let offsetY = 0;

const imageUpload = document.getElementById("imageUpload");
const textInputs = document.getElementById("textInputs");
const addTextBtn = document.getElementById("addTextBtn");
const downloadBtn = document.getElementById("downloadBtn");
const resetBtn = document.getElementById("resetBtn");

// Charger une image depuis le template sélectionné
const savedTemplate = localStorage.getItem("selectedTemplate");
if (savedTemplate) {
  image.src = savedTemplate;
  localStorage.removeItem("selectedTemplate");
  imageUpload.style.display = "none";
}

imageUpload.addEventListener("change", function () {
  const file = imageUpload.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

image.onload = drawMeme;

addTextBtn.addEventListener("click", () => {
  const index = texts.length;
  const newText = {
    text: `Texte ${index + 1}`,
    x: 150,
    y: 150 + index * 30,
    color: "#000000",
    size: 24,
    rotation: 0
  };
  texts.push(newText);

  const div = document.createElement("div");
  div.className = "text-control";
  div.innerHTML = `
    <input type="text" value="${newText.text}" data-index="${index}">
    <input type="color" value="${newText.color}" data-index="${index}">
    <label>
      Taille :
      <input type="number" value="${newText.size}" min="10" max="72" data-index="${index}" class="font-size">
    </label>
    <label>
      Rotation :
      <input type="number" value="${newText.rotation}" step="1" min="0" max="360" data-index="${index}" class="rotation">
    </label>
    <button class="delete-text" data-index="${index}">🗑️ Supprimer</button>
  `;
  textInputs.appendChild(div);

  div.querySelector('input[type="text"]').addEventListener("input", (e) => {
    texts[e.target.dataset.index].text = e.target.value;
    drawMeme();
  });

  div.querySelector('input[type="color"]').addEventListener("input", (e) => {
    texts[e.target.dataset.index].color = e.target.value;
    drawMeme();
  });

  div.querySelector('.font-size').addEventListener("input", (e) => {
    texts[e.target.dataset.index].size = parseInt(e.target.value);
    drawMeme();
  });

  div.querySelector('.rotation').addEventListener("input", (e) => {
    texts[e.target.dataset.index].rotation = parseFloat(e.target.value) || 0;
    drawMeme();
  });

  div.querySelector('.delete-text').addEventListener("click", (e) => {
    const idx = parseInt(e.target.dataset.index);
    texts.splice(idx, 1);
    textInputs.removeChild(div);

    // Réindexer
    [...textInputs.children].forEach((child, newIndex) => {
      const elements = child.querySelectorAll('[data-index]');
      elements.forEach(el => el.dataset.index = newIndex);
    });

    drawMeme();
  });

  drawMeme();
});

// Déplacement souris
canvas.addEventListener("mousedown", (e) => {
  const { x, y } = getMousePos(e);
  checkTextHit(x, y);
});

canvas.addEventListener("mousemove", (e) => {
  const { x, y } = getMousePos(e);
  if (isDragging && selectedTextIndex !== -1) {
    texts[selectedTextIndex].x = x - offsetX;
    texts[selectedTextIndex].y = y - offsetY;
    drawMeme();
  }
});

canvas.addEventListener("mouseup", () => {
  isDragging = false;
  selectedTextIndex = -1;
});

canvas.addEventListener("mouseleave", () => {
  isDragging = false;
  selectedTextIndex = -1;
});

// Déplacement mobile
canvas.addEventListener("touchstart", (e) => {
  const touch = e.touches[0];
  const { x, y } = getTouchPos(touch);
  checkTextHit(x, y);
});

canvas.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const { x, y } = getTouchPos(touch);
  if (isDragging && selectedTextIndex !== -1) {
    texts[selectedTextIndex].x = x - offsetX;
    texts[selectedTextIndex].y = y - offsetY;
    drawMeme();
  }
});

canvas.addEventListener("touchend", () => {
  isDragging = false;
  selectedTextIndex = -1;
});

function checkTextHit(x, y) {
  for (let i = texts.length - 1; i >= 0; i--) {
    const t = texts[i];
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate((t.rotation * Math.PI) / 180);
    ctx.font = `${t.size}px Arial`;
    const width = ctx.measureText(t.text).width;
    const height = t.size;
    ctx.restore();

    const tx = t.x - width / 2;
    const ty = t.y - height;

    if (x >= tx && x <= tx + width && y >= ty && y <= ty + height) {
      selectedTextIndex = i;
      isDragging = true;
      offsetX = x - t.x;
      offsetY = y - t.y;
      break;
    }
  }
}

function getMousePos(evt) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  };
}

function getTouchPos(touch) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (touch.clientX - rect.left) * scaleX,
    y: (touch.clientY - rect.top) * scaleY
  };
}

function drawMeme() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (image.src) ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  texts.forEach((t) => {
    ctx.save();
    ctx.translate(t.x, t.y);
    ctx.rotate((t.rotation * Math.PI) / 180);
    ctx.font = `${t.size}px Arial`;
    ctx.fillStyle = t.color;
    ctx.textAlign = "center";
    ctx.fillText(t.text, 0, 0);
    ctx.restore();
  });
}

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "meme.png";
  link.href = canvas.toDataURL();
  link.click();

  saveMemeToGallery(canvas.toDataURL());
});

resetBtn.addEventListener("click", () => {
  texts = [];
  textInputs.innerHTML = "";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function saveMemeToGallery(dataUrl) {
  let memes = JSON.parse(localStorage.getItem("memes") || "[]");
  memes.push(dataUrl);
  localStorage.setItem("memes", JSON.stringify(memes));
}