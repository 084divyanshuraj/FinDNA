import Hero from '@/components/home/Hero';
import AnalysisSection from '@/components/home/AnalysisSection';
import PredictionsSection from '@/components/home/PredictionsSection';
import IndustriesSection from '@/components/home/IndustriesSection';
import SecuritySection from '@/components/home/SecuritySection';

export default function Home() {
  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-20">
      <Hero />
      <AnalysisSection />
      <PredictionsSection />
      <IndustriesSection />
      <SecuritySection />
    </div>
  );
}
