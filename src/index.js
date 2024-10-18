let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// let addToy = false;

// document.addEventListener("DOMContentLoaded", () => {
//   const addBtn = document.querySelector("#new-toy-btn");
//   const toyFormContainer = document.querySelector(".container");
  
//   addBtn.addEventListener("click", () => {
//     addToy = !addToy;
//     toyFormContainer.style.display = addToy ? "block" : "none";
//   });

  const BASE_URL = "http://localhost:3000/toys";
  
  fetch(BASE_URL)
    .then(res => res.json())
    .then(toyArray => toyArray.forEach(toyObj => renderToy(toyObj)));

  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', submitHandler);

  function submitHandler(event) {
    event.preventDefault();
    
    const newToy = {
      name: event.target.name.value,
      likes: 0,
      image: event.target.image.value
    };

    window.scrollTo(0, document.body.scrollHeight);
    renderToy(newToy);
    event.target.reset();

    fetch(BASE_URL, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy)
    })
    .then(res => res.json())
    .then(data => {
      // You can handle the response data if needed
      console.log("New toy added:", data);
    })
    .catch(error => console.error("Error adding new toy:", error));
  }

  function renderToy(toyObj) { 
    const toyDiv = document.createElement('div');
    toyDiv.className = "card";

    const toyName = document.createElement('h2');
    toyName.innerText = toyObj.name;

    const toyImg = document.createElement('img');
    toyImg.src = toyObj.image;
    toyImg.className = "toy-avatar";

    const toyLikes = document.createElement('p');
    toyLikes.innerText = "Likes: " + toyObj.likes;

    const likeBtn = document.createElement('button');
    likeBtn.innerText = '❤️';
    likeBtn.addEventListener('click', () => {
      toyObj.likes++;
      toyLikes.innerText = `Likes: ${toyObj.likes}`;

      fetch(`${BASE_URL}/${toyObj.id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: toyObj.likes })
      })
      .then(res => res.json())
      .then(data => console.log("Likes updated:", data))
      .catch(error => console.error("Error updating likes:", error));
    });

    toyDiv.append(toyName, toyImg, toyLikes, likeBtn);
    const toyCollection = document.getElementById('toy-collection');
    toyCollection.appendChild(toyDiv);
  }
;
