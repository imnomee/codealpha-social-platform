document.addEventListener('DOMContentLoaded', async function () {
    try {
        const data = await fetch('/api/v1/posts/getFeedPosts').then((res) =>
            res.json()
        );
        const postList = document.getElementById('posts-list');
        postList.innerHTML = '';
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

const createPost = async () => {
    try {
        const content = document.getElementById('content').value; // Get the value after the click
        if (!content) {
            alert('Content cannot be empty');
            return;
        }

        const res = await axios({
            method: 'POST',
            url: '/api/v1/posts/createPost', // Relative URL to avoid CORS issues
            data: {
                content, // Send the content properly
            },
        });

        if (res.status === 201) {
            // Use 201 for "Created"
            alert('Post created successfully');
            window.setTimeout(() => {
                location.reload(); // Reload to see the new post
            }, 1500);
        }
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
};
const content = document.getElementById('content').value;
const contentBtn = document
    .getElementById('contentBtn')
    .addEventListener('click', createPost);
