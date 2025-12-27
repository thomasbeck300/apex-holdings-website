import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import { useLanguage } from '@/contexts/LanguageContext';

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
    return (
        <Card className="w-80 bg-card/80 backdrop-blur-sm border-border/50">
            <CardContent className="p-4">
                <div className="flex items-center gap-2.5 mb-3">
                    <Avatar className="size-9">
                        <AvatarImage src={img} alt={name} />
                        <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-medium text-foreground flex items-center gap-1">
                            {name} <span className="text-xs">{country}</span>
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">{username}</p>
                    </div>
                </div>
                <blockquote className="text-sm text-foreground/80">{body}</blockquote>
            </CardContent>
        </Card>
    );
}

export function Testimonials3D() {
  const { t } = useLanguage();
  
  // Testimonials data with translations
  const testimonials = [
    {
      name: t('testimonial.carlos.name'),
      username: '@carlos',
      body: t('testimonial.carlos.quote'),
      img: 'https://randomuser.me/api/portraits/men/32.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.ana.name'),
      username: '@ana',
      body: t('testimonial.ana.quote'),
      img: 'https://randomuser.me/api/portraits/women/68.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.roberto.name'),
      username: '@roberto',
      body: t('testimonial.roberto.quote'),
      img: 'https://randomuser.me/api/portraits/men/51.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.marina.name'),
      username: '@marina',
      body: t('testimonial.marina.quote'),
      img: 'https://randomuser.me/api/portraits/women/53.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.paulo.name'),
      username: '@paulo',
      body: t('testimonial.paulo.quote'),
      img: 'https://randomuser.me/api/portraits/men/33.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.julia.name'),
      username: '@julia',
      body: t('testimonial.julia.quote'),
      img: 'https://randomuser.me/api/portraits/women/22.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.fernando.name'),
      username: '@fernando',
      body: t('testimonial.fernando.quote'),
      img: 'https://randomuser.me/api/portraits/men/85.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.beatriz.name'),
      username: '@beatriz',
      body: t('testimonial.beatriz.quote'),
      img: 'https://randomuser.me/api/portraits/women/45.jpg',
      country: '🇧🇷 Brasil',
    },
    {
      name: t('testimonial.ricardo.name'),
      username: '@ricardo',
      body: t('testimonial.ricardo.quote'),
      img: 'https://randomuser.me/api/portraits/men/61.jpg',
      country: '🇧🇷 Brasil',
    },
  ];
  
  return (
    <div className="rounded-lg relative flex h-[500px] w-full max-w-[900px] mx-auto flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px] px-4">
            <div
                className="flex flex-row items-center gap-4"
                style={{
                    transform:
                        'translateX(-50px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
                }}
            >
                {/* Vertical Marquee (downwards) */}
                <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
                    {testimonials.map((review) => (
                        <TestimonialCard key={review.username} {...review} />
                    ))}
                </Marquee>
                {/* Vertical Marquee (upwards) */}
                <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
                    {testimonials.map((review) => (
                        <TestimonialCard key={review.username} {...review} />
                    ))}
                </Marquee>
                {/* Vertical Marquee (downwards) */}
                <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
                    {testimonials.map((review) => (
                        <TestimonialCard key={review.username} {...review} />
                    ))}
                </Marquee>
                {/* Vertical Marquee (upwards) */}
                <Marquee vertical pauseOnHover reverse repeat={3} className="[--duration:40s]">
                    {testimonials.map((review) => (
                        <TestimonialCard key={review.username} {...review} />
                    ))}
                </Marquee>
            </div>

            {/* Gradient overlays for fade effect */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
    );
}

