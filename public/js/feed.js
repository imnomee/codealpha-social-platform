document.addEventListener('DOMContentLoaded', async function () {
    try {
        const data = await fetch('/api/v1/posts/getFeedPosts').then((res) =>
            res.json()
        );
        const postList = document.getElementById('posts-list');
        postList.innerHTML = '';
        console.log(data);
        if (data.lengh === 0) {
            postList.innerHTML = '<li>No Posts to display</li>';
        } else {
            data.forEach((post) => {
                const postItem = document.createElement('li');
                postItem.innerHTML = `
                        <div>
                              <strong>${post.userId.username}</strong>: ${post.content} <br>
                              Likes: ${post.likes.length}<br>
                              Comments: ${post.comments.length}


                        </div>
                  `;
                postList.appendChild(postItem);
            });
        }
    } catch (error) {
        console.error(error);
    }
});
