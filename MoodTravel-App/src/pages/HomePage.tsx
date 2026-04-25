import { Link } from 'react-router-dom';
import { Compass, Sparkles, MapPin, Heart, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DestinationCard } from '@/components/DestinationCard';
import { NotificationBar } from '@/components/layout/NotificationBar';
import { destinations } from '@/data';

const features = [
  {
    icon: Sparkles,
    title: 'Mood-Based Discovery',
    description: 'Our smart algorithm matches destinations to your current emotional state for the perfect getaway.',
  },
  {
    icon: MapPin,
    title: 'Curated Destinations',
    description: 'Hand-picked locations worldwide, each vetted for quality, safety, and unique experiences.',
  },
  {
    icon: Heart,
    title: 'Personalized Matches',
    description: 'Get recommendations tailored to your budget, travel style, and activity preferences.',
  },
  {
    icon: Shield,
    title: 'Secure Booking',
    description: 'Book with confidence through our verified partners with flexible cancellation policies.',
  },
];

const stats = [
  { value: '50+', label: 'Destinations' },
  { value: '10K+', label: 'Happy Travelers' },
  { value: '4.8', label: 'Average Rating' },
  { value: '98%', label: 'Satisfaction' },
];

export function HomePage() {
  const featured = destinations.filter((d) => d.featured);

  return (
    <main>
      {/* Notification Bar */}
      <NotificationBar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-travel.png"
            alt="Tropical paradise with crystal clear water"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>

        <div className="relative container mx-auto px-4 lg:px-8 py-24">
          <div className="max-w-2xl space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 px-4 py-2 animate-fade-in-up">
              <Compass className="h-4 w-4 text-sunset-light" />
              <span className="text-sm font-medium text-sunset-light">
                Let your mood guide your journey
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight animate-fade-in-up animate-delay-100 text-primary-foreground">
              Travel Destinations That Match Your{' '}
              <span className="text-gradient-sunset">Mood</span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed animate-fade-in-up animate-delay-200 text-primary-foreground/80 max-w-xl">
              Answer a few questions about how you feel, and we will recommend the 
              perfect destination for your next unforgettable adventure.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <Link to="/questionnaire">
                <Button size="xl" variant="sunset">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Discover My Destination
                </Button>
              </Link>
              <Link to="/destinations">
                <Button size="xl" variant="glass" className="text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10">
                  Browse All Places
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 animate-fade-in-up animate-delay-400">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold font-display text-primary-foreground">
                    {stat.value}
                  </div>
                  <div className="text-xs text-primary-foreground/60 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">How it works</span>
            <h2 className="text-4xl font-bold font-display mt-3 text-foreground">
              Find Your Perfect Escape in 3 Steps
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Our mood-based recommendation engine makes finding your dream destination effortless and fun.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { step: '01', title: 'Share Your Mood', desc: 'Tell us how you feel and what kind of experience you are looking for right now.' },
              { step: '02', title: 'Get Matched', desc: 'Our algorithm analyzes your mood and preferences to find ideal destinations.' },
              { step: '03', title: 'Book & Travel', desc: 'Choose your favorite match and book your trip with just a few clicks.' },
            ].map((item, idx) => (
              <div key={item.step} className="text-center space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms`, animationFillMode: 'forwards' }}>
                <div className="w-16 h-16 rounded-2xl gradient-ocean flex items-center justify-center mx-auto shadow-ocean">
                  <span className="text-xl font-bold text-primary-foreground">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">Why MoodTravel</span>
            <h2 className="text-4xl font-bold font-display mt-3 text-foreground">
              Travel Smarter, Not Harder
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-xl gradient-sunset flex items-center justify-center mb-4 shadow-sunset transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-lg font-bold font-display text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-24 gradient-warm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">Popular picks</span>
              <h2 className="text-4xl font-bold font-display mt-3 text-foreground">
                Featured Destinations
              </h2>
              <p className="mt-3 text-muted-foreground max-w-lg">
                Our most loved destinations, handpicked for unforgettable experiences.
              </p>
            </div>
            <Link to="/destinations" className="hidden md:block">
              <Button variant="outline">
                View All
                <MapPin className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.slice(0, 6).map((dest) => (
              <DestinationCard key={dest._id} destination={dest} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/destinations">
              <Button variant="outline">View All Destinations</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-6 w-6 text-sunset fill-sunset" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-3xl font-display font-medium text-foreground leading-relaxed italic">
              "MoodTravel completely changed how I plan vacations. I told it I was feeling stressed, 
              and it recommended Bali — it was the perfect escape I didn't know I needed."
            </blockquote>
            <div>
              <p className="font-semibold text-foreground">Sarah Chen</p>
              <p className="text-sm text-muted-foreground">Traveled to Bali, Indonesia</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 gradient-ocean relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-sunset blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-display text-primary-foreground mb-6">
            Ready to Discover Your<br />Perfect Destination?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Take our 2-minute mood quiz and let us find the travel experience you have been dreaming about.
          </p>
          <Link to="/questionnaire">
            <Button size="xl" variant="sunset">
              <Sparkles className="h-5 w-5 mr-2" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
