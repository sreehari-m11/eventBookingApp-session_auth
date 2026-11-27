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

async function getBookings() {
    let countStr = '';
    let bookingTableStr = '';

    const userNav = document.getElementById('userNav');

    try {
        const response = await fetch('/dashboard');
        const user = await response.json()
        if (response.ok) {
            userNav.innerText = `${user.name}`
        }
    } catch (err) {
        message.innerText = `${err.message}`
    }
}

getBookings();