gsap.registerPlugin(ScrollTrigger);

const setupAnimation = () => {
  const scrollEnd = "max"; // Wir nutzen den gesamten Scrollweg
  
  // Wichtig: Vorherige Trigger löschen
  ScrollTrigger.getAll().forEach(t => t.kill());

  const commonST = {
    trigger: "body",
    start: "top top",
    end: scrollEnd, // Hier stand bei dir vorher scrollPath -> jetzt scrollEnd!
    scrub: 1,
    invalidateOnRefresh: true
  };

  // 1. Wischer-Arm bewegen
  gsap.to(".armwiperimg", {
    yPercent: 88,
    ease: "none",
    scrollTrigger: commonST
  });

  // 2. Seifenlinien (Wischspur)
  // Wir setzen sie im CSS auf unsichtbar und "zeichnen" sie hier auf 0% (voll sichtbar)
  gsap.fromTo(".soaplinesimg", 
    { clipPath: "inset(0% 0% 100% 0%)" }, 
    {
      clipPath: "inset(0% 0% 0% 0%)",
      ease: "none",
      scrollTrigger: commonST
    }
  );

  // 3. Content fährt hoch
gsap.fromTo(".maincontent", 
  { 
    yPercent: 100 
  }, 
  {
    yPercent: 0, 
    ease: "none", // WICHTIG: "none" verhindert das Nachschwingen am Ende
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "max",
      scrub: 0.5, // Kleinerer Wert (0.5 statt 1) reagiert direkter auf das Mausrad
      immediateRender: true
    }
  }
  );
};

// Startet erst, wenn alles geladen ist
window.addEventListener("load", setupAnimation);
window.addEventListener("resize", setupAnimation);