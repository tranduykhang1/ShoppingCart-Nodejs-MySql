window.onscroll = () => { keomenu() };

function keomenu() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        document.getElementById("nav").style.background = "#FFF5E5";
        document.getElementById("nav").style.opacity = ".9";
    } else {
        document.getElementById("nav").style.background = "none";
        document.getElementById("nav").style.opacity = "1";
    }
}