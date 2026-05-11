import HeroSection from '@/components/sections/hero';
import PackagesSection from '@/components/sections/packages';
import TestimonialsSection from '@/components/sections/testimonials';
import Button from '@/components/ui/button';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Packages Section */}
      <PackagesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-gold">
        <div className="container-luxury text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Begin Your Sacred Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join hundreds of pilgrims who have experienced the ultimate in luxury and spirituality with SA'YA Umroh.
          </p>
          <Button variant="secondary" size="lg" className="px-10">
            Start Your Booking
          </Button>
        </div>
      </section>
    </>
  );
}
