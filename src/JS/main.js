document.addEventListener('DOMContentLoaded', ()=> {
    const mobMenuBtn = document.querySelector('.burger-menu');
    const menuBody = document.querySelector('.menu__body');
    const hideElements = document.querySelectorAll('.social__menu, .header__btn');
    const statsItems = document.querySelectorAll('.offer__stats-item');
    const slide = document.querySelector('.slide');

    function adaptiveClient (num) {
        return document.body.clientWidth < num;
    }

    mobMenuBtn.addEventListener('click', ()=> {
        menuBody.classList.toggle('active');
        mobMenuBtn.classList.toggle('active');
        document.body.classList.toggle('lock');
    });

    if (adaptiveClient(1000)) {
        menuBody.classList.add('mob-menu');
    } if (adaptiveClient(600)) {
        menuBody.append(hideElements[0]);
    } if (adaptiveClient(320)) {
        menuBody.append(hideElements[1]);
    }
    function offerTimer (delay) {
        let i = 0;
        
        setInterval(()=>{
            if (i > 0) {
                statsItems[i - 1].classList.remove('active');
            }
            statsItems[i].classList.add('active');
            i++;
            if (i == statsItems.length) {
                setTimeout(()=> {
                    statsItems[statsItems.length - 1].classList.remove('active');
                }, delay);
                i = 0;
            }
        }, delay);
    }
    offerTimer(3000);

    $('.blog__slider').slick();
});