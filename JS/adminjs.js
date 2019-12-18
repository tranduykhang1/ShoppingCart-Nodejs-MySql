window.onscroll = () => {
    keomenu()
};

function keomenu() {
    if (document.body.scrollTop > 1 || document.documentElement.scrollTop > 1) {
        document.getElementById('header').style.background = "#FFF5E5";
        document.getElementById('header').style.opacity = ".9";
        document.getElementById('dautrang').style.visibility = "visible";
        document.getElementById('danhmuc-tk').style.opacity = '.6';
    } else {
        document.getElementById('header').style.background = "none";
        document.getElementById('header').style.opacity = "1";
        document.getElementById('dautrang').style.visibility = "hidden";
        document.getElementById('danhmuc-tk').style.opacity = '1';
    }
}



function danhmuc() {
    document.getElementById('them_dm').style.display = "block";
}

function khuyenmai() {
    document.getElementById('them_km').style.display = "block";
}


function dong() {
    document.getElementById('them_dm').style.display = "none";
    document.getElementById('them_km').style.display = "none";
}