const loadLevel = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((results) => {
      displayLevel(results.data)
    });
}

const removeActive = () => {
  const allBtn = document.querySelectorAll(".lesson-btn");
  allBtn.forEach((btn)=>{
    btn.classList.remove("active");
  })
}

const loadWordLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active");
      showWordLevel(data.data);
    });
}

const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  showWordDetail(details.data);
}

const showWordDetail = (detail) => {
  const detailContainer = document.getElementById("details-container");
  detailContainer.innerHTML = `
        <div>
          <h2 class="font-bold text-2xl">${detail.word} (<i class="fa-duotone fa-solid fa-microphone-lines"></i> :${detail.pronunciation})</h2>
        </div>
        <div>
          <p class="font-semibold mb-2">Meaning</p>
          <p>${detail.meaning}</p>
        </div>
        <div>
          <p class="font-semibold mb-2">Example</p>
          <p>${detail.sentence}</p>
        </div>
        <div>
          <p class="font-medium font-bangla mb-2">সমার্থক শব্দ গুলো</p>
          <div class="flex gap-2">
            ${createBtn(detail.synonyms)}
          </div>
        </div>
  `;
  document.getElementById("word_modal").showModal();
}

const showWordLevel = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if(words.length == 0) {
    wordContainer.innerHTML = `
      <div class="col-span-full text-center font-bangla space-y-6 py-15">
        <img class="mx-auto md:w-33" src="assets/alert-error.png" alt="">
        <p class="text-[#79716B] font-light">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <p class="font-bold text-4xl">নেক্সট Lesson এ যান</p>
      </div>`;
    return;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");

    wordCard.innerHTML = `
      <div class="word-card bg-white rounded-xl p-10">

        <div class="space-y-3 mx-auto text-center text-xl">
          <h2 class="font-bold">${word.word}</h2>
          <p class="text-[1rem]">Meaning / Pronounciation</p>
          <h2 class="font-semibold text-xl font-bangla">"${word.meaning} / ${word.pronunciation}"</h2>
        </div>

        <div class="button-stuffs flex justify-between mt-8">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#badeff42] hover:bg-[#badeff80]"><i class="fa-solid fa-circle-info"></i></button>
          <button onclick="pronounceWord('${word.word}')" class="btn bg-[#badeff42] hover:bg-[#badeff80]"><i class="fa-duotone fa-solid fa-volume-high"></i></button>
        </div>

      </div>
    `;

    wordContainer.append(wordCard);
  });
}

const displayLevel = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const lessonBtn = document.createElement("div");

    lessonBtn.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadWordLevel('${lesson.level_no}')" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    
    `
    levelContainer.append(lessonBtn);


  });

}

const createBtn = (arr) => {
  const htmlElement = arr.map((el) => `<button class="btn bg-[#edf7ff]">${el}</button>`);
  return htmlElement.join(" ");
}

loadLevel();

document.getElementById("btn-search").addEventListener("click", ()=>{
  removeActive();
  const input = document.getElementById("input-search");
  const searched = input.value.trim().toLowerCase();

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((words) => {
      const allWords = words.data;

      const filterWord = allWords.filter((word) => word.word.toLowerCase().includes(searched));

      showWordLevel(filterWord);
    } );
})

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}