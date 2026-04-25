import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { moodOptions, travelStyleOptions, budgetOptions, climateOptions, activityOptions } from '@/data';
import { cn } from '@/lib/utils';

type Step = 'mood' | 'style' | 'budget' | 'climate' | 'activity';

const steps: Step[] = ['mood', 'style', 'budget', 'climate', 'activity'];

const stepInfo: Record<Step, { title: string; subtitle: string }> = {
  mood: { title: 'How are you feeling?', subtitle: 'Select the mood that best describes your current state' },
  style: { title: 'Who are you traveling with?', subtitle: 'Your travel companions help us personalize recommendations' },
  budget: { title: 'What is your budget?', subtitle: 'We will find amazing destinations at your price point' },
  climate: { title: 'Preferred climate?', subtitle: 'Choose the weather that makes you happiest' },
  activity: { title: 'Favorite activity?', subtitle: 'What do you most want to do on your trip?' },
};

export function QuestionnairePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    mood: '',
    style: '',
    budget: '',
    climate: '',
    activity: '',
  });
  const navigate = useNavigate();

  const step = steps[currentStep];

  const selectAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [step]: value }));
  };

  const canContinue = answers[step] !== '';

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((p) => p + 1);
    } else {
      const params = new URLSearchParams({
        mood: answers.mood,
        travelStyle: answers.style,
        budget: answers.budget,
        climate: answers.climate,
        activity: answers.activity,
      });
      navigate(`/recommendations?${params.toString()}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  };

  const getOptions = () => {
    switch (step) {
      case 'mood': return moodOptions.map((o) => ({ id: o.id, label: o.label, emoji: o.emoji, desc: o.description }));
      case 'style': return travelStyleOptions.map((o) => ({ id: o.id, label: o.label, emoji: o.emoji, desc: '' }));
      case 'budget': return budgetOptions.map((o) => ({ id: o.id, label: o.label, emoji: o.emoji, desc: o.description }));
      case 'climate': return climateOptions.map((o) => ({ id: o.id, label: o.label, emoji: o.emoji, desc: '' }));
      case 'activity': return activityOptions.map((o) => ({ id: o.id, label: o.label, emoji: o.emoji, desc: '' }));
    }
  };

  const options = getOptions();

  return (
    <main className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        {/* Progress */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-accent">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full gradient-sunset transition-all duration-500 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            {stepInfo[step].title}
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            {stepInfo[step].subtitle}
          </p>
        </div>

        {/* Options Grid */}
        <div className={cn(
          "grid gap-4 mb-10",
          options.length <= 4 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
        )}>
          {options.map((opt, idx) => (
            <button
              key={opt.id}
              onClick={() => selectAnswer(opt.id)}
              className={cn(
                "relative p-5 rounded-2xl border-2 text-left transition-all duration-300 opacity-0 animate-scale-in group",
                answers[step] === opt.id
                  ? "border-primary bg-primary/5 shadow-ocean"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-soft"
              )}
              style={{ animationDelay: `${idx * 60}ms`, animationFillMode: 'forwards' }}
            >
              <div className="text-3xl mb-3">{opt.emoji}</div>
              <div className="font-semibold text-foreground">{opt.label}</div>
              {opt.desc && (
                <div className="text-xs text-muted-foreground mt-1">{opt.desc}</div>
              )}
              {answers[step] === opt.id && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full gradient-ocean flex items-center justify-center">
                  <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            variant={currentStep === steps.length - 1 ? 'sunset' : 'default'}
            size="lg"
            onClick={handleNext}
            disabled={!canContinue}
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                See My Matches
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}
