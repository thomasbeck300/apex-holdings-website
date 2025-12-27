import { useState } from 'react';
import { Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: t('contact.form.success'),
      description: formData.name,
    });

    setFormData({ name: '', email: '', company: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-foreground mb-8 animate-fade-in-up">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in-delay-1">
              {t('contact.subtitle')}
            </p>
            <div className="w-24 h-px bg-foreground/20 mt-8 animate-fade-in-delay-2" />
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm text-muted-foreground tracking-wide"
                  >
                    {t('contact.form.name')}
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-transparent border-border focus:border-foreground/50 rounded-none h-12"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm text-muted-foreground tracking-wide"
                  >
                    {t('contact.form.email')}
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-transparent border-border focus:border-foreground/50 rounded-none h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="company"
                  className="text-sm text-muted-foreground tracking-wide"
                >
                  {t('contact.form.company')}
                </label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-transparent border-border focus:border-foreground/50 rounded-none h-12"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm text-muted-foreground tracking-wide"
                >
                  {t('contact.form.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-transparent border-border focus:border-foreground/50 rounded-none resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-12 py-6 h-auto bg-foreground text-background hover:bg-foreground/90 rounded-none text-sm tracking-wider uppercase font-medium"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">...</span>
                ) : (
                  <>
                    {t('contact.form.submit')}
                    <Send size={16} className="ml-3" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;