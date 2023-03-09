function createComment(name, verified, commentText, starsCount) {
    // Cria o elemento hr
    const hr = document.createElement('hr');

    // Cria a lista de estrelas
    const stars = document.createElement('ul');
    stars.innerHTML = `
        <li class="fa-sharp fa-solid fa-star userstar"></li>
        <li class="fa-sharp fa-solid fa-star userstar"></li>
        <li class="fa-sharp fa-solid fa-star userstar"></li>
        <li class="fa-sharp fa-solid fa-star userstar"></li>
        <li class="fa-sharp fa-solid fa-star userstar"></li>
        <h6 class="name">${name}</h6>
        <i class="fa-sharp fa-solid fa-circle-check"></i>
        <span>Compra verificada</span>
        <p class="comment">${commentText}</p>
    `;

    // Adiciona a classe 'verified' à lista de estrelas, se for uma compra verificada
    if (verified) {
        stars.classList.add('verified');
    }

    // Adiciona todos os elementos à div com a classe 'comments'
    const comments = document.querySelector('.comments');
    // comments.appendChild(hr);
    comments.appendChild(stars);
    comments.appendChild(hr.cloneNode()); // adiciona outra hr no final
}
