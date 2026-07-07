// --- Application State Management ---
let progress = {};
let currentQuestion = null;
let focusCategory = "all"; 
let detailsRevealed = false; 

const PRONOUN_FORMS = [
  { id: "ich_nom", label: "ich", case: "nominative" },
  { id: "du_nom", label: "du", case: "nominative" },
  { id: "er_nom", label: "er", case: "nominative" },
  { id: "sie_sg_nom", label: "sie (sg)", case: "nominative" },
  { id: "es_nom", label: "es", case: "nominative" },
  { id: "wir_nom", label: "wir", case: "nominative" },
  { id: "ihr_nom", label: "ihr", case: "nominative" },
  { id: "sie_pl_nom", label: "sie (pl)", case: "nominative" },
  { id: "sie_formal_nom", label: "Sie (form)", case: "nominative" },
  { id: "mich_akk", label: "mich", case: "accusative" },
  { id: "dich_akk", label: "dich", case: "accusative" },
  { id: "ihn_akk", label: "ihn", case: "accusative" },
  { id: "sie_sg_akk", label: "sie (sg)", case: "accusative" },
  { id: "es_akk", label: "es", case: "accusative" },
  { id: "uns_akk", label: "uns", case: "accusative" },
  { id: "euch_akk", label: "euch", case: "accusative" },
  { id: "sie_pl_akk", label: "sie (pl)", case: "accusative" },
  { id: "sie_formal_akk", label: "Sie (form)", case: "accusative" },
  { id: "mir_dat", label: "mir", case: "dative" },
  { id: "dir_dat", label: "dir", case: "dative" },
  { id: "ihm_masc_dat", label: "ihm (m)", case: "dative" },
  { id: "ihr_dat", label: "ihr (f)", case: "dative" },
  { id: "ihm_neut_dat", label: "ihm (n)", case: "dative" },
  { id: "uns_dat", label: "uns", case: "dative" },
  { id: "euch_dat", label: "euch", case: "dative" },
  { id: "ihnen_dat", label: "ihnen (pl)", case: "dative" },
  { id: "sie_formal_dat", label: "Ihnen (form)", case: "dative" }
];

// --- DOM elements selection ---
const pageHome = document.getElementById("page-home");
const pagePractice = document.getElementById("page-practice");
const btnLaunchPronouns = document.getElementById("btn-launch-pronouns");
const btnPortalHome = document.getElementById("btn-portal-home");
const btnReturnPortal = document.getElementById("btn-return-portal");
const logoContainer = document.getElementById("logo-container");

const gridNominative = document.getElementById("grid-nominative");
const gridAccusative = document.getElementById("grid-accusative");
const gridDative = document.getElementById("grid-dative");

const textGerman = document.getElementById("german-sentence");
const textEnglish = document.getElementById("english-sentence");
const englishSentenceHidden = document.getElementById("english-sentence-hidden");
const englishSentence = document.getElementById("english-sentence");
const targetDetailsHidden = document.getElementById("target-details-hidden");
const targetDetailsVisible = document.getElementById("target-details-visible");

const textPerson = document.getElementById("target-person");
const textClue = document.getElementById("target-clue");
const badgeCaseVisible = document.getElementById("badge-case-visible");
const badgeCaseHidden = document.getElementById("badge-case-hidden");
const badgeFocus = document.getElementById("badge-focus");

const userInput = document.getElementById("user-input");
const btnSubmit = document.getElementById("btn-submit");
const btnNext = document.getElementById("btn-next");
const btnShowHint = document.getElementById("btn-show-hint");
const btnSkip = document.getElementById("btn-skip");
const btnClearFocus = document.getElementById("btn-clear-focus");
const inputCheckIcon = document.getElementById("input-check-icon");
const btnToggleEye = document.getElementById("btn-toggle-eye");
const eyeIconState = document.getElementById("eye-icon-state");
const eyeTextState = document.getElementById("eye-text-state");

const hintBox = document.getElementById("hint-box");
const feedbackAlert = document.getElementById("feedback-alert");
const feedbackIcon = document.getElementById("feedback-icon");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackBody = document.getElementById("feedback-body");

const masteryTotalText = document.getElementById("mastery-total");
const masteryCountText = document.getElementById("mastery-count");
const radialProgressBar = document.getElementById("radial-progress-bar");
const radialText = document.getElementById("radial-text");

const btnCheatSheet = document.getElementById("btn-cheat-sheet");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const btnReset = document.getElementById("btn-reset");

// Helper Randomizer
function drawRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Procedural Generator
function synthesizeQuestion(pronounId) {
  const templates = TEMPLATE_DB[pronounId];
  if (!templates) return null;

  const template = drawRandom(templates);

  const city = drawRandom(VOCAB.cities);
  const yearIndex = Math.floor(Math.random() * VOCAB.years.length);
  const yearsDe = VOCAB.years[yearIndex];
  const yearsEn = VOCAB.years_en[yearIndex];
  
  const drink = drawRandom(VOCAB.drinks);
  const food = drawRandom(VOCAB.foods);
  const time = drawRandom(VOCAB.times);
  const nameMasc = drawRandom(VOCAB.namesMasc);
  const nameFem = drawRandom(VOCAB.namesFem);
  const itemMasc = drawRandom(VOCAB.itemsMasc);
  const itemFem = drawRandom(VOCAB.itemsFem);
  const itemNeut = drawRandom(VOCAB.itemsNeut);

  let deSentence = template.de;
  let enSentence = template.en;

  deSentence = deSentence.replace(/{city}/g, city.de)
                         .replace(/{years}/g, yearsDe)
                         .replace(/{drink}/g, drink.de)
                         .replace(/{food}/g, food.de)
                         .replace(/{time}/g, time.de)
                         .replace(/{nameMasc}/g, nameMasc)
                         .replace(/{nameFem}/g, nameFem)
                         .replace(/{itemMasc}/g, itemMasc.de)
                         .replace(/{itemFem}/g, itemFem.de)
                         .replace(/{itemNeut}/g, itemNeut.de);

  enSentence = enSentence.replace(/{city}/g, city.en)
                         .replace(/{years_en}/g, yearsEn)
                         .replace(/{drink_en}/g, drink.en)
                         .replace(/{food_en}/g, food.en)
                         .replace(/{time_en}/g, time.en)
                         .replace(/{nameMasc}/g, nameMasc)
                         .replace(/{nameFem}/g, nameFem)
                         .replace(/{itemMasc_en}/g, itemMasc.en)
                         .replace(/{itemFem_en}/g, itemFem.en)
                         .replace(/{itemNeut_en}/g, itemNeut.en);

  let caseName = "nominative";
  if (pronounId.includes("_akk")) caseName = "accusative";
  if (pronounId.includes("_dat") || pronounId.endsWith("_dat")) caseName = "dative";

  let targetPersonStr = PRONOUN_FORMS.find(f => f.id === pronounId)?.label || "";
  targetPersonStr = targetPersonStr.toUpperCase() + ` (${caseName})`;

  return {
    id: Math.floor(Math.random() * 1000000) + 1, 
    sentence: deSentence,
    english: enSentence,
    answer: pronounId.split("_")[0] === "sie" ? (pronounId.includes("formal") ? "Sie" : (pronounId.includes("formal_dat") ? "Ihnen" : "sie")) : (pronounId.includes("formal_dat") ? "Ihnen" : pronounId.split("_")[0]),
    pronounId: pronounId,
    case: caseName,
    targetPerson: targetPersonStr,
    targetClue: template.clue,
    hint: template.hint,
    explanation: `Using the pronoun form "${pronounId.split("_")[0]}" matches the requested grammatical structure of this scenario.`
  };
}

// Router Logic
function showPage(page) {
  if (page === "home") {
    pageHome.classList.remove("hidden");
    pagePractice.classList.add("hidden");
  } else if (page === "practice") {
    pageHome.classList.add("hidden");
    pagePractice.classList.remove("hidden");
  }
}

// Local Storage Handlers
function loadProgress() {
  const saved = localStorage.getItem("german_pronoun_progress_modular");
  if (saved) {
    progress = JSON.parse(saved);
  } else {
    resetProgressObj();
  }
  renderProgressBoard();
  updateMasteryStats();
}

function resetProgressObj() {
  PRONOUN_FORMS.forEach(form => {
    progress[form.id] = 0;
  });
  saveProgress();
}

function saveProgress() {
  localStorage.setItem("german_pronoun_progress_modular", JSON.stringify(progress));
}

// GUI Rendering
function renderProgressBoard() {
  gridNominative.innerHTML = "";
  gridAccusative.innerHTML = "";
  gridDative.innerHTML = "";

  PRONOUN_FORMS.forEach(form => {
    const count = progress[form.id] || 0;
    const pct = Math.min((count / 10) * 100, 100);
    
    let barColor = "bg-blue-600";
    if (form.case === "accusative") barColor = "bg-emerald-600";
    if (form.case === "dative") barColor = "bg-violet-600";

    const card = document.createElement("button");
    card.className = `p-2 rounded-xl border text-left transition-all relative flex flex-col justify-between ${
      focusCategory === form.id 
        ? 'ring-2 ring-red-500 border-red-300 bg-red-50/50 shadow-sm font-semibold' 
        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 hover:border-slate-300'
    }`;
    
    const isMastered = count >= 10;
    
    card.innerHTML = `
      <div class="flex justify-between items-center w-full">
        <span class="font-bold text-xs ${isMastered ? 'text-slate-400 line-through' : 'text-slate-800'}">${form.label}</span>
        <span class="text-[9px] font-bold ${isMastered ? 'text-emerald-600' : 'text-slate-500'}">${count}/10</span>
      </div>
      <div class="w-full bg-slate-200 h-1 rounded-full mt-1.5 overflow-hidden">
        <div class="${barColor} h-full transition-all duration-300" style="width: ${pct}%"></div>
      </div>
      ${isMastered ? '<span class="absolute top-0.5 right-0.5 text-[8px] text-emerald-500"><i class="fa-solid fa-circle-check"></i></span>' : ''}
    `;

    card.addEventListener("click", () => {
      setFocus(form.id);
    });

    if (form.case === "nominative") gridNominative.appendChild(card);
    if (form.case === "accusative") gridAccusative.appendChild(card);
    if (form.case === "dative") gridDative.appendChild(card);
  });
}

function setFocus(id) {
  focusCategory = id;
  if (id === "all") {
    badgeFocus.classList.add("hidden");
    btnClearFocus.classList.add("hidden");
  } else {
    badgeFocus.classList.remove("hidden");
    const formObj = PRONOUN_FORMS.find(f => f.id === id);
    badgeFocus.innerHTML = `<i class="fa-solid fa-bullseye mr-1"></i> Focus: ${formObj ? formObj.label : id}`;
    btnClearFocus.classList.remove("hidden");
  }
  renderProgressBoard();
  loadNextQuestion();
}

function updateMasteryStats() {
  let totalPoints = 0;
  let masteredCount = 0;
  
  PRONOUN_FORMS.forEach(form => {
    const val = progress[form.id] || 0;
    totalPoints += Math.min(val, 10);
    if (val >= 10) masteredCount++;
  });

  const maxPoints = 270;
  const masteryPct = Math.round((totalPoints / maxPoints) * 100);

  masteryTotalText.innerText = `${masteryPct}%`;
  masteryCountText.innerText = totalPoints;

  const circleCircumference = 2 * Math.PI * 32; 
  const strokeDashoffset = circleCircumference - (masteryPct / 100) * circleCircumference;
  radialProgressBar.style.strokeDashoffset = strokeDashoffset;
  radialText.innerText = `${masteredCount}/27`;

  if (masteryPct < 40) radialProgressBar.setAttribute("stroke", "#ef4444"); 
  else if (masteryPct < 85) radialProgressBar.setAttribute("stroke", "#f59e0b"); 
  else radialProgressBar.setAttribute("stroke", "#10b981"); 
}

// Toggle Visibility
function setDetailsVisibility(visible) {
  detailsRevealed = visible;
  if (visible) {
    englishSentence.classList.remove("hidden");
    englishSentenceHidden.classList.add("hidden");
    
    targetDetailsVisible.classList.remove("hidden");
    targetDetailsHidden.classList.add("hidden");

    badgeCaseVisible.classList.remove("hidden");
    badgeCaseHidden.classList.add("hidden");

    eyeIconState.className = "fa-solid fa-eye-slash";
    eyeTextState.innerText = "Hide Translation & Case";
  } else {
    englishSentence.classList.add("hidden");
    englishSentenceHidden.classList.remove("hidden");
    
    targetDetailsVisible.classList.add("hidden");
    targetDetailsHidden.classList.remove("hidden");

    badgeCaseVisible.classList.add("hidden");
    badgeCaseHidden.classList.remove("hidden");

    eyeIconState.className = "fa-solid fa-eye";
    eyeTextState.innerText = "Show Translation & Case";
  }
}

btnToggleEye.addEventListener("click", () => {
  setDetailsVisibility(!detailsRevealed);
});

// Load Next Task
function loadNextQuestion() {
  userInput.value = "";
  userInput.disabled = false;
  btnSubmit.disabled = false;
  userInput.focus();
  feedbackAlert.classList.add("hidden");
  hintBox.classList.add("hidden");
  inputCheckIcon.className = "absolute right-4 top-1/2 -translate-y-1/2 text-xl hidden";

  setDetailsVisibility(false);

  let targetPronounId = "";

  if (focusCategory === "all") {
    const unmasteredForms = PRONOUN_FORMS.filter(f => (progress[f.id] || 0) < 10);
    const sourceForms = unmasteredForms.length > 0 ? unmasteredForms : PRONOUN_FORMS;
    targetPronounId = drawRandom(sourceForms).id;
  } else if (focusCategory === "nominative" || focusCategory === "accusative" || focusCategory === "dative") {
    const filteredForms = PRONOUN_FORMS.filter(f => f.case === focusCategory);
    const unmasteredFiltered = filteredForms.filter(f => (progress[f.id] || 0) < 10);
    const sourceForms = unmasteredFiltered.length > 0 ? unmasteredFiltered : filteredForms;
    targetPronounId = drawRandom(sourceForms).id;
  } else {
    targetPronounId = focusCategory;
  }

  const question = synthesizeQuestion(targetPronounId);
  if (!question) return;

  currentQuestion = question;

  const processedSentence = question.sentence.replace("___", `<span class="border-b-4 border-slate-400 px-6 text-red-600 inline-block text-center min-w-[80px]" id="visual-blank">?</span>`);
  textGerman.innerHTML = processedSentence;
  
  textEnglish.innerText = question.english;
  textPerson.innerText = question.targetPerson;
  textClue.innerText = question.targetClue;

  badgeCaseVisible.innerText = question.case;
  badgeCaseVisible.className = "px-2.5 py-1 text-xs font-bold rounded-full uppercase ";
  if (question.case === "nominative") {
    badgeCaseVisible.classList.add("bg-blue-100", "text-blue-800", "border", "border-blue-200");
  } else if (question.case === "accusative") {
    badgeCaseVisible.classList.add("bg-emerald-100", "text-emerald-800", "border", "border-emerald-200");
  } else {
    badgeCaseVisible.classList.add("bg-violet-100", "text-violet-800", "border", "border-violet-200");
  }
}

// Validator
function checkAnswer() {
  const ans = userInput.value.trim();
  if (!ans) return;

  const correctAns = currentQuestion.answer;
  const isMatchCaseInsensitive = ans.toLowerCase() === correctAns.toLowerCase();

  userInput.disabled = true;
  btnSubmit.disabled = true;

  setDetailsVisibility(true);

  feedbackAlert.classList.remove("hidden");
  
  if (ans === correctAns) {
    showFeedback(true, "Sehr gut! (Excellent)", currentQuestion.explanation);
    incrementProgress(currentQuestion.pronounId);
  } else if (isMatchCaseInsensitive) {
    const capFeedback = `Close! You found the correct word, but pay close attention to German capitalization. Formal pronouns like <strong>"${correctAns}"</strong> must ALWAYS start with a capital letter. <br><br> ${currentQuestion.explanation}`;
    showFeedback(true, "Fast richtig! (Almost Correct)", capFeedback, "warning");
    incrementProgress(currentQuestion.pronounId); 
  } else {
    const wrongFeedback = `The correct pronoun is <strong>"${correctAns}"</strong>. <br><br>${currentQuestion.explanation}`;
    showFeedback(false, "Falsch (Incorrect)", wrongFeedback);
  }
}

function showFeedback(isCorrect, title, body, statusOverride) {
  feedbackAlert.className = "p-5 rounded-xl border flex flex-col sm:flex-row items-start gap-3 transition-all";
  
  if (isCorrect) {
    if (statusOverride === "warning") {
      feedbackAlert.classList.add("bg-amber-50", "border-amber-200", "text-amber-800");
      feedbackIcon.innerHTML = `<i class="fa-solid fa-circle-exclamation text-amber-500 text-2xl"></i>`;
      inputCheckIcon.innerHTML = `<i class="fa-solid fa-triangle-exclamation text-amber-500"></i>`;
    } else {
      feedbackAlert.classList.add("bg-emerald-50", "border-emerald-200", "text-emerald-800");
      feedbackIcon.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500 text-2xl"></i>`;
      inputCheckIcon.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-500"></i>`;
    }
    inputCheckIcon.classList.remove("hidden");
    document.getElementById("visual-blank").innerText = currentQuestion.answer;
    document.getElementById("visual-blank").className = "text-emerald-600 font-bold border-b-4 border-emerald-500 px-2";
  } else {
    feedbackAlert.classList.add("bg-red-50", "border-red-200", "text-red-800");
    feedbackIcon.innerHTML = `<i class="fa-solid fa-circle-xmark text-red-500 text-2xl"></i>`;
    inputCheckIcon.innerHTML = `<i class="fa-solid fa-circle-xmark text-red-500"></i>`;
    inputCheckIcon.classList.remove("hidden");
    document.getElementById("visual-blank").innerText = `${userInput.value || "?"} (${currentQuestion.answer})`;
    document.getElementById("visual-blank").className = "text-red-600 font-bold border-b-4 border-red-500 px-2";
  }

  feedbackTitle.innerHTML = title;
  feedbackBody.innerHTML = body;
}

function incrementProgress(pronounId) {
  if (progress[pronounId] === undefined) progress[pronounId] = 0;
  progress[pronounId]++;
  saveProgress();
  updateMasteryStats();
  renderProgressBoard();
}

// Router Bindings
btnLaunchPronouns.addEventListener("click", () => {
  showPage("practice");
  loadNextQuestion();
});

btnPortalHome.addEventListener("click", () => {
  showPage("home");
});

btnReturnPortal.addEventListener("click", () => {
  showPage("home");
});

logoContainer.addEventListener("click", () => {
  showPage("home");
});

btnSubmit.addEventListener("click", checkAnswer);
userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (btnSubmit.disabled) {
      loadNextQuestion();
    } else {
      checkAnswer();
    }
  }
});

btnNext.addEventListener("click", loadNextQuestion);
btnSkip.addEventListener("click", loadNextQuestion);

btnShowHint.addEventListener("click", () => {
  hintBox.innerText = currentQuestion.hint;
  hintBox.classList.toggle("hidden");
});

btnClearFocus.addEventListener("click", () => {
  setFocus("all");
});

// Modal Actions
btnCheatSheet.addEventListener("click", () => {
  modalBackdrop.classList.remove("hidden");
});
modalClose.addEventListener("click", () => {
  modalBackdrop.classList.add("hidden");
});
modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    modalBackdrop.classList.add("hidden");
  }
});

// Hard-Reset Control
btnReset.addEventListener("click", () => {
  if (confirm("Are you absolutely sure you want to reset all portal learning records to 0?")) {
    resetProgressObj();
    loadProgress();
    setFocus("all");
    showPage("home");
  }
});

// Initialize system on document parsing
loadProgress();
showPage("home");