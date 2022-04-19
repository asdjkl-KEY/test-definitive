function getCurrent(id) {
    let element = document.getElementById(id);
    element.style.borderBottom = '3px solid #ffc14d'
}
getCurrent(current);
let list = ["home", "contact", "about"];
function on_hover(id) {
    let element = document.getElementById(id);
    element.addEventListener('mouseover', () => {
        element.style.borderBottom = '3px solid #ffc14d';
        element.style.transition = '0.1s';
    });
    element.addEventListener('mouseout', () => {
        element.style.borderBottom = '0px';
        element.style.transition = '0.1s';
    });
}
for (link of list) {
    if(current == link) continue;
    on_hover(link);
}