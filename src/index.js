const state = {
  choices: [],
};
const choiceInput = document.getElementById("choice-input");
const choicesContainer = document.querySelector(".choices-container");
const addChoiceButton = document.querySelector(".add-button");
const choiceForm = document.querySelector("form#choice-form");
const chooseButton = document.getElementById("choose-button");
const confetti = new ConfettiGenerator({
  target: "confetti",
  animate: true,
});

window.addEventListener("DOMContentLoaded", init);

function init() {
  state.choices = [];
  choiceForm.addEventListener("submit", onChoiceAdd);
  chooseButton.addEventListener("click", onChooseForMeClick);
  choicesContainer.addEventListener("click", onChoiceClick);
}
function onChoiceAdd(e) {
  e.preventDefault();
  const choice = choiceInput.value;
  if (!choice) return;
  state.choices.push(choice);
  renderChoices();
  choiceInput.value = "";
  choiceInput.focus();
}
function onChooseForMeClick() {
  confetti.clear(); /* Clear out any previous confetti or choices */
  renderChoices();
  const choiceIdx = Math.floor(Math.random() * state.choices.length);
  const choiceBoxes = document.querySelectorAll(".choicebox");
  const chosenBox = choiceBoxes[choiceIdx];

  let timeToWaitMs = 5000 + Math.random() * 3000;
  let timeStarted = new Date();
  let highlighted = 0;

  const interval = setInterval(() => {
    const timeWaited = new Date() - timeStarted;
    if (timeWaited > timeToWaitMs) {
      clearInterval(interval);
      chosenBox.classList.add("choicebox__chosen");
      confetti.render();
      chooseButton.innerText = "Choose Another!";
    }
    choiceBoxes.forEach((cb) => cb.classList.remove("choicebox__chosen"));
    choiceBoxes[highlighted].classList.add("choicebox__chosen");
    highlighted = (highlighted + 1) % choiceBoxes.length;
  }, 100);
}
function onChoiceClick(e) {
  const target = e.target;
  if (target.classList.contains("choicebox")) {
    const choiceToRemove = target.innerText;
    state.choices = state.choices.filter((c) => c !== choiceToRemove);
    renderChoices();
  }
}
function renderChoices() {
  choicesContainer.innerHTML = "";
  state.choices.forEach((choice) => {
    const newChoice = document.createElement("div");
    newChoice.classList.add("choicebox");
    newChoice.innerText = choice;
    choicesContainer.appendChild(newChoice);
  });
  chooseButton.disabled = state.choices.length < 2;
}
