gsap.registerPlugin(ScrollTrigger);

// 1. Die Texte für die Glasplatte (Muss global oben stehen)
const modalTexts = {
    impressum: `
        <h2 style="font-family: 'Montserrat', sans-serif; font-weight: 600; margin-bottom: 1.2rem; color: #f7921e; text-transform: uppercase;">Impressum</h2>
        <div style="text-align: left; color: #222; line-height: 1.5;">
            <p style="margin-bottom: 10px;"><strong>Inhaber:</strong><br>Joachim Bzodek</p>
            <p style="margin-bottom: 10px;"><strong>Anschrift:</strong><br>Severinhauser Str. 72a<br>58256 Ennepetal</p>
            <p style="margin-bottom: 10px;"><strong>Kontakt:</strong><br>E-Mail: jo.dienstleistungen@gmail.com</p>
            <p style="margin-bottom: 10px;"><strong>Steuernummer:</strong><br>341/5023/2729</p>
            <p style="margin-bottom: 10px;"><strong>USt-IdNr.:</strong><br>DE349704820</p>
            <p style="margin-top: 20px; font-size: 0.75rem; color: #444; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 10px;">
                Plattform der EU-Kommission zur Online-Streitbeilegung: 
                <a href="https://ec.europa.eu/consumers/odr" target="_blank" style="color: #f7921e; text-decoration: underline;">https://ec.europa.eu/consumers/odr</a>
            </p>
        </div>
    `,
    datenschutz: `
        <h2 style="font-family: 'Montserrat', sans-serif; font-weight: 600; margin-bottom: 1.2rem; color: #f7921e; text-transform: uppercase;">Datenschutz</h2>
        <div style="text-align: left; color: #222; line-height: 1.5;">
            <p><strong>Datenerhebung:</strong> Wir erheben auf dieser Webseite keine aktiven Tracking-Daten. Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben ausschließlich zur Bearbeitung der Anfrage gespeichert.</p>
            <p style="margin-top: 10px;"><strong>Ihre Rechte:</strong> Sie haben jederzeit das Recht auf Auskunft, Korrektur oder Löschung Ihrer Daten.</p>
            <br>
            <p><strong>Bilder:</strong> Bilder sind Eigentum von Joachim Bzodek</p>
            </div>
    `,
    agb: `
        <h2 style="font-family: 'Montserrat', sans-serif; font-weight: 600; margin-bottom: 1.2rem; color: #f7921e; text-transform: uppercase;">AGB</h2>
        <div style="text-align: left; color: #222; line-height: 1.5;">
            <p>Unsere Allgemeinen Geschäftsbedingungen werden Ihnen bei Auftragserteilung in Schriftform ausgehändigt oder auf Wunsch per E-Mail zugesandt.</p>
        </div>
    `
};

// 2. GSAP Animation Setup
const setupAnimation = () => {
  // Animation nur auf Desktop/großen Screens (verhindert Probleme auf Mobile)
  if (window.innerWidth < 1025) {
      gsap.set(".maincontent", { yPercent: 0 });
      return; 
  }

  const scrollEnd = "max"; 
  ScrollTrigger.getAll().forEach(t => t.kill());

  const commonST = {
    trigger: "body",
    start: "top top",
    end: scrollEnd,
    scrub: 1,
    invalidateOnRefresh: true
  };

  gsap.to(".armwiperimg", {
    yPercent: 100, // Erhöht, damit er am Ende verschwindet
    ease: "none",
    scrollTrigger: commonST
  });

  gsap.fromTo(".soaplinesimg", 
    { clipPath: "inset(0% 0% 100% 0%)" }, 
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: commonST
    }
  );

  // 3. Content fährt so weit hoch, dass der Footer sichtbar wird
gsap.fromTo(".maincontent", 
  { yPercent: 100 }, 
  {
    yPercent: -35, // Höherer Wert zieht den Footer weiter nach oben
    ease: "none",
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "max",
      scrub: 0.5,
      immediateRender: true
    }
  }
);
};

// 3. Modal Funktionen
function openModal(key) {
    console.log("Versuche Modal zu öffnen für:", key);
    const modal = document.getElementById('info-modal');
    const content = document.getElementById('modal-text-content');
    
    if (modal && content && modalTexts[key]) {
        content.innerHTML = modalTexts[key];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    } else {
        console.error("Fehler: Modal-Elemente oder Text für '" + key + "' nicht gefunden!");
    }
}

function closeModal() {
    const modal = document.getElementById('info-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Schließen mit Escape-Taste
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});

// Event Listener
window.addEventListener("load", setupAnimation);
window.addEventListener("resize", setupAnimation);

let currentSlide = 0;

function moveSlide(direction) {
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-img');
    const totalSlides = slides.length;

    currentSlide += direction;

    // Loop-Logik: Wenn am Ende angekommen, wieder von vorne
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }

    const offset = -currentSlide * 100;
    wrapper.style.transform = `translateX(${offset}%)`;
}

// Optional: Automatischer Wechsel alle 5 Sekunden
setInterval(() => moveSlide(1), 5000);