// templates.js
const memeTemplates = [
  {
    name: "Drake",
    image: "../templates/drake.jpg"
  },
  {
    name: "Two Buttons",
    image: "../templates/Two_Buttons.jpg"
  },
  {
    name: "Left Exit 12 Off Ramp",
    image: "../templates/Left_Exit _12_Off_Ramp.jpg"
  },
  {
    name: "waiting skeleton",
    image: "../templates/waiting_skeleton.jpg"
  },
  {
    name: "Disaster Girl",
    image: "../templates/Disaster_Girl.jpg"
  },
  {
    name:"Gru's Plan",
    image: "../templates/Gru_plan.jpg"
  },
  {
    name:"Sad Pablo",
    image: "../templates/sad_pablo.jpg"
  },
  {
    name:"Mocking Spongebob",
    image: "../templates/moking_spongebob.jpg"
  },
  {
    name:"meme brain",
    image: "../templates/brain.jpg"
  },
  {
    name:"Woman Yelling at cat",
    image: "../templates/woman_cat.jpg"
  },
  {
    name:"Monkey Puppet",
    image: "../templates/monkey_puppet.jpg"
  },
  {
    name:"Boardroom Meeting Suggestion",
    image: "../templates/boardroom_meeting.jpg"
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