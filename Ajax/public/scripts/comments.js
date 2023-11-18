const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createCommentsList(comments) { // make comments arr into list
    const commentListElement = document.createElement('ol');

    for (const comment of comments) {
        const commentElement = document.createElement('li');
        commentElement.innerHTML = `
            <article class="comment-item">
            <h2>${comment.title}</h2>
            <p>${comment.text}</p>
            </article>
            `;
        commentListElement.append(commentElement);
    }

    return commentListElement;
}

async function fetchCommentsForPost(event) {
    const postId = loadCommentsBtnElement.dataset.postid;
    const response = await fetch(`/posts/${postId}/comments`); // url of get request
    const responseData = await response.json(); // browser method. parse json -> js object

    if (responseData && responseData.lengtrh > 0) {
        const commentsListElement = createCommentsList(responseData);
        commentsSectionElement.innerHTML = ''; // clear
        commentsSectionElement.appendChild(commentsListElement);
    }
    else {
        commentsSectionElement.firstElementChild.textContent = "We could not find any comments. Add a comment.";
    }
}

async function saveComment(event) {
    event.preventDefault();
    const postId = commentsFormElement.dataset.postid;

    const enteredTitle = commentTitleElement.value;
    const enteredText = commentTextElement.value;

    const comment = {title: enteredTitle, text: enteredText};
    
    const response = await fetch(`/posts/${postId}/comments`, {
        method: 'POST', // default GET
        body: JSON.stringify(comment), // json format data
        headers: {
            'Content-Type': 'application/json'
        }
    });
    // have to set meta data for the middleware to notice it is json encoded
    // not interested in response
    // interested in "waiting"

    fetchCommentsForPost();
}
 
loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);