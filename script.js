const terminal = document.querySelector(".terminal");
const hydra = document.querySelector(".hydra");
const rebootSuccessText = document.querySelector(".hydra_reboot_success");
const maxCharacters = 24;
const unloadedCharacter = ".";
const loadedCharacter = "#";
const spinnerFrames = ["/", "-", "\\", "|"];
let animationPlayed = false;

(glitchElement => {
  const glitch = glitchElement.cloneNode(true);
  const glitchReverse = glitchElement.cloneNode(true);
  glitch.classList.add("glitch--clone", "glitch--bottom");
  glitchReverse.classList.add("glitch--clone", "glitch--top");
  glitch.setAttribute("aria-hidden", "true");
  glitchReverse.setAttribute("aria-hidden", "true");

  glitchElement.insertAdjacentElement("afterend", glitch);
  glitchElement.insertAdjacentElement("afterend", glitchReverse);
})(terminal);

// Get all the loading bars
const loadingBars = document.querySelectorAll(".loading-bar");
const processAmounts = document.querySelectorAll(".process-amount");
const spinners = document.querySelectorAll(".spinner");
const rebootingText = document.querySelectorAll(".hydra_rebooting");
const glitches = document.querySelectorAll(".glitch--clone");

let buttonCreated = false; // Add a flag to check if the button has been created

// Helper for random number
const RandomNumber = (min, max) => Math.floor(Math.random() * max) + min;

const Delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const HideAll = (elements) =>
  elements.forEach((glitchGroup) =>
    glitchGroup.forEach((element) => element.classList.add("hidden"))
  );

const ShowAll = (elements) =>
  elements.forEach((glitchGroup) =>
    glitchGroup.forEach((element) => element.classList.remove("hidden"))
  );

// Render the bar to HTML
const RenderBar = (values) => {
  const currentLoaded = values.lastIndexOf(loadedCharacter) + 1;
  const loaded = values.slice(0, currentLoaded).join("");
  const unloaded = values.slice(currentLoaded).join("");

  // Update all the loading bars
  loadingBars.forEach((loadingBar) => {
    loadingBar.innerHTML = `(${loaded}<span class="loading-bar--unloaded">${unloaded}</span>)`;
  });

  // Update all the percentages
  loadingPercent = Math.floor((currentLoaded / maxCharacters) * 100);
  processAmounts.forEach((processAmount) => {
    processAmount.innerText = loadingPercent;
  });
};

// Update the loaded value and render it to HTML
const DrawLoadingBar = (values) => {
  return new Promise((resolve) => {
    const loadingBarAnimation = setInterval(() => {
      if (!values.includes(unloadedCharacter)) {
        clearInterval(loadingBarAnimation);
        resolve();
      }

      values.pop(unloadedCharacter);
      values.unshift(loadedCharacter);
      RenderBar(values);
    }, RandomNumber(50, 300));
  });
};

const DrawSpinner = (spinnerFrame = 0) => {
  return setInterval(() => {
    spinnerFrame += 1;
    spinners.forEach(
      (spinner) =>
        (spinner.innerText = `[${spinnerFrames[spinnerFrame % spinnerFrames.length]}]`)
    );
  }, RandomNumber(50, 300));
};

const AnimateBox = () => {
  const first = hydra.getBoundingClientRect();
  HideAll([spinners, glitches, rebootingText]);
  rebootSuccessText.classList.remove("hidden");
  rebootSuccessText.style.visibility = "hidden";
  const last = hydra.getBoundingClientRect();

  const hydraAnimation = hydra.animate(
    [
      { transform: `scale(${first.width / last.width}, ${first.height / last.height})` },
      { transform: `scale(${first.width / last.width}, 1.2)` },
      { transform: `none` },
    ],
    {
      duration: 600,
      easing: 'cubic-bezier(0,0,0.32,1)',
    }
  );

  hydraAnimation.addEventListener('finish', () => {
    rebootSuccessText.removeAttribute("style");
    hydra.removeAttribute("style");
    animationPlayed = true;
  });
};

const PlayHydra = async () => {
  if (animationPlayed) return;
  terminal.classList.add("glitch");
  rebootSuccessText.classList.add("hidden");
  ShowAll([spinners, glitches, rebootingText]);
  const loadingBar = new Array(maxCharacters).fill(unloadedCharacter);
  const spinnerInterval = DrawSpinner();

  await DrawLoadingBar(loadingBar);

  requestAnimationFrame(() => {
    clearInterval(spinnerInterval);
    terminal.classList.remove("glitch");
    AnimateBox();
  });
};

PlayHydra();

// Countdown to November 5, 2023
function updateCountdown() {
  const targetDate = new Date("2023-11-15T13:08:00+01:00");
  const currentDate = new Date();
  const timeRemaining = targetDate - currentDate;

  if (timeRemaining <= 0 && !buttonCreated) {
    rebootSuccessText.querySelector("p span").textContent = "REBOOT COMPLETE";

    // Create a button in the same style as the website
    const button = document.createElement("button");
    button.textContent = "";
    button.classList.add("button1");

    // Add an event listener to the button
    button.addEventListener("click", function() {
      // Redirect to the desired page on your website
      window.location.href = "passlog2.html";
    });

    // Append the button to the rebootSuccessText
    rebootSuccessText.appendChild(button);

    buttonCreated = true;
  } else if (timeRemaining > 0) {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    rebootSuccessText.querySelector("p span").textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}


updateCountdown();
setInterval(updateCountdown, 1000);


//THE BUTTONS {DE AL GEGENERATED, NIET COUNTDOWN BUTTON}
// JavaScript
const myButton = document.getElementById("myButton1");

myButton.addEventListener("click", function() {
  // Redirect to the desired page when the button is clicked
  window.location.href = "log1.html";
});






