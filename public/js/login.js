const login = async (email, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:7860/api/v1/users/login',
            data: {
                email,
                password,
            },
        });
        if (res.status === 200) {
            window.setTimeout(() => {
                location.assign('/posts');
            }, 1500);
        }
    } catch (error) {
        console.error(error.response.data.msg);
    }
};

const form = document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
});
