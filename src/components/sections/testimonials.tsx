'use client';

import Card from '@/components/ui/card';

const testimonials = [
  {
    name: 'Fatima Hassan',
    location: 'Jakarta, Indonesia',
    rating: 5,
    content: 'SA\'YA Umroh made my pilgrimage experience absolutely unforgettable. The attention to detail and luxury accommodations exceeded all expectations.',
    avatar: '👩‍🦱',
  },
  {
    name: 'Ahmad Rizki',
    location: 'Surabaya, Indonesia',
    rating: 5,
    content: 'From start to finish, everything was perfectly organized. The guides were knowledgeable, the hotels were premium, and the food was exceptional.',
    avatar: '👨‍🦲',
  },
  {
    name: 'Siti Nurhaliza',
    location: 'Bandung, Indonesia',
    rating: 5,
    content: 'The premium package was worth every penny. The VIP treatment, private guides, and luxury amenities made this the most spiritual journey of my life.',
    avatar: '👩',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-charcoal-900 to-charcoal-800">
      <div className="container-luxury">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text-gold">Pilgrims Worldwide</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Read what our satisfied guests say about their SA'YA Umroh experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <Card key={idx} variant="default" className="p-6 border-gold-300 bg-charcoal-800">
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-gold-400 text-lg">
                    ★
                  </span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-200 mb-6 italic">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-gold-300">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center text-2xl">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{testimonial.name}</p>
                  <p className="text-gold-300 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
