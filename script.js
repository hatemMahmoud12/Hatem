var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function sendEmail(){
  Email.send({
    SecureToken : "285ce101-2bff-4c4f-a4e1-481118279b19",
    To : 'hatemmahmoued123@gmail.com',
    From : "hatemmahmoued123@gmail.com",
    Subject : "This is the subject",
    Body : "And this is the body"
}).then(
  message => alert(message)
);
}