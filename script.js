const header = document.querySelector("header");

window.addEventListener ("scroll", function() {
	header.classList.toggle ("sticky", window.scrollY > 0);
});

let navlist = document.querySelector('.navlist');


window.onscroll = () => {
	menu.classList.remove('bx-x');
	navlist.classList.remove('active');
};

const sr = ScrollReveal ({
	distance: '45px',
	duration: 2700,
	reset: true
})

sr.reveal('.home-text',{delay:350, origin:'left'})
sr.reveal('.home-img',{delay:350, origin:'right'})

sr.reveal('.about,.portfolio,.service',{delay:200, origin:'bottom'})

const togglebtn = document.querySelector(".toggle-btn");
const togglebtnicon = document.querySelector(".toggle-btn i");
const dropdownmenu = document.querySelector(".dropdown-menu");

togglebtn.onclick = function () {
	dropdownmenu.classlist.toggle('open')
}
