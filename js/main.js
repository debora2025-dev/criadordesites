document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "5500000000000"; // TODO: substituir pelo número real (código do país + DDD + número)

  /* Header com fundo ao rolar */
  const header = document.getElementById("header");
  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll);

  /* Menu mobile */
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("open");
  });
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });

  /* Lightbox da galeria */
  const galleryItems = Array.from(document.querySelectorAll(".gallery__item"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  let currentIndex = 0;

  const openLightbox = (index) => {
    currentIndex = index;
    lightboxImg.src = galleryItems[currentIndex].dataset.full;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };
  const showRelative = (delta) => {
    currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].dataset.full;
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => openLightbox(index));
  });
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", () => showRelative(-1));
  document.getElementById("lightbox-next").addEventListener("click", () => showRelative(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showRelative(1);
    if (e.key === "ArrowLeft") showRelative(-1);
  });

  /* Formulário de contato -> envia como mensagem pronta pelo WhatsApp */
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const phone = form.phone.value.trim();
    const email = form.email.value.trim();
    const interest = form.interest.value;
    const message = form.message.value.trim();

    const text = [
      `Olá! Meu nome é ${name}.`,
      `Telefone: ${phone}`,
      `E-mail: ${email}`,
      `Interesse: ${interest}`,
      message ? `Mensagem: ${message}` : null,
    ].filter(Boolean).join("\n");

    success.classList.add("visible");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
    form.reset();
    setTimeout(() => success.classList.remove("visible"), 6000);
  });

  /* Ano no rodapé */
  document.getElementById("year").textContent = new Date().getFullYear();
});
