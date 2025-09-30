let currentAnimal = null;

const animalList = document.getElementById("animal-list");
const animalName = document.getElementById("animal-name");
const animalImage = document.getElementById("animal-image");
const animalVotes = document.getElementById("animal-votes");
const voteBtn = document.getElementById("vote-btn");
const resetBtn = document.getElementById("reset-btn");
const form = document.getElementById("animal-form");

// Fetch and display animal list
fetch("http://localhost:3000/characters")
  .then((res) => res.json())
  .then((animals) => {
    animals.forEach((animal) => {
      addAnimalToList(animal);
    });
  })
  .catch((err) => console.error("Error fetching animals:", err));

// Display selected animal
function showAnimal(animal) {
  currentAnimal = { ...animal }; // copy to avoid altering server data
  animalName.textContent = animal.name;
  animalImage.src = animal.image;
  animalVotes.textContent = animal.votes;
}

// Add an animal to the list
function addAnimalToList(animal) {
  const li = document.createElement("li");
  li.textContent = animal.name;
  li.addEventListener("click", () => showAnimal(animal));
  animalList.appendChild(li);
}

// Vote button
voteBtn.addEventListener("click", () => {
  if (!currentAnimal) return alert("Please select an animal first!");
  currentAnimal.votes += 1;
  animalVotes.textContent = currentAnimal.votes;
});

// Reset button
resetBtn.addEventListener("click", () => {
  if (!currentAnimal) return alert("Please select an animal first!");
  currentAnimal.votes = 0;
  animalVotes.textContent = currentAnimal.votes;
});

// Add new animal via form
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const image = document.getElementById("image").value.trim();

  if (!name || !image) return alert("Please provide both name and image URL.");

  const newAnimal = {
    id: Date.now(),
    name: name,
    image: image,
    votes: 0,
  };

  addAnimalToList(newAnimal);
  form.reset();
});
