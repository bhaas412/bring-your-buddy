async function editFormHandler(event) {
    event.preventDefault();
    
    // Get review information elements
    const review_title = document.querySelector('input[name="post-title"]').value.trim();
    const review_text = document.querySelector('input[name="post-body"]').value.trim();
    const review_rating = '';
    const pet_type = '';
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            review_title,
            review_text,
            review_rating,
            pet_type,
            id
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

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);