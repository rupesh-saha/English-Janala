const loadLevel = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((results) => {
      displayLevel(results.data)
    });
}

const loadWordLevel = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  
  fetch(url)
    .then((res) => res.json())
    .then((data) => showWordLevel(data.data));
}

const showWordLevel = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

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
          <button class="btn bg-[#badeff42] hover:bg-[#badeff80]"><i class="fa-solid fa-circle-info"></i></button>
          <button class="btn bg-[#badeff42] hover:bg-[#badeff80]"><i class="fa-duotone fa-solid fa-volume-high"></i></button>
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
    <button onclick="loadWordLevel('${lesson.level_no}')" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    
    `
    levelContainer.append(lessonBtn);


  });

}

loadLevel();