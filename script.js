const loadLessons = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const loadWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWord(data.data));
};
const displayWord = (words) => {
  console.log(words);
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `<div class="text-center bg-sky-100 col-span-full space-y-2 font-bangla py-10">
    <img class="mx-auto" src="./assets/alert-error.png"/>
      <p class="text-xl text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h2 class="text-3xl font-bold">নেক্সট Lesson এ যান</h2>
    </div>`;

    return;
  }

  words.forEach((word) => {
    const wordCard = document.createElement("div");
    wordCard.innerHTML = ` <div class="bg-white rounded-xl shadow-sm text-center py-15 px-5 space-y-3">
        <h3 class="text-xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
        <p>Meaning/Pronounciation</p>
        <div class="text-xl font-bold font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</div>
        <div class="flex justify-between w-8/12 mx-auto">
            <button class="btn bg-[#1a90ff10] hover:bg-[#1a90ff80]"><i class="fas fa-info-circle"></i></button>
            <button class="btn bg-[#1a90ff10] hover:bg-[#1a90ff80]"><i class="fas fa-volume-up"></i></button>
        </div>
      </div>
     `;
    wordContainer.append(wordCard);
  });
};
const displayLesson = (lessons) => {
  console.log(lessons);
  // 1. get the level container
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";
  // 2. get all the lessons
  for (let lesson of lessons) {
    // 3. create the Element
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn "> <i class="fas fa-book-open"></i> Lesson - ${lesson.level_no} </button>
  `;
    // 4. append the element to level container
    levelContainer.append(btnDiv);
  }
};

loadLessons();
