const btns = document.querySelectorAll('.btn');
const displayContent = document.querySelector('.screen-bottom');

btns.forEach(btn => {
    btn.addEventListener('click', () => {
        displayContent.textContent += btn.textContent;
    });
});