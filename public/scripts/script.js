const codeForm = document.querySelector('#codeForm');
const codeLinks = document.querySelectorAll('.codeLink');

const getResult = code => {
    window.location.assign('/' + code + '/');
};

codeForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const codeElm = document.querySelector('#codeText')
    const code = codeElm.value;
    getResult(code);
});

codeLinks.forEach(codeLink => {
    codeLink.addEventListener('click', evt => {
        evt.preventDefault();
        const code = codeLink.innerHTML;
        getResult(code);
    });
});