document.addEventListener("DOMContentLoaded", () => {
    // ===================== SECTIONS & FLIP MOBILE =====================
    const sections = document.querySelectorAll('.section, .hero-left, .hero-card, .card-flip, .hero-car');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
    }, { threshold: 0.2 });

    sections.forEach(el => observer.observe(el));

    // Ativa flip nos cards no mobile
    function ativarFlipMobile() {
        const flipCards = document.querySelectorAll('.card-flip');
        if (window.innerWidth <= 768) {
            flipCards.forEach(card => {
                card.classList.add('in-view');
                card.style.opacity = '1';
                card.style.transform = 'none';
                card.onclick = () => {
                    const inner = card.querySelector('.card-inner');
                    inner.classList.toggle('flipped');
                };
            });
        } else {
            flipCards.forEach(card => card.onclick = null);
        }
    }

    ativarFlipMobile();
    window.addEventListener('resize', ativarFlipMobile);

    // ===================== HERO CAROUSEL =====================
    const imagens = ["carrolap.png", "pinças.png", "bloco.png", "oleocar.png"];
    let indexHero = 0;
    const imgElement = document.getElementById("slide-image");
    const dotsContainer = document.getElementById("dots");

    if (imgElement && dotsContainer) {
        // Limpa bolinhas antigas
        dotsContainer.innerHTML = "";

        // Cria 4 bolinhas, mesmo que depois mude o número de imagens
        for (let i = 0; i < 4; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dot.onclick = () => {
                indexHero = i;
                trocarImagem();
            };
            dotsContainer.appendChild(dot);
        }

        const dots = document.querySelectorAll(".dot");

        function atualizarDots() {
            dots.forEach((dot, i) => dot.classList.toggle("active", i === indexHero));
        }

        function trocarImagem() {
            imgElement.style.opacity = 0;
            setTimeout(() => {
                imgElement.src = imagens[indexHero];
                imgElement.style.opacity = 1;
                atualizarDots();
            }, 200);
        }

        // ===================== Botões próximo/anterior =====================
        const btnProximo = document.querySelector(".slide-btn.right");
        const btnAnterior = document.querySelector(".slide-btn.left");

        if (btnProximo) {
            btnProximo.addEventListener("click", () => {
                indexHero = (indexHero + 1) % imagens.length;
                trocarImagem();
            });
        }

        if (btnAnterior) {
            btnAnterior.addEventListener("click", () => {
                indexHero = (indexHero - 1 + imagens.length) % imagens.length;
                trocarImagem();
            });
        }

        // Troca automática
        let intervaloHero = setInterval(() => {
            indexHero = (indexHero + 1) % imagens.length;
            trocarImagem();
        }, 4000);

        const sliderHero = document.querySelector(".hero-card");
        if (sliderHero) {
            sliderHero.addEventListener("mouseenter", () => clearInterval(intervaloHero));
            sliderHero.addEventListener("mouseleave", () => {
                intervaloHero = setInterval(() => {
                    indexHero = (indexHero + 1) % imagens.length;
                    trocarImagem();
                }, 4000);
            });
        }

        // Inicializa
        trocarImagem();
    }

    // ===================== SMOOTH SCROLL =====================
    document.querySelectorAll('header nav a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.getElementById(this.getAttribute('href').slice(1));
            const offset = target.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight - 10;
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });
    });
});
