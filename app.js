const data = {
    "name": "Rasool Hamidi Choolabi",
    "position": "Psychologist / Researcher",
    "about": "As a psychologist with a Master’s degree in General Psychology, I specialize in psychological resilience, emotional and cognitive regulation, and cancer-related mental health.",
    "education": [{ "degree": "Master's Degree in General Psychology", "school": "Ahrar Institute", "year": "2018-2020" }],
    "publications": [
        { "title": "The effect of Acceptance and Commitment Group Therapy (ACT-G)", "journal": "Current Psychology (2025)" },
        { "title": "Mediating Effects of Rumination on Insomnia in Cancer Survivors", "journal": "Cancer Medicine (2024)" }
    ]
};

document.getElementById('name').textContent = data.name;
document.getElementById('position').textContent = data.position;
document.getElementById('about-text').textContent = data.about;

const eduList = document.getElementById('edu-list');
data.education.forEach(e => {
    eduList.innerHTML += `<div class="card"><strong>${e.degree}</strong><br>${e.school} (${e.year})</div>`;
});

const pubList = document.getElementById('pubs-list');
data.publications.forEach(p => {
    pubList.innerHTML += `<div class="card"><strong>${p.title}</strong><br><em>${p.journal}</em></div>`;
});
