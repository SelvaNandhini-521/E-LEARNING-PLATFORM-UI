const courseData = {
  html: {
    title: "HTML & CSS Fundamentals",
    video: "https://www.youtube.com/embed/kUMe1FH4CHE",
    key: "progress_html"
  },
  js: {
    title: "JavaScript Basics",
    video: "https://www.youtube.com/embed/W6NZfCO5SIk",
    key: "progress_js"
  },
  react: {
    title: "React Fundamentals",
    video: "https://www.youtube.com/embed/bMknfKXIFA8",
    key: "progress_react"
  },
  python: {
    title: "Python for Beginners",
    video: "https://www.youtube.com/embed/_uQrJ0TkZlc",
    key: "progress_python"
  },
  sql: {
    title: "SQL Essentials",
    video: "https://www.youtube.com/embed/7S_tz1z_5bA",
    key: "progress_sql"
  },
  node: {
    title: "Node.js for Beginners",
    video: "https://www.youtube.com/embed/TlB_eWDSMt4",
    key: "progress_node"
  },
  mongo: {
    title: "MongoDB Crash Course",
    video: "https://www.youtube.com/embed/ofme2o29ngU",
    key: "progress_mongo"
  },
  docker: {
    title: "Docker & Containers",
    video: "https://www.youtube.com/embed/3c-iBn73dDE",
    key: "progress_docker"
  },
  git: {
    title: "Git & GitHub Masterclass",
    video: "https://www.youtube.com/embed/RGOj5yH7evk",
    key: "progress_git"
  },
  ds: {
    title: "Data Structures in Python",
    video: "https://www.youtube.com/embed/bum_19loj9A",
    key: "progress_ds"
  },
  api: {
    title: "REST API Design",
    video: "https://www.youtube.com/embed/GZvSYJDk-us",
    key: "progress_api"
  },
  tailwind: {
    title: "Tailwind CSS Tutorial",
    video: "https://www.youtube.com/embed/dFgzHOX84xQ",
    key: "progress_tailwind"
  }
};

const params = new URLSearchParams(window.location.search);
const courseKey = params.get("course");
const course = courseData[courseKey];

if (!course) {
  document.getElementById("course-title").textContent = "Course Not Found";
} else {
  document.getElementById("course-title").textContent = course.title;
  document.getElementById("course-video").src = course.video + "?enablejsapi=1";
  loadYouTubeAPI(course.key);
}

function loadYouTubeAPI(storageKey) {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  document.body.appendChild(tag);

  let player;
  let interval;

  window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player("course-video", {
      events: {
        onStateChange: function (event) {
          if (event.data === YT.PlayerState.PLAYING) {
            clearInterval(interval);
            interval = setInterval(() => {
              const currentTime = player.getCurrentTime();
              const duration = player.getDuration();
              if (duration > 0) {
                const progress = Math.floor((currentTime / duration) * 100);
                const saved = parseInt(localStorage.getItem(storageKey)) || 0;
                const finalProgress = Math.max(progress, saved);
                updateProgressBar(finalProgress, storageKey);
                if (finalProgress >= 100) clearInterval(interval);
              }
            }, 1000);
          } else {
            clearInterval(interval);
          }
        }
      }
    });
  };
}

function updateProgressBar(value, key) {
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");
  progressBar.value = value;
  progressText.textContent = `${value}%`;
  localStorage.setItem(key, value);
}
