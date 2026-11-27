const logoutBtn = document.getElementById('logoutBtn');
const message = document.getElementById('message');

logoutBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('/logout', {
            method: "POST"
        })

        const data = await response.json();

        if (response.ok) {
            window.location.href = '../pages/login.html'
        } else {
            message.innerText = `${data.message}`;
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})