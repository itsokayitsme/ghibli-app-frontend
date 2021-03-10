const BACKEND_URL = "http://localhost:3000";

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