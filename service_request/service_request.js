document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('service-request-form');
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const prevBtn = document.querySelector('.btn-prev');
    const nextBtn = document.querySelector('.btn-next');
    const submitBtn = document.querySelector('.btn-submit');
    const serviceCards = document.querySelectorAll('.service-card');
    const budgetRange = document.querySelector('.budget-range input');
    const budgetValue = document.querySelector('.budget-value');

    let currentStep = 1;
    let selectedService = null;

    // التحقق من صحة الخطوة
    function validateStep() {
        switch (currentStep) {
            case 1:
                return selectedService !== null;
            case 2:
                const projectType = document.querySelector('#project-type').value;
                const projectDescription = document.querySelector('textarea').value;
                return projectType && projectDescription.trim() !== '';
            case 3:
                return budgetRange.value > 0;
            case 4:
                const name = document.querySelector('input[type="text"]').value;
                const email = document.querySelector('input[type="email"]').value;
                const phone = document.querySelector('input[type="tel"]').value;
                return name && email && phone;
            default:
                return true;
        }
    }

    // تحديث عرض الأزرار
    function updateButtons() {
        prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';

        if (currentStep === formSteps.length) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    }

    // تحديد بطاقة الخدمة
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            serviceCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedService = card.dataset.service;
        });
    });

    // التحكم في نطاق الميزانية
    budgetRange.addEventListener('input', () => {
        budgetValue.textContent = `${budgetRange.value.toLocaleString()} جنيه`;
    });

    // تحديث الخطوات
    function updateSteps() {
        steps.forEach(step => step.classList.remove('active'));
        formSteps.forEach(step => step.classList.remove('active'));

        steps[currentStep - 1].classList.add('active');
        formSteps[currentStep - 1].classList.add('active');

        updateButtons();
    }

    // زر التالي
    nextBtn.addEventListener('click', () => {
        if (validateStep()) {
            if (currentStep < formSteps.length) {
                currentStep++;
                updateSteps();
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى إكمال جميع الحقول المطلوبة',
                confirmButtonText: 'حسنًا'
            });
        }
    });

    // زر السابق
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateSteps();
        }
    });

    // إرسال النموذج عبر Formspree
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateStep()) {
            // جمع البيانات من النموذج
            const formData = new FormData(form);
            const data = {
                service: document.querySelector('.service-card.selected h4')?.textContent || 'غير محدد',
                projectType: formData.get('project-type'),
                projectGoal: formData.get('project-goal'),
                timeline: formData.get('timeline'),
                projectDescription: formData.get('project-description'),
                budget: formData.get('budget'),
                referralSource: formData.get('referral-source'),
                experience: formData.get('experience'),
                primaryServiceNeed: formData.get('primary-service-need'),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone')
            };

            // رابط Formspree API (استبدل YOUR_FORMSPREE_ID بالمعرف الخاص بك)
            const formspreeUrl = 'https://formspree.io/f/mwppjrkz';

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
                        text: 'شكرًا لك على طلبك، سنقوم بالرد عليك قريبًا!',
                        confirmButtonText: 'حسنًا'
                    });
                    form.reset();
                } else {
                    throw new Error(result.error || 'حدث خطأ أثناء إرسال الطلب.');
                }
            } catch (error) {
                console.error('خطأ في إرسال الطلب:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.',
                    confirmButtonText: 'حسنًا'
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'خطأ',
                text: 'يرجى إكمال جميع الحقول المطلوبة',
                confirmButtonText: 'حسنًا'
            });
        }
    });
});