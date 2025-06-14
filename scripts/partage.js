function shareMeme(dataUrl) {
  const base64Image = dataUrl.split(',')[1];

  fetch("https://api.imgur.com/3/image", {
    method: "POST",
    headers: {
      Authorization: "Client-ID ab155f96c1e9c66",  
      Accept: "application/json",
    },
    body: new URLSearchParams({
      image: base64Image,
      type: "base64"
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      const imageUrl = data.data.link;
      prompt("Voici le lien de ton mème (à copier et partager) :", imageUrl);
    } else {
      alert("Erreur lors de l’upload. Réessaie.");
    }
  })
  .catch(err => {
    console.error("Erreur Imgur :", err);
    alert("Une erreur est survenue.");
  });
}
