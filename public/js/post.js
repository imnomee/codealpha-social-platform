const likePost = async (postId) => {
    try {
        const res = await axios({
            method: 'post',
            url: `http://localhost:7860/api/v1/posts/${postId}/like`,
        });
        if (res.status === 200) {
            window.setTimeout(() => {
                location.assign(`/posts/${postId}`);
            }, 1000);
        }
    } catch (error) {
        console.error(error.response.data.msg);
    }
};
const likeButton = document
    .getElementById('like')
    .addEventListener('click', (e) => {
        e.preventDefault();
        const base = e.target.baseURI.split('/');
        const postId = base[base.length - 1];
        likePost(postId);

        //   likePost(base);
    });

const commentOnPost = async (comment, postId) => {
    try {
        const res = await axios({
            method: 'post',
            url: `http://localhost:7860/api/v1/posts/${postId}/comment`,
            data: {
                comment,
            },
        });
        if (res.status === 200) {
            window.setTimeout(() => {
                location.assign(`/posts/${postId}`);
            }, 1000);
        }
    } catch (error) {
        console.error(error.response.data.msg);
    }
};
const commentButton = document
    .getElementById('commentBtn')
    .addEventListener('click', (e) => {
        e.preventDefault();
        const comment = document.getElementById('comment').value;
        const base = e.target.baseURI.split('/');
        const postId = base[base.length - 1];
        commentOnPost(comment, postId);
    });
