const BACKEND_URL = "http://localhost:3000";
const cardArea = document.getElementById("card-area")
const form = document.querySelector("form")
const select = form.querySelector('select')
let character_counter = 0
const directors_names = []
let addMovie = false

document.addEventListener("DOMContentLoaded", ()=>{
    fetchMovies()
  
  });
  
    function fetchMovies(){
      fetch(`${BACKEND_URL}/movies`)
      .then(resp => resp.json())
      .then(json => {
        for (movie of json){
          let mObject = new Movie(movie);
          mObject.addMovietoPage()
        } 
      }   
        );
    }

    
let button = document.querySelector("div#create-movie")
button.addEventListener("click",()=>{
  if(addMovie){
    form.style.display = "none"
  }else{
    form.style.display = "block"
  }
  addMovie = !addMovie
})

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  let inputs = form.querySelectorAll("input")
  let inputsForNames = form.getElementsByClassName("character-names")
  let inputsForImages = form.getElementsByClassName("character-images")
  let inputArray = [inputs,inputsForNames,inputsForImages]
  let textareas = form.querySelectorAll("textarea")


  if(!!inputs[0].value){
    Movie.createMovie(inputArray,textareas)
  }else{
    alert("Must provide a name")
  }
})

function clearAllInputs(inputs, textareas){
    inputs.forEach((input)=>input.value = "")
    textareas.forEach((text)=>text.value = "")
    document.querySelector("input[type='submit']").value = 'submit'
    document.getElementById("add-characters").value = 'Add more characters'
  }
  
  
  function addMoreCharacter(){
    character_counter +=1
    form.innerHTML += `
    
    <br>
    <label class="character-name">Character name</label>
    <input class="character-names" type="text" name="movie[characters_attributes][${character_counter}][name]" id="movie[characters_attributes][${character_counter}][name]" placeholder="Must provide a name"></br>
      
  
    <label>Character image</label>
    <input class = "character-images" type="text" name="movie[characters_attributes][${character_counter}][image]" id="movie[characters_attributes][${character_counter}][image]" placeholder="Image URL"></br>
  
    <label>Character introduction</label>
    <textarea name="movie[characters_attributes][${character_counter}][introduction]" id="movie[characters_attributes][${character_counter}][introduction]"></textarea></br>
    <br>
    `
    document.getElementsByClassName("submit")[0].remove()
    form.innerHTML +='<input class="submit" type="submit" value="Submit">'
  }
  
  let buttonForSorting = document.getElementById("sort-button")
  buttonForSorting.addEventListener("click", function(){
    fetch(`${BACKEND_URL}/movies`)
    .then(resp=>resp.json())
    .then((array)=>{
    array.sort(sorting)
    cardArea.innerHTML=""
    array.forEach((movie)=>{
      let mObject = new Movie(movie);
      mObject.addMovietoPage()
    })
  })
  })
  
  function sorting(a, b) {
    let nameA = a.title.toUpperCase(); 
    let nameB = b.title.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  }
  
  
  