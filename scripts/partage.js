function shareMeme(dataUrl) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = "meme.png";

  // Créer un lien visible pour copier
  const shareLink = document.createElement("input");
  shareLink.value = dataUrl;
  shareLink.readOnly = true;
  shareLink.style.width = "100%";

  document.body.appendChild(shareLink);
  shareLink.select();
  document.execCommand("copy");
  document.body.removeChild(shareLink);

  alert("Lien copié dans le presse-papiers ! Tu peux maintenant le partager.");
}
