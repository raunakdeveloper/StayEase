// listings.js

document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.querySelector('.create-btn');

    createBtn.addEventListener('click', (e) => {
        const confirmCreate = confirm("Are you sure you want to create a new listing?");
        if (!confirmCreate) {
            e.preventDefault();
        }
    });
});
