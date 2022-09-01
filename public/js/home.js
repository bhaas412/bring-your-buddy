
const btn = document.getElementById('mobilebtn')
const menu = document.getElementById('mobilemenu')
const searchbar = document.getElementById('searchbar')
const select = document.getElementById('typeselect')
let query = []

btn.addEventListener('click', () => {
    menu.classList.toggle('hidden')
});

//getting data from dropdown and search element to pass as query

function selectedL(event) {

    console.log(locationType)
}

function runsearch() {
    const locationQuery = searchbar.value
    const locationType = typeselect.value

    if (locationType !== "Type..") {
        query.push(locationType)
    }

    query.push(locationQuery)


    console.log(query)
}





