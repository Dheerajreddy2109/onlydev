import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BuildPlanner from '../components/BuildPlanner';
import Services from '../components/Services';
import Showcase from '../components/Showcase';
import Comparison from '../components/Comparison';
import Industries from '../components/Industries';
import Process from '../components/Process';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import HomeMotion from '../components/motion/HomeMotion';

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <BuildPlanner />
        <Services />
        <Showcase />
        <Comparison />
        <Industries />
        <Process />
        <FAQ />
      </main>
      <Footer />
      <HomeMotion />
    </>
  );
}
