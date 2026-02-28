'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion';
import {
  Phone,
  MessageCircle,
  MapPin,
  Wifi,
  Droplet,
  Wind,
  Star,
  X,
  ChevronDown,
  Car,
  Leaf,
  Clock,
  Thermometer,
  Waves,
} from 'lucide-react';

// Foto scaricate da Booking.com (foto ufficiali della struttura)
const IMMAGINI = {
  heroMain: '/images/piscina2.jpg',         // Piscina a sfioro principale
  chiSiamo: '/images/esterno1.jpg',          // Vista esterna struttura
  appartamentoLoft: '/images/camera2.jpg',  // Camera appartamento Loft
  appartamentoAttico: '/images/letto1.jpg', // Camera appartamento Attico
  gallery: [
    '/images/piscina2.jpg',   // Piscina – immagine grande
    '/images/esterno1.jpg',   // Facciata esterna
    '/images/panorama1.jpg',  // Panorama vallata
    '/images/camera2.jpg',    // Soggiorno / zona living
    '/images/cucina1.jpg',    // Cucina attrezzata
    '/images/amenity1.jpg',   // Amenities / zona wellness
    '/images/letto1.jpg',     // Camera da letto
    '/images/natura.jpg',     // Natura e uliveto
  ],
};

// Preset animazione fade-up riutilizzabile
const fadeUp = {
  initial: { opacity: 0, y: 48 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
};

// Contatore animato
function Counter({ to, suffix = '', prefix = '', decimal = false }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const stepTime = 2000 / steps;
    const increment = to / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(decimal ? Math.round(current * 10) / 10 : Math.floor(current));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, to, decimal]);

  return (
    <span ref={ref}>
      {prefix}
      {decimal ? count.toFixed(1) : count}
      {suffix}
    </span>
  );
}

// Schermata di caricamento iniziale
function Loader({ onDone }) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#8B4513] flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
    >
      <motion.div
        className="text-center text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        onAnimationComplete={() => setTimeout(onDone, 1400)}
      >
        <div
          className="text-4xl md:text-5xl font-bold mb-2 tracking-wide leading-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="block md:inline">PODERE SCOGLIO</span>{' '}
          <span className="block md:inline">D&apos;ORO</span>
        </div>
        <div className="text-xs tracking-[0.5em] text-white/60 uppercase mb-8">
          Agriturismo · Toscana
        </div>
        <motion.div
          className="h-px bg-white/30 mx-auto"
          initial={{ width: 0 }}
          animate={{ width: 180 }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [activeApartment, setActiveApartment] = useState(0);
  const [activePhoto, setActivePhoto] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);

  const { scrollY, scrollYProgress } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, 220]);
  const heroOpacity = useTransform(scrollY, [0, 450], [1, 0]);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Auto-advance reviews
  useEffect(() => {
    const t = setInterval(() => setReviewIdx((i) => (i + 1) % reviews.length), 5000);
    return () => clearInterval(t);
  }, []);

  const apartments = [
    {
      name: 'APPARTAMENTO LOFT',
      capacity: '4 Ospiti',
      size: '51 mq',
      bed: 'Letto matrimoniale',
      description:
        'Appartamento su due livelli con vista spettacolare sulla valle sottostante. La zona notte è separata dalla zona living tramite una scala interna che dà accesso al piano superiore.',
      features: [
        'Cucina di ultima generazione',
        'Camino',
        'TV schermo piatto',
        'Lavastoviglie',
        'Wi-Fi gratuito illimitato',
        'Bagno privato con doccia',
        'Ingresso indipendente',
        'Terrazzo panoramico privato',
        'Barbecue a disposizione',
        'Aria condizionata',
        'Parcheggio privato',
        'Macchina del caffè',
      ],
      images: [
        '/images/camera5.jpg',
        '/images/cucina1.jpg',
        '/images/letto4.jpg',
        '/images/camera2.jpg',
        '/images/amenity7.jpg',
      ],
    },
    {
      name: 'APPARTAMENTO ATTICO',
      capacity: '4 Ospiti',
      size: '49 mq',
      bed: 'Letto King Size',
      description:
        'Su unico piano, con salotto dotato di divano/letto e finestra panoramica sulla vallata. Zona living con cucina a vista di ultima generazione, zona notte con bagno privato e terrazzino.',
      features: [
        'Salotto con divano/letto',
        'Finestra panoramica',
        'Cucina di ultima generazione',
        'Terrazzino privato',
        'Zona notte con bagno privato',
        'Doccia',
        'TV schermo piatto',
        'Lavastoviglie',
        'Wi-Fi gratuito illimitato',
        'Ingresso indipendente',
        'Terrazza per pasteggiare',
        'Macchina del caffè',
      ],
      images: [
        '/images/camera1.jpg',
        '/images/cucina2.jpg',
        '/images/letto1.jpg',
        '/images/camera3.jpg',
        '/images/camera6.jpg',
      ],
    },
    {
      name: 'CAMERA MATRIMONIALE',
      capacity: '2 Ospiti',
      size: '20 mq',
      bed: 'Letto King Size',
      description:
        'Camera matrimoniale con letto King Size, progettata anche per l\'accessibilità con bagno attrezzato per persone a mobilità ridotta. Finestre insonorizzate e vista sul podere.',
      features: [
        'Letto King Size',
        'Bagno privato con doccia',
        'Accessibile per disabili',
        'TV schermo piatto',
        'Wi-Fi gratuito illimitato',
        'Aria condizionata',
        'Riscaldamento',
        'Finestre insonorizzate',
        'Prodotti da bagno inclusi',
        'Accesso alla sauna',
        'Parcheggio privato',
        'Pulizie giornaliere',
      ],
      images: [
        '/images/letto2.jpg',
        '/images/letto3.jpg',
        '/images/camera4.jpg',
        '/images/amenity6.jpg',
        '/images/camera6.jpg',
      ],
    },
  ];

  const amenities = [
    {
      icon: Waves,
      title: 'Piscina a Sfioro',
      description:
        'Piscina con trattamento ai sali di magnesio e vista mozzafiato sulla vallata pesciatina. Aperta in stagione estiva.',
    },
    {
      icon: Thermometer,
      title: 'Sauna Finlandese',
      description:
        'Centro benessere esclusivo con sauna finlandese e vasca idromassaggio per rigenerare corpo e mente.',
    },
    {
      icon: Wifi,
      title: 'Wi-Fi Illimitato',
      description:
        'Connessione internet ad alta velocità disponibile gratuitamente in tutti gli spazi della struttura.',
    },
    {
      icon: Leaf,
      title: 'Sostenibilità',
      description:
        "Riscaldamento prodotto da centrale termica a biomassa. Un podere rispettoso dell'ambiente.",
    },
    {
      icon: Car,
      title: 'Parcheggio Privato',
      description:
        'Ampio parcheggio privato gratuito in loco. Accessibile anche per persone con mobilità ridotta.',
    },
    {
      icon: Wind,
      title: 'Aria Condizionata',
      description:
        'Tutti gli appartamenti sono dotati di aria condizionata per il massimo comfort in ogni stagione.',
    },
  ];

  const reviews = [
    {
      text: 'Esperienza molto positiva. Appartamento conforme alla descrizione, molto pulito, Wi-Fi efficiente, angolo cottura ben attrezzato. La piscina è molto bella. Il proprietario è stato molto cordiale. Decisamente raccomandato.',
      author: 'Marco T.',
      stars: 5,
      via: 'Booking.com',
    },
    {
      text: 'Ottimo rapporto qualità/prezzo. La camera era molto bella e arredata con stile moderno. La posizione era strategica, permettendoci di raggiungere facilmente le principali attrazioni della Toscana.',
      author: 'Chiara M.',
      stars: 5,
      via: 'Booking.com',
    },
    {
      text: 'I gestori sono stati gentilissimi e sono andati oltre le aspettative. È il posto ideale per rilassarsi senza essere disturbati da nessuno. Il panorama dalla terrazza è indimenticabile.',
      author: 'Luca B.',
      stars: 5,
      via: 'Booking.com',
    },
    {
      text: 'Una struttura meravigliosa immersa nella natura toscana. La piscina a sfioro con vista sulla vallata è semplicemente spettacolare. Torneremo sicuramente!',
      author: 'Sophie R.',
      stars: 5,
      via: 'TripAdvisor',
    },
  ];

  const dintorni = [
    { city: 'Pescia', km: 3, note: 'Centro città' },
    { city: 'Montecatini Terme', km: 12, note: 'Terme e benessere' },
    { city: 'Pistoia', km: 25, note: 'Arte medievale' },
    { city: 'Lucca', km: 30, note: 'Mura storiche' },
    { city: 'Pisa', km: 50, note: 'Torre Pendente' },
    { city: 'Firenze', km: 60, note: 'Capitale del Rinascimento' },
    { city: 'Siena', km: 90, note: 'Palio e Duomo' },
  ];

  const contacts = [
    { name: 'Matteo', phone: '+39 333 1846822', type: 'WhatsApp' },
    { name: 'Carlo', phone: '+39 338 8953305', type: 'WhatsApp' },
  ];

  return (
    <>
      {/* Loader */}
      <AnimatePresence>{!loaded && <Loader onDone={() => setLoaded(true)} />}</AnimatePresence>

      {/* Barra progresso scroll */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#D4A574] z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Lightbox galleria */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className="fixed inset-0 z-[90] bg-black/92 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <button
              className="absolute top-5 right-5 text-white/70 hover:text-white transition"
              onClick={() => setLightboxImg(null)}
            >
              <X className="w-9 h-9" />
            </button>
            <motion.img
              src={lightboxImg}
              alt="Galleria"
              className="max-h-[88vh] max-w-[88vw] object-contain rounded-xl shadow-2xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-screen bg-white">
        {/* ── NAVIGAZIONE ── */}
        <motion.nav
          className={`fixed top-[3px] left-0 right-0 z-50 transition-all duration-500 ${
            navScrolled ? 'bg-white/97 shadow-sm backdrop-blur-sm' : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-6 flex items-center justify-between h-20">
            <span
              className={`text-2xl font-bold tracking-wide transition-colors duration-500 ${
                navScrolled ? 'text-[#8B4513]' : 'text-white'
              }`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              PODERE SCOGLIO D&apos;ORO
            </span>
            <div
              className={`hidden md:flex gap-8 text-sm font-medium transition-colors duration-500 ${
                navScrolled ? 'text-gray-700' : 'text-white/90'
              }`}
            >
              {['Alloggi', 'Struttura', 'Galleria', 'Dintorni', 'Contatti'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="hover:text-[#D4A574] transition-colors duration-300"
                >
                  {label}
                </a>
              ))}
            </div>
            <a
              href="#contatti"
              className={`hidden md:block px-5 py-2 rounded-full text-sm font-semibold border transition-all duration-500 ${
                navScrolled
                  ? 'bg-[#8B4513] text-white border-[#8B4513] hover:bg-[#A0522D]'
                  : 'bg-white/10 text-white border-white/40 hover:bg-white/20 backdrop-blur-sm'
              }`}
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Prenota
            </a>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <section className="h-screen flex items-center justify-center relative overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{ backgroundImage: `url(${IMMAGINI.heroMain})`, y: heroY }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/65" />

          <motion.div
            className="relative z-10 text-center text-white px-4 max-w-4xl"
            style={{ opacity: heroOpacity }}
          >
            <motion.p
              className="text-xs tracking-[0.5em] mb-6 text-white/65 uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 20 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Agriturismo · Pescia · Toscana
            </motion.p>
            <motion.h1
              className="text-6xl md:text-8xl mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 40 }}
              transition={{ delay: 0.5, duration: 0.9 }}
            >
              Scegli il Relax
            </motion.h1>
            <motion.p
              className="text-lg md:text-2xl mb-10 font-light text-white/80 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Vivi la tua vacanza in armonia con la natura nel cuore della Toscana
            </motion.p>
            <motion.div
              className="flex gap-4 justify-center flex-wrap"
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <motion.a
                href="#contatti"
                className="px-9 py-4 bg-[#8B4513] text-white rounded-lg font-semibold tracking-wide hover:bg-[#A0522D] transition-colors duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Contattaci Ora
              </motion.a>
              <motion.a
                href="#galleria"
                className="px-9 py-4 bg-white/10 text-white rounded-lg font-semibold tracking-wide border border-white/40 hover:bg-white/20 backdrop-blur-sm transition-colors duration-300"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                Scopri la Struttura
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Freccia scroll */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ delay: 1.3, duration: 1 }}
          >
            <div className="animate-bounce">
              <ChevronDown className="w-7 h-7" />
            </div>
          </motion.div>
        </section>

        {/* ── STATS ── */}
        <section className="py-16 bg-[#8B4513]">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white text-center">
              {[
                { to: 8.9, suffix: '★', label: 'Rating Booking.com', decimal: true },
                { to: 2, suffix: '', label: 'Appartamenti Esclusivi' },
                { to: 45, suffix: ' mq', label: 'Superficie Media' },
                { to: 15, suffix: '+', label: 'Anni di Ospitalità' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.12 }}
                >
                  <div
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <Counter to={s.to} suffix={s.suffix} decimal={s.decimal ?? false} />
                  </div>
                  <div className="text-sm text-white/65 tracking-wide uppercase">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── CHI SIAMO ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeUp}>
                <p
                  className="text-xs tracking-[0.4em] text-[#D4A574] uppercase mb-4"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  La nostra storia
                </p>
                <h2
                  className="text-5xl mb-8 text-[#8B4513] leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Chi Siamo
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-5">
                  Il nome &ldquo;Scoglio d&apos;oro&rdquo; fu dato dai paesani di alcune generazioni
                  passate all&apos;antica casa colonica, costruita interamente in pietra a vivo,
                  poiché richiamava l&apos;immagine di uno scoglio dorato che si erge da un
                  &ldquo;mare verde&rdquo; di natura circostante.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-5">
                  L&apos;Agriturismo è ricavato da una casa colonica dei primi del &apos;900,
                  recentemente ampliata in chiave moderna garantendo l&apos;equilibrio fra ciò che è
                  e ciò che è stato. Immerso in un podere di ulivi e alberi da frutto, con panorami
                  mozzafiato dalla vallata pesciatina.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Situato su uno dei colli che abbracciano la vallata, a soli 3 km da Pescia e a
                  meno di un&apos;ora dalle principali città toscane: Firenze, Lucca, Siena e Pisa.
                </p>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: 0.2 }}
                className="relative"
              >
                <motion.img
                  src={IMMAGINI.chiSiamo}
                  alt="Struttura"
                  className="w-full h-[480px] object-cover rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute -bottom-6 -left-6 bg-[#8B4513] text-white p-5 rounded-xl shadow-xl">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <Counter to={15} suffix="+" />
                  </div>
                  <div className="text-sm text-white/75">anni di ospitalità</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── STRUTTURA ── */}
        <section id="struttura" className="py-24 bg-[#F5E6D3]/25">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p
                className="text-xs tracking-[0.4em] text-[#D4A574] uppercase mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Servizi e comfort
              </p>
              <h2
                className="text-5xl text-[#8B4513]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                La Struttura
              </h2>
            </motion.div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {amenities.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={i}
                    {...fadeUp}
                    transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 group"
                    whileHover={{ y: -4 }}
                  >
                    <div className="w-14 h-14 rounded-xl bg-[#F5E6D3] flex items-center justify-center mb-5 group-hover:bg-[#8B4513] transition-colors duration-300">
                      <Icon className="w-7 h-7 text-[#8B4513] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3
                      className="text-xl mb-3 text-[#8B4513]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {a.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{a.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── GALLERIA ── */}
        <section id="galleria" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p
                className="text-xs tracking-[0.4em] text-[#D4A574] uppercase mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Immagini
              </p>
              <h2
                className="text-5xl text-[#8B4513]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Galleria
              </h2>
            </motion.div>
            {/* Griglia masonry: prima foto grande, le altre in griglia 3 colonne */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {/* Foto grande in evidenza */}
              <motion.div
                {...fadeUp}
                className="col-span-2 row-span-2 overflow-hidden rounded-2xl cursor-pointer"
                onClick={() => setLightboxImg(IMMAGINI.gallery[0])}
                whileHover={{ scale: 1.01 }}
              >
                <img
                  src={IMMAGINI.gallery[0]}
                  alt="Piscina a sfioro"
                  className="w-full h-64 md:h-full md:min-h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              {/* Restanti 7 foto in griglia 2 colonne */}
              {IMMAGINI.gallery.slice(1).map((src, i) => (
                <motion.div
                  key={i + 1}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i + 1) * 0.08 }}
                  className="overflow-hidden rounded-xl cursor-pointer"
                  onClick={() => setLightboxImg(src)}
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={src}
                    alt={`Galleria ${i + 2}`}
                    className="w-full h-44 md:h-[218px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── ALLOGGI ── */}
        <section id="alloggi" className="py-24 bg-[#F5E6D3]/20">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p
                className="text-xs tracking-[0.4em] text-[#D4A574] uppercase mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Dove soggiornare
              </p>
              <h2
                className="text-5xl text-[#8B4513]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Alloggi
              </h2>
            </motion.div>

            {/* Tabs */}
            <div className="flex gap-4 justify-center mb-14">
              {apartments.map((apt, i) => (
                <motion.button
                  key={i}
                  onClick={() => { setActiveApartment(i); setActivePhoto(0); }}
                  className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeApartment === i
                      ? 'bg-[#8B4513] text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-[#8B4513] hover:text-[#8B4513]'
                  }`}
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                  whileTap={{ scale: 0.97 }}
                >
                  {apt.name}
                </motion.button>
              ))}
            </div>

            {/* Contenuto */}
            <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeApartment}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="grid md:grid-cols-2 gap-14 items-center"
              >
                <div className="flex flex-col gap-3">
                  {/* Foto principale */}
                  <div
                    className="relative overflow-hidden rounded-2xl shadow-xl cursor-zoom-in"
                    onClick={() =>
                      setLightboxImg(apartments[activeApartment].images[activePhoto])
                    }
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`${activeApartment}-${activePhoto}`}
                        src={apartments[activeApartment].images[activePhoto]}
                        alt={apartments[activeApartment].name}
                        className="w-full h-[360px] object-cover"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>
                    {/* Badge info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/65 to-transparent p-5">
                      <div className="flex gap-4 text-white flex-wrap">
                        <div>
                          <div className="text-xs text-white/70 mb-0.5">Capacità</div>
                          <div className="font-semibold text-sm">
                            {apartments[activeApartment].capacity}
                          </div>
                        </div>
                        <div className="w-px bg-white/30" />
                        <div>
                          <div className="text-xs text-white/70 mb-0.5">Superficie</div>
                          <div className="font-semibold text-sm">
                            {apartments[activeApartment].size}
                          </div>
                        </div>
                        <div className="w-px bg-white/30" />
                        <div>
                          <div className="text-xs text-white/70 mb-0.5">Letto</div>
                          <div className="font-semibold text-sm">
                            {apartments[activeApartment].bed}
                          </div>
                        </div>
                        <div className="w-px bg-white/30" />
                        <div>
                          <div className="text-xs text-white/70 mb-0.5">Check-in</div>
                          <div className="font-semibold text-sm">14:30</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Miniature */}
                  <div className="flex gap-2">
                    {apartments[activeApartment].images.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setActivePhoto(i)}
                        className={`flex-1 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                          activePhoto === i
                            ? 'border-[#8B4513] shadow-md'
                            : 'border-transparent opacity-60 hover:opacity-90'
                        }`}
                      >
                        <img
                          src={src}
                          alt={`Foto ${i + 1}`}
                          className="w-full h-16 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3
                    className="text-4xl mb-4 text-[#8B4513]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {apartments[activeApartment].name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-8">
                    {apartments[activeApartment].description}
                  </p>
                  <h4 className="text-sm font-semibold text-[#8B4513] uppercase tracking-wider mb-5">
                    Servizi Inclusi
                  </h4>
                  <ul className="grid grid-cols-2 gap-3 mb-8">
                    {apartments[activeApartment].features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                        <span className="text-[#D4A574] font-bold mt-0.5">✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.a
                    href="#contatti"
                    className="inline-block px-8 py-4 bg-[#8B4513] text-white rounded-lg font-semibold hover:bg-[#A0522D] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Richiedi Disponibilità
                  </motion.a>
                </div>
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── DINTORNI ── */}
        <section id="dintorni" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p
                className="text-xs tracking-[0.4em] text-[#D4A574] uppercase mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Posizione strategica
              </p>
              <h2
                className="text-5xl text-[#8B4513] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Dintorni
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Nel cuore delle strade del Vino e dell&apos;Olio d&apos;Oliva della Toscana, con
                accesso facile alle maggiori città d&apos;arte.
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {dintorni.map((d, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="bg-[#F5E6D3]/30 rounded-xl p-5 border border-[#D4A574]/20 hover:border-[#8B4513]/30 hover:bg-[#F5E6D3]/50 transition-all duration-300"
                  whileHover={{ y: -3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Car className="w-4 h-4 text-[#D4A574]" />
                    <span
                      className="text-2xl font-bold text-[#8B4513]"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {d.km} km
                    </span>
                  </div>
                  <div className="font-semibold text-gray-800">{d.city}</div>
                  <div className="text-xs text-gray-500 mt-1">{d.note}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── RECENSIONI ── */}
        <section className="py-24 bg-[#8B4513] overflow-hidden">
          <div className="container mx-auto px-6">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p
                className="text-xs tracking-[0.4em] text-[#D4A574] uppercase mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Cosa dicono gli ospiti
              </p>
              <h2
                className="text-5xl text-white"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Recensioni
              </h2>
              <div className="flex items-center justify-center gap-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#D4A574] fill-[#D4A574]" />
                ))}
                <span className="text-white/70 ml-2 text-sm">8.9 su Booking.com</span>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIdx}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center"
              >
                <div className="text-6xl text-[#D4A574]/40 mb-4 leading-none">&ldquo;</div>
                <p className="text-white/85 text-xl leading-relaxed mb-8 italic">
                  {reviews[reviewIdx].text}
                </p>
                <div className="flex flex-col items-center gap-1">
                  <div className="flex gap-1">
                    {[...Array(reviews[reviewIdx].stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#D4A574] fill-[#D4A574]" />
                    ))}
                  </div>
                  <div className="text-white font-semibold">{reviews[reviewIdx].author}</div>
                  <div className="text-white/50 text-sm">{reviews[reviewIdx].via}</div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex gap-2 justify-center mt-10">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    reviewIdx === i ? 'bg-[#D4A574] w-6' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* ── CONTATTI ── */}
        <section id="contatti" className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-5xl">
            <motion.div {...fadeUp} className="text-center mb-16">
              <p
                className="text-xs tracking-[0.4em] text-[#D4A574] uppercase mb-4"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Siamo qui per te
              </p>
              <h2
                className="text-5xl text-[#8B4513] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contattaci
              </h2>
              <p className="text-gray-600">
                Scrivici o chiamaci per prenotare la tua vacanza perfetta in Toscana.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Info */}
              <motion.div {...fadeUp}>
                <div className="bg-[#F5E6D3]/30 rounded-2xl p-8 border border-[#D4A574]/20 h-full">
                  <h3
                    className="text-2xl mb-6 text-[#8B4513]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Dove Siamo
                  </h3>
                  <div className="flex gap-3 items-start mb-6">
                    <MapPin className="w-5 h-5 text-[#8B4513] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Via Santa Margherita, 23</p>
                      <p className="text-gray-600">Pescia (PT) 51017, Toscana</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start mb-6">
                    <Clock className="w-5 h-5 text-[#8B4513] mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">Check-in / Check-out</p>
                      <p className="text-gray-600">Arrivo dalle 14:30 · Partenza entro le 10:00</p>
                    </div>
                  </div>
                  <a
                    href="https://maps.google.com/?q=Via+Santa+Margherita+23+Pescia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#8B4513] hover:text-[#D4A574] font-semibold text-sm transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Apri su Google Maps
                  </a>
                </div>
              </motion.div>

              {/* Contatti diretti */}
              <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }}>
                <h3
                  className="text-2xl mb-6 text-[#8B4513]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Contatti Diretti
                </h3>
                <div className="space-y-3 mb-8">
                  {contacts.map((c, i) => (
                    <motion.a
                      key={i}
                      href={
                        c.type === 'WhatsApp'
                          ? `https://wa.me/${c.phone.replace(/\D/g, '')}`
                          : `tel:${c.phone}`
                      }
                      className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-[#D4A574]/50 hover:bg-[#F5E6D3]/20 transition-all duration-300 group"
                      whileHover={{ x: 4 }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          c.type === 'WhatsApp' ? 'bg-[#25D366]/10' : 'bg-[#8B4513]/10'
                        }`}
                      >
                        {c.type === 'WhatsApp' ? (
                          <MessageCircle className="w-5 h-5 text-[#25D366]" />
                        ) : (
                          <Phone className="w-5 h-5 text-[#8B4513]" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{c.name}</p>
                        <p className="text-gray-500 text-sm">{c.phone}</p>
                      </div>
                      <div className="ml-auto text-[#D4A574] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </div>
                    </motion.a>
                  ))}
                </div>
                <div className="flex gap-3 flex-wrap">
                  <motion.a
                    href="https://wa.me/393331846822"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white rounded-xl font-semibold hover:bg-[#20BA5C] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp
                  </motion.a>
                  <motion.a
                    href="tel:+390572490568"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#8B4513] text-white rounded-xl font-semibold hover:bg-[#A0522D] transition-colors duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Phone className="w-5 h-5" />
                    Chiama
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-14 bg-gray-950 text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-4 gap-10 mb-10">
              <div className="md:col-span-2">
                <div
                  className="text-2xl font-bold text-[#D4A574] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Podere Scoglio d&apos;Oro
                </div>
                <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
                  Agriturismo di lusso nel cuore della Toscana. Casa colonica del
                  &apos;900 con piscina a sfioro, sauna e panorama mozzafiato.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                  Navigazione
                </h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {['Alloggi', 'Struttura', 'Galleria', 'Dintorni', 'Contatti'].map((l) => (
                    <li key={l}>
                      <a
                        href={`#${l.toLowerCase()}`}
                        className="hover:text-[#D4A574] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">
                  Contatti
                </h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>+39 0572 490568</p>
                  <p>poderescogliodoro@gmail.com</p>
                  <p>Via Santa Margherita, 23</p>
                  <p>Pescia (PT), 51017</p>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
              <p>&copy; 2026 Agriturismo Podere Scoglio d&apos;Oro. Tutti i diritti riservati.</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#D4A574] fill-[#D4A574]" />
                ))}
                <span className="ml-2">8.9 · Booking.com</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
