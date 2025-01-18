$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            setting: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            setting: {
                slidesToShow: 3
            }
        }]
    });
  });
  
  /**
  * إظهار الهيدر وزر العودة للأعلى عند التمرير لأسفل إلى 100 بكسل
  */
  
  const addEventOnElem = function (elem, type, callback) {
    if (elem.length > 1) {
        for (let i = 0; i < elem.length; i++) {
            elem[i].addEventListener(type, callback);
        }
    } else {
        elem.addEventListener(type, callback);
    }
  }
  
  const header = document.getElementById("header");  
  const headerActive = function () {
    if (window.scrollY > 80) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
  }
  
  addEventOnElem(window, "scroll", headerActive);
  
  window.addEventListener("load", function() {
    // إخفاء أداة التحميل بعد 3 ثوانٍ
    setTimeout(function() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("content").style.display = "block";
        document.getElementById("header").style.display = "flex";
    }, 3000);
  });
  
  const scrollRevealOption = {
    distance: "50px",
    origin: "bottom",
    duration: 1000,
  };
  
  const swiper = new Swiper(".swiper", {
    slidesPerView: "auto",
    spaceBetween: 0,
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting){
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
  });
  
  const hiddenElements = document.querySelectorAll('.hide');
  hiddenElements.forEach((el) => observer.observe(el));
  
  var acc = document.getElementsByClassName("accordion");
  var i;
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        this.classList.toggle("tactive");
        this.parentElement.classList.toggle("tactive");
  
        var panel = this.nextElementSibling;
  
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
  }
  
  const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      sidebarOpen = document.querySelector(".sidebarOpen"),
      siderbarClose = document.querySelector(".siderbarClose"),
      links = document.querySelectorAll("nav a"),
      icons = document.querySelectorAll("nav i");
      logo = document.querySelector(".logo");
  
  // كود JS لتبديل الشريط الجانبي
  sidebarOpen.addEventListener("click", () => {
    nav.classList.add("active");
    links.forEach(link => {
        link.style.color = "white";
    });
  });
  
  body.addEventListener("click", e => {
    let clickedElm = e.target;
  
    if (!clickedElm.classList.contains("sidebarOpen") && !clickedElm.classList.contains("menu")) {
        nav.classList.remove("active");
    }
  });
  
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
            link.style.color = "";
        });
        icons.forEach(icon => {
            icon.style.color = "";
        });
        logo.style = "";
    }
  };
  
  window.addEventListener("scroll", changeNavBackground);
  
  const faqData = [
    {
        question: "كيف أبدأ مشروعي معكم؟",
        answer: "يمكنك التواصل معنا من خلال نموذج الاتصال أو البريد الإلكتروني لمناقشة متطلبات مشروعك بالتفصيل."
    },
    {
        question: "ما هي مدة إكمال المشروع؟",
        answer: "تختلف مدة الإكمال حسب تعقيد المشروع، ولكننا نسعى دائمًا لتقديم أفضل جودة في أقصر وقت ممكن."
    },
    {
        question: "هل تقدمون خدمات ما بعد التسليم؟",
        answer: "نعم، نقدم خدمات الدعم الفني والصيانة لجميع المشاريع التي نكملها."
    },
    {
        question: "ما هي التقنيات التي تستخدمونها؟",
        answer: "نستخدم أحدث التقنيات مثل React وNode.js وFlutter وغيرها من التقنيات المتقدمة."
    },
    {
        question: "كيف تحددون تكلفة المشروع؟",
        answer: "نحدد التكلفة بناءً على متطلبات المشروع الدقيقة بعد دراسة شاملة لاحتياجات العميل."
    }
  ];
  
  function createFAQSection() {
    const accordionContainer = document.querySelector('.accordion-container');
    
    faqData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq');
        
        faqItem.innerHTML = `
            <div class="accordion">
                ${item.question}
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="pannel">
                <p>${item.answer}</p>
            </div>
        `;
        
        accordionContainer.appendChild(faqItem);
    });
  
    // إضافة مستمع النقر
    const accordions = document.querySelectorAll('.accordion');
    
    accordions.forEach((accordion, index) => {
        accordion.addEventListener('click', () => {
            // إغلاق الأسئلة الأخرى
            accordions.forEach((acc, idx) => {
                if (idx !== index) {
                    acc.classList.remove('tactive');
                    acc.nextElementSibling.style.display = 'none';
                }
            });
  
            // تبديل حالة السؤال الحالي
            accordion.classList.toggle('tactive');
            const panel = accordion.nextElementSibling;
            
            if (panel.style.display === 'block') {
                panel.style.display = 'none';
            } else {
                panel.style.display = 'block';
            }
        });
    });
  }
  
  // تحميل الأسئلة الشائعة عند فتح الصفحة
  document.addEventListener('DOMContentLoaded', createFAQSection);
  
  /** مشاريعنا **/
  const projects = [
      {
          id: 1,
          title: "موقع تجارة إلكترونية",
          category: "web",
          description: "متجر عبر الإنترنت متجاوب بالكامل",
          image: "../projects/website-01.png",
          link: "#"
      },
      {
          id: 2,
          title: "تطبيق لياقة بدنية", 
          category: "mobile",
          description: "تطبيق تتبع التمارين",
          image: "../projects/app-01.png",
          link: "#"
      },
      {
          id: 3,
          title: "هوية العلامة التجارية",
          category: "branding", 
          description: "حزمة كاملة للهوية المؤسسية",
          image: "../projects/website-02.png",
          link: "#"
      },
      // يمكنك إضافة المزيد من المشاريع هنا
  ];
  
  function displayProjects(filteredProjects) {
      const projectsGrid = document.getElementById('projects__grid');
      projectsGrid.innerHTML = '';
  
      filteredProjects.forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.classList.add('project__card');
          projectCard.classList.add(project.category);
  
          projectCard.innerHTML = `
              <div class="project__image">
                  <img src="${project.image}" alt="${project.title}">
                  <div class="project__overlay">
                      <a href="service_request/service_request.html" class="project__link">طلب خدمة</a>
                  </div>
              </div>
              <div class="project__details">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
              </div>
          `;
  
          projectsGrid.appendChild(projectCard);
      });
  }
  
  function setupProjectFilters() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      
      filterButtons.forEach(button => {
          button.addEventListener('click', () => {
              // إزالة الفلتر النشط
              filterButtons.forEach(btn => btn.classList.remove('active'));
              button.classList.add('active');
  
              const filter = button.dataset.filter;
              const filteredProjects = projects.filter(project => project.category === filter);
  
              displayProjects(filteredProjects);
          });
      });
  }
  
  // تحميل المشاريع عند فتح الصفحة
  document.addEventListener('DOMContentLoaded', () => {
      // عرض جميع المشاريع عند تحميل الصفحة
      displayProjects(projects.filter(project => project.category === 'web')); // يمكنك تغيير الفئة الافتراضية هنا
      setupProjectFilters();
  });