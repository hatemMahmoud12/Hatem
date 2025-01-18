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
                    <a href="../service_request/service_request.html" class="project__link">طلب خدمة</a>
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
            const filteredProjects = filter === 'all' 
                ? projects 
                : projects.filter(project => project.category === filter);

            displayProjects(filteredProjects);
        });
    });
}

// تحميل المشاريع عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // عرض جميع المشاريع عند تحميل الصفحة
    displayProjects(projects);
    setupProjectFilters();
});

// تغيير خلفية التنقل

const body = document.querySelector("body"),
      nav = document.querySelector("nav"),
      links = document.querySelectorAll("nav a"),
      icons = document.querySelectorAll("nav i"),
      logo = document.querySelector(".logo"),
    sidebarOpen = document.querySelector(".sidebarOpen"),
    siderbarClose = document.querySelector(".siderbarClose");

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
            link.style.color = "white";
        });
        icons.forEach(icon => {
            icon.style.color = "white";
        });
        logo.style = "filter: brightness(0) invert(1);";
    }
};

window.addEventListener("scroll", changeNavBackground);