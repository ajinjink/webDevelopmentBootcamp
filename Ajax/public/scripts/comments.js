const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');

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
    
    const commentsListElement = createCommentsList(responseData);
    commentsSectionElement.innerHTML = ''; // clear
    commentsSectionElement.appendChild(commentsListElement);
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);