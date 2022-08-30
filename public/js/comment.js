async function commentFormHandler(event) {
    event.preventDefault();

    // Get comment information elements (user_id is obtained from session and sent to DB on the backend)
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const review_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_text,
                review_id
            }),
            headers: {'Content-Type': 'application/json'}
        });

        if (response.ok) {
            document.location.reload();
        }
        else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);