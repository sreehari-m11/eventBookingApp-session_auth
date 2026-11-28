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

const openBtn = document.getElementById('openFormBtn');
const bookingDialog = document.getElementById('booking-dialog');
const closeBtn = document.getElementById('close-dialog');
const cancelBtn = document.getElementById('cancel');
const successMsgSection = document.getElementById('successMsgSection')
const successMsg = document.getElementById('successMessage');

const addBookingForm = document.getElementById('addBookingForm');

openBtn.addEventListener('click', () => {
    bookingDialog.showModal()
})

closeBtn.addEventListener('click', () => {
    bookingDialog.close()
    successMsgSection.style.display = 'flex';
    successMsg.innerText = "Closed form"
})

cancelBtn.addEventListener('click', () => {
    bookingDialog.close();
})

document.getElementById('closeMsgBtn').addEventListener('click', () => {
    successMsgSection.style.display = 'none';
})

addBookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const location = document.getElementById('location').value;
    const ticketCount = Number(document.getElementById('tickets').value);
    const status = document.getElementById('status').value;

    try {

        const response = await fetch('/addbooking', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                eventName,
                eventDate,
                location,
                ticketCount,
                status
            })
        });
        const data = await response.json();

        if (response.ok) {
            window.location.href = '../pages/dashboard.html'
            successMsgSection.style.display = 'flex';
            successMsg.innerText = `${data.message}`
        } else {
            console.log(data.message);
        }

    } catch (err) {
        console.log(err.message);
    }
})

getBookings();