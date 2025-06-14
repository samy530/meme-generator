const gallery = document.getElementById('gallery');
const clearBtn = document.getElementById('clearGallery');
let memes = JSON.parse(localStorage.getItem('memes') || '[]');

function renderGallery() {
  gallery.innerHTML = ''; // Réinitialiser la galerie

  memes.forEach((dataUrl, index) => {
    const container = document.createElement('div');
    container.className = 'meme-item';

    const img = document.createElement('img');
    img.src = dataUrl;
    img.title = `Meme ${index + 1}`;

    // Bouton Supprimer
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️ Supprimer';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => {
      if (confirm("Supprimer ce mème ?")) {
        memes.splice(index, 1);
        localStorage.setItem('memes', JSON.stringify(memes));
        renderGallery();
      }
    };

    // Bouton Télécharger
    const downloadBtn = document.createElement('button');
    downloadBtn.textContent = '⬇️ Télécharger';
    downloadBtn.className = 'download-btn';
    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `meme-${index + 1}.png`;
      a.click();
    };

    // Bouton Partager
    const shareBtn = document.createElement('button');
    shareBtn.textContent = '📤 Partager';
    shareBtn.className = 'share-btn';
    shareBtn.onclick = () => shareMeme(dataUrl);

    // Ajout des boutons
    container.appendChild(img);
    container.appendChild(deleteBtn);
    container.appendChild(downloadBtn);
    container.appendChild(shareBtn);

    gallery.appendChild(container);
  });

  clearBtn.style.display = memes.length > 0 ? 'block' : 'none';
}

// Bouton pour tout supprimer
clearBtn.addEventListener('click', () => {
  if (confirm("⚠️ Supprimer *toute* la galerie ?")) {
    memes = [];
    localStorage.removeItem('memes');
    renderGallery();
  }
});

renderGallery();
