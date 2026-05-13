'use client';

import { Card } from '@/components/ui/card';
import { LinkButton } from '@/components/ui/button';

const packages = [
  {
    name: 'Silver',
    price: 'Rp 25.000.000',
    duration: '9 Hari',
    hotel: 'Hotel Bintang 3',
    features: ['Tiket Pesawat PP', 'Visa Umroh', 'Makan 3x Sehari', 'Tour Guide'],
    highlight: false,
  },
  {
    name: 'Gold',
    price: 'Rp 35.000.000',
    duration: '12 Hari',
    hotel: 'Hotel Bintang 4',
    features: ['Tiket Pesawat PP', 'Visa Umroh', 'Makan 3x Sehari', 'Tour Guide', 'City Tour', 'Laundry'],
    highlight: true,
  },
  {
    name: 'Platinum',
    price: 'Rp 50.000.000',
    duration: '14 Hari',
    hotel: 'Hotel Bintang 5',
    features: ['Tiket Pesawat PP', 'Visa Umroh', 'Makan 3x Sehari', 'Private Guide', 'VIP Lounge', 'Laundry', 'Spa'],
    highlight: false,
  },
];

export default function PackagesSection() {
  return (
    <section className="py-24 bg-charcoal-900">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="gradient-text-gold">Premium Packages</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Choose the perfect Umroh package that suits your needs and budget
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => (
            <Card
              key={idx}
              className={`p-8 text-center ${pkg.highlight ? 'border-gold-400 ring-2 ring-gold-400/20 scale-105' : ''}`}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
              <p className="text-gold-400 text-3xl font-bold mb-1">{pkg.price}</p>
              <p className="text-gray-400 text-sm mb-6">{pkg.duration} &middot; {pkg.hotel}</p>

              <ul className="space-y-3 mb-8 text-left">
                {pkg.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-200 text-sm">
                    <span className="text-emerald-400">✓</span> {f}
                  </li>
                ))}
              </ul>

              <LinkButton
                href="/paket"
                variant={pkg.highlight ? 'primary' : 'secondary'}
                className="w-full justify-center"
              >
                Pilih Paket
              </LinkButton>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
