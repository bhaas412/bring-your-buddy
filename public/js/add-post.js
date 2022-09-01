async function newFormHandler(event) {
    event.preventDefault();

    // Get review information elements
    const review_title = document.querySelector('input[name="post-title"]').value;
    const review_text = document.querySelector('input[name="post-body"]').value;
    

    function displayRadioValue() {
        let ele = document.getElementsByTagName('input');
        let results = []
          
        for(i = 0; i < ele.length; i++) {
              
            if(ele[i].type="radio") {
              
                if(ele[i].checked)
                ele[i].value = results
            }
        }
    }

    const review_rating = '';
    const pet_type = '';

    // Make a post request with review information
    const response = await fetch('/api/reviews', {
        method: 'post', 
        body: JSON.stringify({
            review_title,
            review_text,
            review_rating,
            pet_type
        }),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok) {
        document.location.replace('/');
    }
    else {
        alert(response.statusText);
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);