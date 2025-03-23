// Project and Skills data storage
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let skills = JSON.parse(localStorage.getItem('skills')) || [];

// DOM Elements
const projectsGrid = document.getElementById('projects-grid');
const skillsContainer = document.getElementById('skills-container');
const projectModal = document.getElementById('project-modal');
const skillModal = document.getElementById('skill-modal');
const addProjectBtn = document.getElementById('add-project');
const addSkillBtn = document.getElementById('add-skill');
const closeButtons = document.querySelectorAll('.close');

// Event Listeners
addProjectBtn.addEventListener('click', () => projectModal.style.display = 'block');
addSkillBtn.addEventListener('click', () => skillModal.style.display = 'block');

closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    projectModal.style.display = 'none';
    skillModal.style.display = 'none';
  });
});

window.addEventListener('click', (e) => {
  if (e.target === projectModal) projectModal.style.display = 'none';
  if (e.target === skillModal) skillModal.style.display = 'none';
});

// Project Form Handling
document.getElementById('project-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const projectData = {
    id: Date.now(),
    title: document.getElementById('project-title').value,
    description: document.getElementById('project-description').value,
    github: document.getElementById('project-github').value,
    code: document.getElementById('project-code').value,
    images: [],
    date: new Date().toISOString()
  };

  const imageFiles = document.getElementById('project-images').files;
  for (const file of imageFiles) {
    const imageUrl = await readFileAsDataURL(file);
    projectData.images.push(imageUrl);
  }

  projects.push(projectData);
  localStorage.setItem('projects', JSON.stringify(projects));
  renderProjects();
  projectModal.style.display = 'none';
  e.target.reset();
});

// Skill Form Handling
document.getElementById('skill-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const skillData = {
    id: Date.now(),
    name: document.getElementById('skill-name').value,
    link: document.getElementById('skill-link').value,
    category: document.getElementById('skill-category').value
  };

  skills.push(skillData);
  localStorage.setItem('skills', JSON.stringify(skills));
  renderSkills();
  skillModal.style.display = 'none';
  e.target.reset();
});

// Render Functions
function renderProjects() {
  projectsGrid.innerHTML = projects.map(project => `
    <div class="project-card">
      ${project.images.length ? `
        <img src="${project.images[0]}" alt="${project.title}">
      ` : ''}
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${project.github ? `
        <p><a href="${project.github}" target="_blank">GitHub Repository</a></p>
      ` : ''}
      ${project.code ? `
        <details>
          <summary>Code Snippet</summary>
          <pre><code>${project.code}</code></pre>
        </details>
      ` : ''}
    </div>
  `).join('');
}

function renderSkills() {
  skillsContainer.innerHTML = skills.map(skill => `
    <div class="skill-card">
      <h3>${skill.name}</h3>
      <p>Category: ${skill.category}</p>
      ${skill.link ? `
        <p><a href="${skill.link}" target="_blank">Learn More</a></p>
      ` : ''}
    </div>
  `).join('');
}

// Utility Functions
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Initial Render
renderProjects();
renderSkills();
