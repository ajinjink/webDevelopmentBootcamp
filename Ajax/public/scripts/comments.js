const loadCommentsBtnElement = document.getElementById('load-comments-btn');

async function fetchCommentsForPost(event) {
    const postId = loadCommentsBtnElement.dataset.postid;
    const response = await fetch(`/posts/${postId}/comments`); // url of get request
    const responseData = await response.json(); // browser method. parse json -> js object
    console.log(responseData);
}

loadCommentsBtnElement.addEventListener('click', fetchCommentsForPost);