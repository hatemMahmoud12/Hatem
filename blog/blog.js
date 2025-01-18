// بيانات المقالات
const blogPosts = [
    {
        id: 1,
        title: "📢 تغلب على منافسيك الآن! 🏆",
        excerpt: "📢 تغلب على منافسيك الآن! 🏆 🔥 عرض خاص لفترة محدودة",
        fullContent: `📢 تغلب على منافسيك الآن! 🏆
🔥 عرض خاص لفترة محدودة:
💡 تصميم 12 منشور سوشيال ميديا فقط بـ 999 جنيه بدلاً من 1500 جنيه!
✨ اجعل شركتك تظهر بشكل احترافي ولفت الأنظار على السوشيال ميديا!
📌 اتصل بنا الآن لتحصل على عرضك المميز!
🌐 زوروا موقعنا: www.megaa.online
📞 +20 127 315 5983
📱 امسح الكود لمعرفة المزيد!
⚡ العرض لفترة محدودة، لا تفوت الفرصة!
 #تصميم #تصميمي #تصميمات #تصميمي_ #سوشيال_ميديا #سوشيال_ميديا_ماركتينگ #سوشيالميديا
        
        `, 
        image: "1.jpg",
        category: "design",
        date: "15 يناير 2024",
        author: "ميجا"
    },
    {
        id: 2,
        title: "أساسيات تصميم الويب",
        excerpt: "اكتشف الاستراتيجيات الرئيسية لتقنيات تصميم الويب الحديثة",
        fullContent: `محتوى مفصل عن أساسيات تصميم الويب...`, 
        image: "../assets/blog/web-design.jpg",
        category: "design",
        date: "15 يناير 2024",
        author: "أحمد محمد"
    },
    {
        id: 3,
        title: "أساسيات تصميم الويب",
        excerpt: "اكتشف الاستراتيجيات الرئيسية لتقنيات تصميم الويب الحديثة",
        fullContent: `محتوى مفصل عن أساسيات تصميم الويب...`, 
        image: "../assets/blog/web-design.jpg",
        category: "design",
        date: "15 يناير 2024",
        author: "أحمد محمد"
    }
];

// دالة لتقصير النص
function truncateText(text, maxLength = 100) {
    return text.length > maxLength 
        ? text.substring(0, maxLength) + '...' 
        : text;
}

// دالة لفتح المقالة
function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    
    if (post) {
        // تخزين بيانات المقالة في localStorage
        localStorage.setItem('currentPost', JSON.stringify(post));
        
        // الانتقال إلى صفحة المقالة
        window.location.href = 'blog-single.html';
    }
}

// دالة لعرض المقالات
function displayBlogPosts(category = 'all') {
    const blogGrid = document.getElementById('blog-grid');
    blogGrid.innerHTML = ''; // مسح المحتوى الحالي

    // تصفية المقالات
    const filteredPosts = category === 'all' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === category);

    // التعامل مع حالة عدم وجود مقالات
    if (filteredPosts.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-posts">
                <p>لا توجد مقالات في هذا القسم</p>
            </div>
        `;
        return;
    }

    // عرض المقالات
    filteredPosts.forEach(post => {
        const blogCard = document.createElement('div');
        blogCard.classList.add('blog-card', 'hide');
        blogCard.innerHTML = `
            <div class="blog-card-image">
                <img src="${post.image}" alt="${post.title}">
            </div>
            <div class="blog-card-content">
                <div class="blog-card-meta">
                    <span class="blog-date">
                        <i class="ri-calendar-line"></i> ${post.date}
                    </span>
                    <span class="blog-author">
                        <i class="ri-user-line"></i> ${post.author}
                    </span>
                </div>
                <h3 class="blog-card-title">${post.title}</h3>
                <p class="blog-card-excerpt">
                    ${truncateText(post.excerpt)}
                </p>
                <a href="#" class="blog-card-link" onclick="openBlogPost(${post.id})">اقرأ المزيد</a>
            </div>
        `;
        blogGrid.appendChild(blogCard);
    });

    // إضافة تأثير الظهور
    const hiddenElements = document.querySelectorAll('.hide');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    });

    hiddenElements.forEach((el) => observer.observe(el));
}

// دالة لفتح المقالة
function openBlogPost(postId) {
    const post = blogPosts.find(p => p.id === postId);
    
    if (post) {
        // تخزين بيانات المقالة في localStorage
        localStorage.setItem('currentPost', JSON.stringify(post));
        
        // الانتقال إلى صفحة المقالة
        window.location.href = 'blog-single.html';
    }
}

// دالة لتقصير النص
function truncateText(text, maxLength = 100) {
    return text.length > maxLength 
        ? text.substring(0, maxLength) + '...' 
        : text;
}

// مستمع الأحداث لتحميل المقالات
document.addEventListener('DOMContentLoaded', () => {
    displayBlogPosts();
    
    // إعداد أزرار التصنيفات
    const categoryButtons = document.querySelectorAll('.category-btn');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المحدد
            button.classList.add('active');
            
            // عرض المقالات حسب التصنيف
            displayBlogPosts(button.dataset.category);
        });
    });
});

// إنشاء صفحة blog-single.html
function displaySinglePost() {
    const post = JSON.parse(localStorage.getItem('currentPost'));
    
    if (post) {
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-image').src = post.image;
        document.getElementById('post-content').textContent = post.fullContent;
        document.getElementById('post-author').textContent = post.author;
        document.getElementById('post-date').textContent = post.date;
    }
}

// إضافة مستمع الأحداث لصفحة المقالة
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('post-title')) {
        displaySinglePost();
    }
});

// دالة لإعداد أزرار التصنيفات
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // إزالة الفئة النشطة من جميع الأزرار
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // إضافة الفئة النشطة للزر المحدد
            button.classList.add('active');
            
            // عرض المقالات حسب التصنيف
            displayBlogPosts(button.dataset.category);
        });
    });
}

// تحميل المقالات عند فتح الصفحة
document.addEventListener('DOMContentLoaded', () => {
    // عرض جميع المقالات
    displayBlogPosts();
    
    // إعداد أزرار التصنيفات
    setupCategoryButtons();
});

function searchBlogPosts() {
    const searchInput = document.getElementById('blog-search-input');
    const blogGrid = document.getElementById('blog-grid');
    const searchTerm = searchInput.value.toLowerCase().trim();

    // إعادة عرض جميع المقالات أولاً
    displayBlogPosts();

    // تصفية المقالات
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogCards.forEach(card => {
        const title = card.querySelector('.blog-card-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.blog-card-excerpt').textContent.toLowerCase();
        
        if (!title.includes(searchTerm) && !excerpt.includes(searchTerm)) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });

    // عرض رسالة إذا لم تكن هناك نتائج
    const visibleCards = document.querySelectorAll('.blog-card[style="display: block;"]');
    if (visibleCards.length === 0) {
        blogGrid.innerHTML = `
            <div class="no-results">
                <p>لا توجد نتائج مطابقة للبحث</p>
            </div>
        `;
    }
}

// إضافة مستمع الأحداث للبحث
document.addEventListener('DOMContentLoaded', () => { 
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) {
        searchInput.addEventListener('input', searchBlogPosts);
    }
});


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