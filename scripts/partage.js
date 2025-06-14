
function shareMeme(dataUrl) {
  fetch(dataUrl)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'meme.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        // ✅ Partage mobile natif (Android/iOS)
        navigator.share({
          files: [file],
          title: 'Mon mème',
          text: 'Regarde ce mème que j’ai créé !'
        }).catch(err => {
          console.error('Erreur de partage mobile :', err);
          alert("Le partage a échoué sur mobile.");
        });
      } else {
        // ✅ Fallback pour PC : créer un lien temporaire blob
        const blobUrl = URL.createObjectURL(blob);

        const input = document.createElement("input");
        input.value = blobUrl;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);

        alert("Lien temporaire copié ! Tu peux maintenant le coller pour partager l’image.");
      }
    })
    .catch(err => {
      console.error("Erreur de conversion image:", err);
      alert("Une erreur est survenue lors du traitement de l’image.");
    });
}