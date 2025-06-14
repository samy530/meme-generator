function shareMeme(dataUrl) {
  fetch(dataUrl)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'meme.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: 'Mon meme',
          text: 'Regarde ce meme que j\'ai créé !'
        });
      } else {
        alert('Partage non supporté sur ce navigateur. Essaie depuis ton smartphone.');
      }
    })
    .catch(err => {
      console.error("Erreur lors du partage :", err);
      alert("Une erreur est survenue.");
    });
}
