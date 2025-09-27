// Navigation System
function switchSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Remove active class from all nav buttons
  document.querySelectorAll(".nav-btn").forEach((btn) => {
    btn.classList.remove("active");
  });

  // Show target section
  document.getElementById(sectionName).classList.add("active");

  // Add active class to clicked button
  // We need to find the button associated with the section, not just the event target
  const targetBtn = document.querySelector(
    `.nav-btn[data-section="${sectionName}"]`
  );
  if (targetBtn) {
    targetBtn.classList.add("active");
  }
}

// Add click listeners to navigation buttons
document.querySelectorAll(".nav-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const section = this.getAttribute("data-section");
    switchSection(section);
  });
});

// Progress Animation
function animateProgress() {
  const progressBars = document.querySelectorAll(".progress-fill");
  progressBars.forEach((bar) => {
    const width = bar.style.width;
    bar.style.width = "0%";
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Animate stats on load
function animateStats() {
  const stats = [
    { element: "streak-number", target: 7 },
    { element: "level-number", target: 12 },
    { element: "points-number", target: 1240 },
  ];

  stats.forEach((stat) => {
    const element = document.getElementById(stat.element);
    if (!element) return; // Guard clause
    let current = 0;
    const increment = stat.target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.target) {
        current = stat.target;
        clearInterval(timer);
      }

      if (stat.element === "points-number") {
        element.textContent = Math.floor(current).toLocaleString();
      } else {
        element.textContent = Math.floor(current);
      }
    }, 30);
  });
}

// Scenario interactions
function openScenario(scenarioType) {
  const scenarios = {
    coffee: {
      title: "Coffee Shop Order",
      phrases: [
        {
          english: "I'll have a grande iced coffee, please",
          phonetic: "/aɪl hæv ə ˈɡrɑndeɪ aɪst ˈkɔfi pliːz/",
        },
        {
          english: "Can I get that with oat milk?",
          phonetic: "/kæn aɪ ɡɛt ðæt wɪθ oʊt mɪlk/",
        },
        {
          english: "Actually, make that to-go",
          phonetic: "/ˈækʧuəli meɪk ðæt tu ɡoʊ/",
        },
      ],
    },
    interview: {
      title: "Job Interview Small Talk",
      phrases: [
        {
          english: "Traffic was crazy getting here!",
          phonetic: "/ˈtræfɪk wʌz ˈkreɪzi ˈɡɛtɪŋ hɪr/",
        },
        {
          english: "I'm super excited about this opportunity",
          phonetic: "/aɪm ˈsupər ɪkˈsaɪtəd əˈbaʊt ðɪs ˌɑpərˈtunəti/",
        },
        {
          english: "This office has such a cool vibe",
          phonetic: "/ðɪs ˈɔfəs hæz sʌʧ ə kul vaɪb/",
        },
      ],
    },
    netflix: {
      title: "Netflix & Chill Conversation",
      phrases: [
        {
          english: "Wanna binge-watch something?",
          phonetic: "/ˈwɑnə bɪnʤ wɑʧ ˈsʌmθɪŋ/",
        },
        {
          english: "I'm totally obsessed with this series",
          phonetic: "/aɪm ˈtoʊtəli əbˈsɛst wɪθ ðɪs ˈsɪriz/",
        },
        {
          english: "It's such a plot twist!",
          phonetic: "/ɪts sʌʧ ə plɑt twɪst/",
        },
      ],
    },
  };

  const scenario = scenarios[scenarioType];
  if (scenario) {
    alert(
      `🎬 Starting "${scenario.title}" practice!\n\n` +
        `First phrase: "${scenario.phrases[0].english}"\n` +
        `Pronunciation: ${scenario.phrases[0].phonetic}\n\n` +
        `📝 Feature coming soon: Full interactive practice mode!`
    );
  }
}

// Accent training
function practiceSound(soundType) {
  const sounds = {
    "american-r": "American R Sound - Practice: car, hard, more",
    "th-sounds": "TH Sounds - Practice: think, that, three",
    schwa: "Schwa Sound - Practice: about, sofa, camera",
  };

  alert(
    `🎯 ${sounds[soundType]}\n\n📝 Feature coming soon: Audio playback and recording!`
  );
}

// Task completion
function toggleTask(taskElement) {
  if (taskElement.classList.contains("task-pending")) {
    taskElement.classList.remove("task-pending");
    taskElement.classList.add("task-completed");
    const icon = taskElement.querySelector(".task-icon");
    if (icon) {
      icon.classList.remove("far", "fa-circle");
      icon.classList.add("fas", "fa-check-circle");
    }

    // Update progress
    updateChallengeProgress();
  }
}

function updateChallengeProgress() {
  const completedTasks = document.querySelectorAll(".task-completed").length;
  const totalTasks = document.querySelectorAll(".task-item").length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const fill = document.querySelector(".challenge-progress-fill");
  const text = document.querySelector(".challenge-progress-text");

  if (fill) fill.style.width = progress + "%";
  if (text) text.textContent = progress + "% Complete";
}

// Add click listeners to pending tasks
document.addEventListener("click", function (e) {
  const pendingTask = e.target.closest(".task-pending");
  if (pendingTask) {
    toggleTask(pendingTask);
  }
});

// Add hover effects to cards (optional, can be done in CSS)
document
  .querySelectorAll(".card, .stat-card, .scenario-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  animateStats();
  animateProgress();
  updateChallengeProgress(); // Initial calculation

  // Add mobile touch effects
  if ("ontouchstart" in window) {
    document.querySelectorAll(".nav-btn, .scenario-card").forEach((element) => {
      element.addEventListener("touchstart", function () {
        this.style.transform = "scale(0.95)";
      });

      element.addEventListener("touchend", function () {
        this.style.transform = "scale(1)";
      });
    });
  }
});

// Auto-save progress (localStorage simulation)
function saveProgress() {
  const progress = {
    streak: document.getElementById("streak-number").textContent,
    level: document.getElementById("level-number").textContent,
    points: document.getElementById("points-number").textContent,
    completedTasks: document.querySelectorAll(".task-completed").length,
    lastVisit: new Date().toISOString(),
  };

  // In a real app, this would save to localStorage or a database
  console.log("Progress saved:", progress);
}

// Save progress every 30 seconds
setInterval(saveProgress, 30000);
