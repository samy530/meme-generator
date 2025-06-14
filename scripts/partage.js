function shareMeme(dataUrl) {
  try {
    // Conversion manuelle du dataURL en blob
    const byteString = atob(dataUrl.split(',')[1]);
    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });

    const file = new File([blob], 'meme.png', { type: 'image/png' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        files: [file],
        title: 'Mon mème',
        text: 'Regarde ce mème que j’ai créé !'
      }).catch(err => {
        console.error('Erreur de partage mobile :', err);
        alert("Le partage a échoué sur mobile.");
      });
    } else {
      const formData = new FormData();
      formData.append("image", blob);

      fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${CONFIG?.IMGUR_CLIENT_ID}`
        },
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            const imgurUrl = data.data.link;
            navigator.clipboard.writeText(imgurUrl)
              .then(() => {
                alert("Lien Imgur copié ! Tu peux maintenant le partager :\n" + imgurUrl);
              })
              .catch(() => {
                alert("Lien Imgur : " + imgurUrl);
              });
          } else {
            throw new Error("Erreur Imgur");
          }
        })
        .catch(err => {
          console.error("Erreur Imgur :", err);
          alert("Le partage a échoué sur PC. Essaie de télécharger le mème manuellement.");
        });
    }
  } catch (err) {
    console.error("Erreur traitement image :", err);
    alert("Une erreur est survenue lors du traitement de l’image.");
  }
}
