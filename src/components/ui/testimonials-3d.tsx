import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';

// Testimonials data
const testimonials = [
    {
        name: 'Carlos Silva',
        username: '@carlos',
        body: 'Parceria estratégica que transformou nossos resultados!',
        img: 'https://randomuser.me/api/portraits/men/32.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Ana Rodrigues',
        username: '@ana',
        body: 'Governança exemplar e visão de longo prazo.',
        img: 'https://randomuser.me/api/portraits/women/68.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Roberto Mendes',
        username: '@roberto',
        body: 'Profissionalismo e transparência em cada etapa.',
        img: 'https://randomuser.me/api/portraits/men/51.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Marina Costa',
        username: '@marina',
        body: 'Excelência operacional que gera valor consistente.',
        img: 'https://randomuser.me/api/portraits/women/53.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Paulo Santos',
        username: '@paulo',
        body: 'Investimento que superou todas as expectativas!',
        img: 'https://randomuser.me/api/portraits/men/33.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Julia Martins',
        username: '@julia',
        body: 'Equipe dedicada ao sucesso dos parceiros.',
        img: 'https://randomuser.me/api/portraits/women/22.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Fernando Lima',
        username: '@fernando',
        body: 'Resultados impressionantes em poucos meses!',
        img: 'https://randomuser.me/api/portraits/men/85.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Beatriz Alves',
        username: '@beatriz',
        body: 'Governança sólida e processos transparentes.',
        img: 'https://randomuser.me/api/portraits/women/45.jpg',
        country: '🇧🇷 Brasil',
    },
    {
        name: 'Ricardo Souza',
        username: '@ricardo',
        body: 'Holding de referência no mercado brasileiro.',
        img: 'https://randomuser.me/api/portraits/men/61.jpg',
        country: '🇧🇷 Brasil',
    },
];

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
    return (
        <div className="rounded-lg relative flex h-[500px] w-full max-w-[900px] mx-auto flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px]">
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

