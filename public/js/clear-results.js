function clearResults(){
    document.getElementById('search-results-wrapper').innerHTML = "";
}

document.querySelector('#clear-button').addEventListener('click', function(event) {
    event.preventDefault();
    clearResults();
    });