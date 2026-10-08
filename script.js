/* =========================================================
   💖 PREMIUM GIRLFRIEND BIRTHDAY WEBSITE
   =========================================================
   PERSONALIZATION
   Edit ONLY the CONFIG object first.
   ========================================================= */

const CONFIG = {
  herName: "MUSKAN",
  yourName: "AYUSH",
  date: "8 October",

  ourFirstMemory: "when we met",
  ourSpecialDate: "14 may",
  insideJoke: "👊",
  favoriteMemory: "vho barish ☔",

  personalMessage:
    "Before you continue... I just want you to know that having you in my life makes ordinary days feel a little more special.",

  birthdayMessage: "Happy Birthday, [HER_NAME] ❤️",

  musicFile: "assets/music.mp3",

  memories: [
    {
      file: "assets/memory1.jpg",
      caption: "One of my favorite memories."
    },
    {
      file: "assets/memory2.jpg",
      caption: "A moment worth keeping."
    },
    {
      file: "assets/memory3.jpg",
      caption: "Us, being us."
    },
    {
      file: "assets/memory4.jpg",
      caption: "Still makes me smile."
    },
    {
      file: "assets/memory5.jpg",
      caption: "A little piece of our story."
    },
    {
      file: "assets/memory6.jpg",
      caption: "And I'd choose this memory again."
    }
  ],

  reasons: [
    [
      "❤️ Your smile",
      "The kind that can change the mood of an entire room."
    ],
    [
      "😂 Your randomness",
      "Life is much more fun when you are being completely you."
    ],
    [
      "🥹 The way you care",
      "You notice little things, and that means more than you know."
    ],
    [
      "😌 Your little habits",
      "Even the tiny things somehow became my favorite things."
    ],
    [
      "🫶 You make ordinary days better",
      "Somehow a normal day feels less normal when you're in it."
    ],
    [
      "✨ Just... you.",
      "No clever explanation. No list. Just you."
    ]
  ]
};


/* =========================================================
   STATE
   ========================================================= */

const state = {
  entered: false,
  quizDone: false,
  runawayDone: false,
  giftOpened: false,
  easterEgg: false,

  quizIndex: 0,
  noAttempts: 0
};


/* =========================================================
   HELPERS
   ========================================================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const screens = $$(".screen");


/* =========================================================
   SCREEN NAVIGATION
   ========================================================= */

function showScreen(id) {
  const target = document.getElementById(id);

  if (!target) return;

  screens.forEach((screen) => {
    screen.classList.remove("active");
  });

  target.classList.add("active");

  window.scrollTo({
    top: target.offsetTop,
    behavior: "smooth"
  });

  setTimeout(() => {
    target
      .querySelectorAll(".reveal")
      .forEach((element) => element.classList.add("visible"));
  }, 120);

  updateProgress();
}


function updateProgress() {
  const index = Math.max(
    0,
    screens.findIndex((screen) =>
      screen.classList.contains("active")
    )
  );

  const percentage =
    ((index + 1) / screens.length) * 100;

  $("#progressBar").style.width = `${percentage}%`;
}


/* =========================================================
   TOKEN REPLACEMENT
   ========================================================= */

function replaceTokens(text) {
  return text
    .replaceAll("[HER_NAME]", CONFIG.herName)
    .replaceAll("[YOUR_NAME]", CONFIG.yourName)
    .replaceAll("[DATE]", CONFIG.date)
    .replaceAll(
      "[OUR_FIRST_MEMORY]",
      CONFIG.ourFirstMemory
    )
    .replaceAll(
      "[OUR_SPECIAL_DATE]",
      CONFIG.ourSpecialDate
    )
    .replaceAll(
      "[INSIDE_JOKE]",
      CONFIG.insideJoke
    )
    .replaceAll(
      "[FAVORITE_MEMORY]",
      CONFIG.favoriteMemory
    );
}


/* =========================================================
   PERSONALIZATION
   ========================================================= */

function initPersonalization() {
  $("#birthdayName").textContent =
    replaceTokens(CONFIG.birthdayMessage);

  $("#finalName").textContent =
    `Happy Birthday, ${CONFIG.herName} ❤️`;

  $("#yourName").textContent =
    CONFIG.yourName;

  $("#beginningText").textContent =
    replaceTokens(CONFIG.ourFirstMemory);

  $("#firstMemoryText").textContent =
    replaceTokens(CONFIG.favoriteMemory);

  $("#jokeText").textContent =
    replaceTokens(CONFIG.insideJoke);

  const audioSource =
    $("#bgMusic").querySelector("source");

  audioSource.src = CONFIG.musicFile;

  $("#bgMusic").load();
}


/* =========================================================
   TYPEWRITER
   ========================================================= */

function typeMessage() {
  const element = $("#typewriter");

  const text =
    replaceTokens(CONFIG.personalMessage);

  let index = 0;

  function tick() {
    element.textContent =
      text.slice(0, index++);

    if (index <= text.length) {
      setTimeout(tick, 22);
    } else {
      setTimeout(() => {
        $("#messageFollow").classList.add("show");
      }, 500);
    }
  }

  tick();
}


/* =========================================================
   CONFETTI
   ========================================================= */

function burst(count = 35) {
  const layer = $("#confetti");

  if (!layer) return;

  for (let i = 0; i < count; i++) {
    const piece =
      document.createElement("i");

    piece.className =
      "confetti-piece";

    piece.style.setProperty(
      "--x",
      `${(Math.random() - 0.5) * 80}vw`
    );

    piece.style.setProperty(
      "--y",
      `${(Math.random() - 0.3) * 80}vh`
    );

    piece.style.setProperty(
      "--r",
      `${Math.random() * 720 - 360}deg`
    );

    piece.style.background = [
      "#e8a5b8",
      "#d9b77a",
      "#f9f1e9",
      "#8c3656"
    ][Math.floor(Math.random() * 4)];

    layer.appendChild(piece);

    setTimeout(() => {
      piece.remove();
    }, 2000);
  }
}


/* =========================================================
   AMBIENT PARTICLES
   ========================================================= */

function initParticles() {
  const ambient = $("#ambient");

  if (!ambient) return;

  for (let i = 0; i < 35; i++) {
    const particle =
      document.createElement("span");

    particle.className = "particle";

    particle.style.left =
      `${Math.random() * 100}%`;

    particle.style.top =
      `${Math.random() * 100}%`;

    particle.style.animationDelay =
      `${Math.random() * 8}s`;

    particle.style.opacity =
      Math.random() * 0.6;

    ambient.appendChild(particle);
  }
}


/* =========================================================
   MEMORY GALLERY
   ========================================================= */

function initGallery() {
  const grid = $("#photoGrid");

  if (!grid) return;

  CONFIG.memories.forEach((memory, index) => {
    const card =
      document.createElement("article");

    card.className = "photo-card";

    card.innerHTML = `
      <img
        loading="lazy"
        src="${memory.file}"
        alt="Memory ${index + 1}"
      >

      <span class="photo-caption">
        ${memory.caption}
      </span>
    `;

    card.addEventListener("click", () => {
      $("#lightboxImg").src =
        memory.file;

      $("#lightboxCaption").textContent =
        memory.caption;

      $("#lightbox").classList.add("open");

      $("#lightbox").setAttribute(
        "aria-hidden",
        "false"
      );
    });

    grid.appendChild(card);
  });
}


/* =========================================================
   REASONS CARDS
   ========================================================= */

function initReasons() {
  const grid = $("#reasonsGrid");

  if (!grid) return;

  CONFIG.reasons.forEach(([front, back]) => {
    const card =
      document.createElement("article");

    card.className =
      "reason-card";

    card.innerHTML = `
      <div class="reason-face reason-front">
        ${front}
      </div>

      <div class="reason-face reason-back">
        ${back}
      </div>
    `;

    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });

    grid.appendChild(card);
  });
}


/* =========================================================
   ❤️ QUIZ
   ========================================================= */

const quiz = [

  {
    q: "Who fell first? 👀",

    a: [
      "Me",
      "You",
      "Obviously both 😌"
    ],

    correct: 2,

    responses: [
      "Sure? 😏",
      "I knew you'd say that.",
      "Exactly. Both. No debate. ❤️"
    ]
  },

  {
    q: "Who is more annoying?",

    a: [
      "Me",
      "You",
      "We're both equally guilty 😂"
    ],

    correct: 2,

    responses: [
      "Bold answer 😂",
      "Interesting accusation.",
      "Finally, some honesty."
    ]
  },

  {
    q: "What's our greatest superpower?",

    a: [
      "Making each other laugh",
      "Never agreeing on food",
      "Turning random moments into memories"
    ],

    correct: 2,

    responses: [
      "That's cute, but think again.",
      "Not gonna lie... also true.",
      "YES. That's the one. ❤️"
    ]
  }

];


/* =========================================================
   RENDER QUIZ
   ========================================================= */

function renderQuiz() {

  const item =
    quiz[state.quizIndex];

  if (!item) return;

  $("#quizCount").textContent =
    `Question ${state.quizIndex + 1} of ${quiz.length}`;

  /*
     IMPORTANT:
     +1 makes the progress bar represent
     the current question instead of staying
     at 0% on Question 1.
  */

  $("#quizProgress").style.width =
    `${((state.quizIndex + 1) / quiz.length) * 100}%`;

  $("#quizQuestion").textContent =
    item.q;

  const options =
    $("#quizOptions");

  options.innerHTML = "";

  item.a.forEach((answer, index) => {

    const button =
      document.createElement("button");

    button.className =
      "quiz-option";

    button.type = "button";

    button.textContent =
      answer;

    button.addEventListener(
      "click",
      () => answerQuiz(index)
    );

    options.appendChild(button);
  });

  $("#quizFeedback").textContent = "";
}


/* =========================================================
   QUIZ ANSWER
   ========================================================= */

function answerQuiz(index) {

  const item =
    quiz[state.quizIndex];

  if (!item) return;

  const buttons =
    $$(".quiz-option");

  // Prevent double clicking
  buttons.forEach((button) => {
    button.disabled = true;
  });

  $("#quizFeedback").textContent =
    item.responses[index];

  if (index === item.correct) {
    burst(20);
  }

  setTimeout(() => {

    state.quizIndex++;

    if (
      state.quizIndex >=
      quiz.length
    ) {

      state.quizDone = true;

      showToast(
        "Okay, you passed the relationship exam. 😂❤️"
      );

      setTimeout(() => {
        showScreen("runaway");
      }, 300);

    } else {

      renderQuiz();

    }

  }, 900);
}


/* =========================================================
   RUNAWAY BUTTON
   ========================================================= */

function moveNoButton() {

  const stage =
    $("#runawayStage");

  const button =
    $("#noBtn");

  if (!stage || !button) return;

  const maxX =
    Math.max(
      5,
      stage.clientWidth -
      button.offsetWidth -
      10
    );

  const maxY =
    Math.max(
      5,
      stage.clientHeight -
      button.offsetHeight -
      10
    );

  button.style.left =
    `${Math.max(
      5,
      Math.random() * maxX
    )}px`;

  button.style.top =
    `${Math.max(
      5,
      Math.random() * maxY
    )}px`;

  button.style.transform =
    `rotate(${Math.random() * 10 - 5}deg)`;

  state.noAttempts++;

  const messages = [
    "Nice try 😂",
    "Too slow 👀",
    "Nope.",
    "You really thought I'd let you?",
    "Okay... you are persistent.",
    "Fine. I respect the dedication."
  ];

  $("#runawayMessage").textContent =
    messages[
      Math.min(
        state.noAttempts - 1,
        messages.length - 1
      )
    ];

  if (state.noAttempts >= 5) {
    button.textContent =
      "OKAY FINE ❤️";
  }
}


/* =========================================================
   YES BUTTON
   ========================================================= */

function finishRunaway() {

  state.runawayDone = true;

  burst(55);

  $("#runawayMessage").textContent =
    "Okay okay... you win ❤️";

  setTimeout(() => {
    showScreen("gift");
  }, 700);
}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const toast =
    $("#toast");

  if (!toast) return;

  toast.textContent =
    message;

  toast.classList.add("show");

  clearTimeout(
    showToast.timer
  );

  showToast.timer =
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2200);
}


/* =========================================================
   CUSTOM CURSOR
   ========================================================= */

function setupCursor() {

  const dot =
    $(".cursor-dot");

  const ring =
    $(".cursor-ring");

  if (!dot || !ring) return;

  let ringX = 0;
  let ringY = 0;

  let mouseX = 0;
  let mouseY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {

      mouseX =
        event.clientX;

      mouseY =
        event.clientY;

      dot.style.left =
        `${mouseX}px`;

      dot.style.top =
        `${mouseY}px`;

      document.documentElement
        .style
        .setProperty(
          "--mx",
          `${mouseX}px`
        );

      document.documentElement
        .style
        .setProperty(
          "--my",
          `${mouseY}px`
        );
    }
  );

  function animateCursor() {

    ringX +=
      (mouseX - ringX) * 0.16;

    ringY +=
      (mouseY - ringY) * 0.16;

    ring.style.left =
      `${ringX}px`;

    ring.style.top =
      `${ringY}px`;

    requestAnimationFrame(
      animateCursor
    );
  }

  animateCursor();

  $$(
    "button,.photo-card,.reason-card"
  ).forEach((element) => {

    element.addEventListener(
      "mouseenter",
      () => {
        document.body.classList.add(
          "hovering"
        );
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {
        document.body.classList.remove(
          "hovering"
        );
      }
    );

  });
}


/* =========================================================
   INITIALIZATION
   ========================================================= */

function init() {

  /*
     Basic website setup
  */

  initPersonalization();

  initParticles();

  initGallery();

  initReasons();

  setupCursor();


  /*
     IMPORTANT FIX:
     Initialize the quiz immediately.
     
     Previously renderQuiz() existed but
     was never called during startup.
     
     This is why the quiz card appeared empty.
  */

  renderQuiz();


  /*
     Start at entrance screen
  */

  showScreen("entrance");


  /* =====================================================
     ENTRANCE
     ===================================================== */

  $("#enterBtn").addEventListener(
    "click",
    () => {

      state.entered = true;

      burst(25);

      showScreen("message");

      setTimeout(
        typeMessage,
        450
      );
    }
  );


  /* =====================================================
     MESSAGE → BIRTHDAY
     ===================================================== */

  $("#whyBtn").addEventListener(
    "click",
    () => {

      burst(45);

      showScreen("birthday");
    }
  );


  /* =====================================================
     BIRTHDAY → STORY
     ===================================================== */

  $("#storyBtn").addEventListener(
    "click",
    () => {
      showScreen("story");
    }
  );


  /* =====================================================
     GENERIC NEXT BUTTONS
     ===================================================== */

  $$(".next-btn").forEach(
    (button) => {

      button.addEventListener(
        "click",
        () => {

          showScreen(
            button.dataset.next
          );

        }
      );

    }
  );


  /* =====================================================
     RUNAWAY NO BUTTON
     ===================================================== */

  $("#noBtn").addEventListener(
    "mouseenter",
    moveNoButton
  );


  $("#noBtn").addEventListener(
    "touchstart",
    (event) => {

      event.preventDefault();

      moveNoButton();

    },
    {
      passive: false
    }
  );


  $("#noBtn").addEventListener(
    "click",
    moveNoButton
  );


  /* =====================================================
     YES BUTTON
     ===================================================== */

  $("#yesBtn").addEventListener(
    "click",
    finishRunaway
  );


  /* =====================================================
     GIFT BOX
     ===================================================== */

  $("#giftBox").addEventListener(
    "click",
    () => {

      if (state.giftOpened)
        return;

      state.giftOpened = true;

      $("#giftBox").classList.add(
        "open"
      );

      burst(45);

      $("#giftMessage").classList.add(
        "show"
      );

      setTimeout(
        () => {
          showScreen("reasons");
        },
        1800
      );
    }
  );


  /* =====================================================
     MUSIC
     ===================================================== */

  $("#musicToggle").addEventListener(
    "click",
    async () => {

      const audio =
        $("#bgMusic");

      try {

        if (audio.paused) {

          await audio.play();

          $("#musicToggle")
            .classList.add("playing");

          $("#musicToggle").innerHTML =
            "♫ <span>Sound on</span>";

        } else {

          audio.pause();

          $("#musicToggle")
            .classList.remove("playing");

          $("#musicToggle").innerHTML =
            "♪ <span>Sound</span>";
        }

      } catch (error) {

        showToast(
          "Add assets/music.mp3 first, then try again."
        );

      }
    }
  );


  /* =====================================================
     LIGHTBOX
     ===================================================== */

  $("#lightboxClose")
    .addEventListener(
      "click",
      () => {
        $("#lightbox")
          .classList.remove("open");
      }
    );


  $("#lightbox")
    .addEventListener(
      "click",
      (event) => {

        if (
          event.target.id ===
          "lightbox"
        ) {

          $("#lightbox")
            .classList.remove("open");

        }

      }
    );


  /* =====================================================
     RESTART
     ===================================================== */

  $("#restartBtn")
    .addEventListener(
      "click",
      () => {
        location.reload();
      }
    );


  /* =====================================================
     EASTER EGG
     Click heart 5 times
     ===================================================== */

  $("#logoSecret")
    .addEventListener(
      "click",
      () => {

        window.logoClicks =
          (window.logoClicks || 0) + 1;

        if (
          window.logoClicks === 5
        ) {

          state.easterEgg = true;

          burst(35);

          showToast(
            "Okay... you found the secret 👀"
          );

          $("#logoSecret").textContent =
            "✦";

          setTimeout(
            () => {

              alert(
                "Secret message: You're my favorite notification. ❤️"
              );

            },
            500
          );
        }

      }
    );


  /* =====================================================
     ESCAPE KEY
     ===================================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape"
      ) {

        $("#lightbox")
          .classList.remove("open");

      }

    }
  );

}


/* =========================================================
   START APP
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  init
);