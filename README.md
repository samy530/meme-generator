# 🎨 Générateur de Mèmes en Ligne

Un générateur de mèmes interactif et moderne, accessible depuis un navigateur web.  
Permet aux utilisateurs de créer des mèmes personnalisés en ajoutant du texte, en déplaçant les éléments, puis en téléchargeant ou partageant leur création.

🔗 **Démo en ligne :** [https://samy530.github.io/meme-generator/](https://samy530.github.io/meme-generator/)

---

## 🖼️ Fonctionnalités

- 📥 **Téléversement d’images** : depuis l’ordinateur ou via des modèles prédéfinis
- ✍️ **Ajout de textes personnalisables** : taille, couleur, rotation, position
- 🖱️📱 **Déplacement du texte** : à la souris ou au doigt (support mobile)
- 👀 **Aperçu en temps réel** via l’API Canvas
- 💾 **Sauvegarde locale** des mèmes créés
- 🖼️ **Galerie intégrée** avec gestion (supprimer, télécharger, partager)
- 📤 **Partage natif** via Web Share API (mobile) ou **upload en ligne** via Imgur (PC)

---

## 🛠️ Technologies utilisées

| Technologie       | Rôle                                                   |
|-------------------|--------------------------------------------------------|
| **HTML5**         | Structure des pages [[1]](#sources)                    |
| **CSS3**          | Mise en forme, responsive design [[2]](#sources)       |
| **JavaScript**    | Logique fonctionnelle, événements DOM [[3]](#sources)  |
| **Canvas API**    | Dessin sur l’espace graphique [[4]](#sources)          |
| **LocalStorage**  | Stockage local des mèmes créés [[5]](#sources)         |
| **Fetch API**     | Requêtes vers Imgur pour le partage PC [[6]](#sources) |
| **Web Share API** | Partage natif sur mobile [[7]](#sources)               |
| **Imgur API**     | Partage en ligne via upload d’image [[8]](#sources)    |
------------------------------------------------------------------------------
---

## 📁 Structure du projet
meme-generator/
│
├── index.html # Page principale : création de mèmes
├── /pages/
│ ├── galerie.html # Galerie des mèmes créés
│ └── templates.html # Sélection de modèles d’images
│
├── /scripts/
│ ├── script.js # Gestion du canvas et des textes
│ ├── galerie.js # Affichage et gestion de la galerie
│ ├── templates.js # Gestion des modèles
│ └── partage.js # Fonctionnalité de partage
│
├── /styles/ # Fichiers CSS
│ ├── index.css
│ ├── navbar.css
│ ├── footer.css
│ ├── galerie.css
│ └── templates.css
│
├── /templates/ # Images des modèles de mèmes
└── /icone/ # Icône de l’onglet navigateur

---

## 🚀 Perspectives futures et améliorations possibles

- 🎭 **Stickers et emojis personnalisés** : ajout d’éléments graphiques supplémentaires
- 🌍 **Interface multilingue** : support de plusieurs langues
- ☁️ **Sauvegarde cloud** : stockage sur compte utilisateur avec authentification
- 📱 **Partage réseaux sociaux** : intégration directe de Twitter, Facebook, Instagram, WhatsApp...
- 👥 **Mode collaboratif** : création de mèmes à plusieurs en temps réel
- 🎨 **Filtres et effets visuels** : personnalisation avancée des images

---

## 📚 Sources

1. [MDN HTML](https://developer.mozilla.org/fr/docs/Web/HTML)  
2. [MDN CSS](https://developer.mozilla.org/fr/docs/Web/CSS)  
3. [MDN JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript)  
4. [MDN Canvas API](https://developer.mozilla.org/fr/docs/Web/API/Canvas_API)  
5. [MDN localStorage](https://developer.mozilla.org/fr/docs/Web/API/Window/localStorage)  
6. [MDN Fetch API](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)  
7. [MDN Web Share API](https://developer.mozilla.org/fr/docs/Web/API/Navigator/share)  
8. [Imgur API Docs](https://apidocs.imgur.com/)

---

> 📌 **Projet personnel développé dans le cadre d’une candidature à une école.**  
> Accessible publiquement pour démonstration de compétences HTML, CSS et JavaScript.

