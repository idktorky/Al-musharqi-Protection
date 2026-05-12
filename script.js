// parallax effect on hero image
document.addEventListener('mousemove', (e) => {
    const img = document.querySelector('.main-person');
    const moveX = (e.clientX - window.innerWidth / 2) / 40;
    const moveY = (e.clientY - window.innerHeight / 2) / 40;
    
    img.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
});

// smoth scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const statsSection = document.querySelector('.stats');
const nums = document.querySelectorAll('.num');
let started = false;

window.onscroll = function () {
    if (window.scrollY >= statsSection.offsetTop - 500) {
        if (!started) {
            nums.forEach((num) => startCount(num));
        }
        started = true;
    }
};

function startCount(el) {
    let target = el.parentElement.parentElement.dataset.target;
    let count = setInterval(() => {
        el.textContent++;
        if (el.textContent == target) {
            clearInterval(count);
        }
    }, 2500 / target); 
}

const form = document.querySelector('form');

form.onsubmit = async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    btn.innerText = 'جاري الإرسال...';
    btn.disabled = true;

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('تم استلام طلبك بنجاح! سنتواصل معك قريباً.');
            form.reset();
        } else {
            alert('حدث خطأ، يرجى المحاولة مرة أخرى.');
        }
    } catch (error) {
        alert('تأكد من اتصالك بالإنترنت.');
    } finally {
        btn.innerText = 'إرسال الطلب الآن';
        btn.disabled = false;
    }
};

//const lenis = new Lenis()

//function raf(time) {
//  lenis.raf(time)
//  requestAnimationFrame(raf)
//}

// requestAnimationFrame(raf)

document.querySelectorAll('.glass-card').forEach((el) => observer.observe(el));