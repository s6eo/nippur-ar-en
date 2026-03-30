import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './sections/Header';
import Hero from './sections/Hero';
import Products from './sections/Products';
import About from './sections/About';
import Vision from './sections/Vision';
import Quality from './sections/Quality';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ScrollProgress from './components/ScrollProgress';
import FloatingElements from './components/FloatingElements';

function App() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      {/* Floating Background Elements */}
      <FloatingElements />
      
      <Header />
      <main className="relative z-10">
        <Hero />
        <Products />
        <About />
        <Vision />
        <Quality />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
