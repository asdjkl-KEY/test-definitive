let bars = document.getElementById('toggle');
let ispress = false;
bars.addEventListener('click', () => {
    let element = document.getElementById('navbar');
    if(!ispress) {
        element.style.animation = 'aparecer 0.6s forwards';
        return ispress = true;
    } else {
        element.style.animation = 'desaparecer 0.6s forwards';
        return ispress = false;
    }
    
})