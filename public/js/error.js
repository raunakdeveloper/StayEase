// Automatically dismiss alert after 5 seconds
setTimeout(() => {
    const alert = document.querySelector('.alert');
    if (alert) {
        alert.classList.add('fade');
        alert.classList.add('d-none');
    }
}, 5000);
