const memeTemplates = [
  {
    name: "Drake",
    image: "https://samy530.github.io/meme-generator/templates/drake.jpg"
  },
  {
    name: "Two Buttons",
    image: "https://samy530.github.io/meme-generator/templates/Two_Buttons.jpg"
  },
  {
    name: "Left Exit 12 Off Ramp",
    image: "https://samy530.github.io/meme-generator/templates/Left_Exit_12_Off_Ramp.jpg"
  },
  {
    name: "waiting skeleton",
    image: "https://samy530.github.io/meme-generator/templates/waiting_skeleton.jpg"
  },
  {
    name: "Disaster Girl",
    image: "https://samy530.github.io/meme-generator/templates/Disaster_Girl.jpg"
  },
  {
    name:"Gru's Plan",
    image: "https://samy530.github.io/meme-generator/templates/Gru_plan.jpg"
  },
  {
    name:"Sad Pablo",
    image: "https://samy530.github.io/meme-generator/templates/sad_pablo.jpg"
  },
  {
    name:"Mocking Spongebob",
    image: "https://samy530.github.io/meme-generator/templates/moking_spongebob.jpg"
  },
  {
    name:"meme brain",
    image: "https://samy530.github.io/meme-generator/templates/brain.jpg"
  },
  {
    name:"Woman Yelling at cat",
    image: "https://samy530.github.io/meme-generator/templates/woman_cat.jpg"
  },
  {
    name:"Monkey Puppet",
    image: "https://samy530.github.io/meme-generator/templates/monkey_puppet.jpg"
  },
  {
    name:"Boardroom Meeting Suggestion",
    image: "https://samy530.github.io/meme-generator/templates/boardroom_meeting.jpg"
  }
];

const gallery = document.getElementById('template-gallery');

    memeTemplates.forEach(template => {
      const img = document.createElement('img');
      img.src = template.image;
      img.alt = template.name;
      img.title = template.name;
      img.dataset.template = template.image;
      img.style.cursor = 'pointer';
      img.style.maxWidth = '120px';
      img.style.margin = '10px';

      img.addEventListener('click', () => {
        localStorage.setItem('selectedTemplate', template.image);
        window.location.href = '../index.html';
      });

      gallery.appendChild(img);
    });