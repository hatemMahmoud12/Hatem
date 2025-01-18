// الحصول على عنصر النموذج
const contactForm = document.getElementById('contactForm');

// معالجة إرسال النموذج
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // جمع بيانات النموذج
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // رابط Formspree API (استبدل YOUR_FORMSPREE_ID بالمعرف الخاص بك)
    const formspreeUrl = 'https://formspree.io/f/mjkkdedk';

    try {
        // إرسال البيانات إلى Formspree
        const response = await fetch(formspreeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        // التحقق من نجاح الإرسال
        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'تم الإرسال',
                text: 'شكرًا لك على تواصلك معنا، سنقوم بالرد عليك قريبًا!',
                confirmButtonText: 'حسنًا'
            });
            contactForm.reset();
        } else {
            throw new Error(result.error || 'حدث خطأ أثناء إرسال الرسالة.');
        }
    } catch (error) {
        console.error('خطأ في إرسال الرسالة:', error);
        Swal.fire({
            icon: 'error',
            title: 'خطأ',
            text: 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.',
            confirmButtonText: 'حسنًا'
        });
    }
});

// كود تحريك القائمة الجانبية
const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      links = document.querySelectorAll("nav a"),
      icons = document.querySelectorAll("nav i"),
      logo = document.querySelector(".logo"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose");

// فتح القائمة الجانبية
sidebarOpen.addEventListener("click", () => {
  nav.classList.add("active");
  links.forEach(link => {
      link.style.color = "white";
  });
});

// إغلاق القائمة الجانبية
body.addEventListener("click", e => {
  let clickedElm = e.target;

  if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
      nav.classList.remove("active");
  }
});

// تغيير خلفية النافبار أثناء التمرير
const changeNavBackground = function () {
    if (window.scrollY > 80) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        nav.style.transition = "background-color 0.3s ease";
        links.forEach(link => {
            link.style.color = "white";
        });
        icons.forEach(icon => {
            icon.style.color = "white";
        });
        logo.style = "filter: brightness(0) invert(1);";
    } else {
        nav.style.backgroundColor = "transparent";
        links.forEach(link => {
            link.style.color = "white";
        });
        icons.forEach(icon => {
            icon.style.color = "white";
        });
        logo.style = "filter: brightness(0) invert(1);";
    }
};

// الاستماع لحدث التمرير
window.addEventListener("scroll", changeNavBackground);