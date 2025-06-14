function shareMeme(dataUrl) {
  fetch(dataUrl)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], 'meme.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        // Partage sur mobile
        navigator.share({
          files: [file],
          title: 'Mon mème',
          text: 'Regarde ce mème que j’ai créé !'
        }).catch(err => {
          console.error('Erreur de partage mobile :', err);
          alert("Le partage a échoué sur mobile.");
        });
      } else {
        // Partage sur PC via l'API Imgur
        const formData = new FormData();
        formData.append("image", blob);

        fetch("https://api.imgur.com/3/image", {
          method: "POST",
          headers: {
            Authorization: "Client-ID 28453748c813cb5"
          },
          body: formData
        })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const imgurUrl = data.data.link;
            // Copier automatiquement dans le presse-papier
            navigator.clipboard.writeText(imgurUrl).then(() => {
              alert("Lien Imgur copié ! Tu peux maintenant le partager :\n" + imgurUrl);
            });
          } else {
            throw new Error("Erreur Imgur");
          }
        })
        .catch(err => {
          console.error("Erreur lors de l'upload Imgur :", err);
          alert("Le partage a échoué sur PC. Essaie de télécharger le mème manuellement.");
        });
      }
    })
    .catch(err => {
      console.error("Erreur de conversion image:", err);
      alert("Une erreur est survenue lors du traitement de l’image.");
    });
}