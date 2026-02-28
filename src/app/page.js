'use client';

import { useState } from 'react';
import { Phone, MessageCircle, MapPin, Wifi, Droplet, Wind } from 'lucide-react';

// ============================================================
// FOTO - Per cambiare le immagini:
//   1. Metti i tuoi file nella cartella  public/images/
//   2. Sostituisci l'URL con il percorso locale, es.:
//      heroMain: '/images/hero-piscina.jpg'
//
// Al momento le immagini caricano dal server originale.
// ============================================================
const IMMAGINI = {
  // Sezione Hero - foto principale della struttura / piscina a sfioro
  heroMain:
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663082761836/N75sTD6zhZXnmFd9ha2cHS/hero-piscina-sfioro-KRXKLH8viBEuh5U9gGAKVT.webp',

  // Appartamento Loft - foto della casa colonica / interno loft
  appartamentoLoft:
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663082761836/N75sTD6zhZXnmFd9ha2cHS/hero-struttura-colonica-dSr3SVC7ciqBBbzKy7ai5x.webp',

  // Appartamento Attico - foto del panorama / vallata
  appartamentoAttico:
    'https://d2xsxph8kpxj0f.cloudfront.net/310519663082761836/N75sTD6zhZXnmFd9ha2cHS/hero-panorama-vallata-4gZ8npFm2Fd8E8QP2bsZGc.webp',
};

export default function Home() {
  const [activeApartment, setActiveApartment] = useState(0);

  const apartments = [
    {
      id: 1,
      name: 'APPARTAMENTO LOFT',
      capacity: '4 Adulti + 1 Bambino',
      size: '45 mq',
      description:
        'Questo appartamento offre una vista spettacolare sulla valle sottostante, ed è diviso in zona notte e zona living, tramite delle scale che danno accesso alla parte superiore.',
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
      ],
      image: IMMAGINI.appartamentoLoft,
    },
    {
      id: 2,
      name: 'APPARTAMENTO ATTICO',
      capacity: '4 Adulti + 2 Bambini',
      size: '44 mq',
      description:
        'Impostato su di un unico piano, troviamo un salotto con divano/letto e finestra panoramica, la zona living con cucina di ultima generazione che si affaccia sulla valle sottostante.',
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
        'Barbecue a disposizione',
      ],
      image: IMMAGINI.appartamentoAttico,
    },
  ];

  const amenities = [
    {
      icon: Droplet,
      title: 'Piscina a Sfioro',
      description:
        'Piscina con trattamento ai sali di magnesio e vista spettacolare sulla vallata',
    },
    {
      icon: Wind,
      title: 'Sauna Finlandese',
      description: 'Centro benessere esclusivo con sauna e vasca idromassaggio',
    },
    {
      icon: Wifi,
      title: 'Wi-Fi Gratuito',
      description: 'Connessione internet illimitata in tutta la struttura',
    },
  ];

  const contacts = [
    { name: 'Carlo', phone: '+39 338 8953305', type: 'WhatsApp' },
    { name: 'Matteo', phone: '+39 333 1846822', type: 'WhatsApp' },
    { name: 'Caterina (English)', phone: '+39 345 0863944', type: 'WhatsApp' },
    { name: 'Telefono Fisso', phone: '+39 0572 490568', type: 'Telefono' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigazione */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 flex items-center justify-between h-20">
          <div
            className="text-2xl font-bold text-[#8B4513]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SCOGLIO D&apos;ORO
          </div>
          <div className="flex gap-8 text-sm font-medium text-gray-700">
            <a href="#alloggi" className="hover:text-[#8B4513] transition">
              Alloggi
            </a>
            <a href="#struttura" className="hover:text-[#8B4513] transition">
              Struttura
            </a>
            <a href="#contatti" className="hover:text-[#8B4513] transition">
              Contatti
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-20 h-screen flex items-center justify-center relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMMAGINI.heroMain})` }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1
            className="text-6xl md:text-7xl mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Scegli il Relax
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Vivi la tua vacanza in armonia con la natura nel cuore della Toscana
          </p>
          <a
            href="#contatti"
            className="inline-block px-8 py-4 bg-[#8B4513] text-white rounded-lg hover:bg-[#A0522D] transition-all duration-300 font-semibold tracking-wide"
            style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: '0.05em' }}
          >
            Contattaci Ora
          </a>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Chi Siamo */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2
            className="text-5xl mb-8 text-[#8B4513]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Chi Siamo
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Il nome &ldquo;Scoglio d&apos;oro&rdquo; fu dato dai paesani di alcune generazioni
            passate all&apos;antica casa colonica, costruita per il suo intero con pietre a vivo,
            poiché richiamava alla mente l&apos;immagine di uno scoglio dorato che si erge da un
            &ldquo;mare verde&rdquo;, costituito dalla natura circostante.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            L&apos;Agriturismo è costituito in appartamenti ricavati da una casa colonica dei
            primi del &apos;900 che è stata recentemente ampliata con degli spazi realizzati in
            chiave moderna garantendo l&apos;equilibrio fra ciò che è e ciò che è stato.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            Situato su uno dei due colli che vanno ad abbracciare la vallata pesciatina,
            l&apos;Agriturismo si contraddistingue per la sua posizione fortemente strategica. È
            possibile inoltre raggiungere con facilità le maggiori città toscane quali Firenze,
            Lucca, Siena e Pisa.
          </p>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* La Struttura */}
      <section id="struttura" className="py-20 bg-[#F5E6D3]/30">
        <div className="container mx-auto px-6">
          <h2
            className="text-5xl mb-16 text-center text-[#8B4513]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            La Struttura
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {amenities.map((amenity, idx) => {
              const Icon = amenity.icon;
              return (
                <div key={idx} className="text-center">
                  <Icon className="w-16 h-16 mx-auto mb-6 text-[#D4A574]" />
                  <h3
                    className="text-2xl mb-4 text-[#8B4513]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {amenity.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{amenity.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Alloggi */}
      <section id="alloggi" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2
            className="text-5xl mb-16 text-center text-[#8B4513]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Alloggi
          </h2>

          {/* Selettore */}
          <div className="flex gap-4 justify-center mb-12">
            {apartments.map((apt, idx) => (
              <button
                key={idx}
                onClick={() => setActiveApartment(idx)}
                className={`px-6 py-3 rounded-lg transition-all duration-300 font-semibold ${
                  activeApartment === idx
                    ? 'bg-[#8B4513] text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {apt.name}
              </button>
            ))}
          </div>

          {/* Dettagli */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={apartments[activeApartment].image}
                alt={apartments[activeApartment].name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3
                className="text-4xl mb-4 text-[#8B4513]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {apartments[activeApartment].name}
              </h3>
              <div className="flex gap-6 mb-6 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Capacità</p>
                  <p className="font-semibold">{apartments[activeApartment].capacity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Superficie</p>
                  <p className="font-semibold">{apartments[activeApartment].size}</p>
                </div>
              </div>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {apartments[activeApartment].description}
              </p>
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-[#8B4513] mb-4">Servizi Inclusi:</h4>
                <ul className="grid grid-cols-2 gap-3">
                  {apartments[activeApartment].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-700">
                      <span className="text-[#D4A574] mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Contatti */}
      <section id="contatti" className="py-20 bg-[#F5E6D3]/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2
            className="text-5xl mb-4 text-center text-[#8B4513]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Contattaci
          </h2>
          <p className="text-center text-gray-700 mb-16 text-lg">
            Siamo a tua disposizione per rispondere a tutte le tue domande e aiutarti a
            prenotare la tua vacanza perfetta.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3
                className="text-2xl mb-4 text-[#8B4513]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Informazioni
              </h3>
              <div className="flex gap-3 items-start mb-4">
                <MapPin className="w-5 h-5 text-[#8B4513] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Via Santa Margherita, 23</p>
                  <p className="text-gray-700">Pescia (PT) 51017, Italia</p>
                </div>
              </div>
            </div>

            <div>
              <h3
                className="text-2xl mb-4 text-[#8B4513]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Contatti Diretti
              </h3>
              <div className="space-y-3">
                {contacts.map((contact, idx) => (
                  <a
                    key={idx}
                    href={
                      contact.type === 'WhatsApp'
                        ? `https://wa.me/${contact.phone.replace(/\D/g, '')}`
                        : `tel:${contact.phone}`
                    }
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white transition-colors"
                  >
                    {contact.type === 'WhatsApp' ? (
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                    ) : (
                      <Phone className="w-5 h-5 text-[#8B4513]" />
                    )}
                    <div>
                      <p className="font-semibold text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-600">{contact.phone}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://wa.me/393388953305"
              className="px-8 py-4 bg-[#25D366] text-white rounded-lg hover:bg-[#20BA5C] transition-all duration-300 font-semibold tracking-wide flex items-center gap-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <MessageCircle className="w-5 h-5" />
              Contatta su WhatsApp
            </a>
            <a
              href="tel:+390572490568"
              className="px-8 py-4 bg-[#8B4513] text-white rounded-lg hover:bg-[#A0522D] transition-all duration-300 font-semibold tracking-wide flex items-center gap-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Phone className="w-5 h-5" />
              Chiama Ora
            </a>
          </div>
        </div>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

      {/* Footer */}
      <footer className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-semibold text-[#8B4513] mb-4">
                Scoglio d&apos;Oro
              </h4>
              <p className="text-gray-700">Agriturismo di lusso nel cuore della Toscana</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#8B4513] mb-4">Navigazione</h4>
              <ul className="space-y-2 text-gray-700">
                <li>
                  <a href="#alloggi" className="hover:text-[#8B4513] transition">
                    Alloggi
                  </a>
                </li>
                <li>
                  <a href="#struttura" className="hover:text-[#8B4513] transition">
                    Struttura
                  </a>
                </li>
                <li>
                  <a href="#contatti" className="hover:text-[#8B4513] transition">
                    Contatti
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#8B4513] mb-4">Contatti</h4>
              <p className="text-gray-700">+39 0572 490568</p>
              <p className="text-gray-700">poderescogliodoro@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-600">
            <p>&copy; 2026 Agriturismo Scoglio d&apos;Oro. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
