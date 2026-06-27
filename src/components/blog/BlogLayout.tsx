import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

interface BlogMeta {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
}

interface BlogLayoutProps {
  children: React.ReactNode;
  meta: BlogMeta;
}

export default function BlogLayout({ children, meta }: BlogLayoutProps) {
  useEffect(() => {
    document.title = meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', meta.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', meta.url);

    // Meta Pixel — ViewContent por artículo
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        content_name: meta.title,
        content_category: 'Blog',
        content_ids: [meta.url],
      });
    }

    // Article + BreadcrumbList schema
    const prev = document.getElementById('blog-article-schema');
    if (prev) prev.remove();
    const script = document.createElement('script');
    script.id = 'blog-article-schema';
    script.type = 'application/ld+json';
    const headline = meta.title.split('|')[0].trim();
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          '@id': `${meta.url}#article`,
          headline,
          description: meta.description,
          url: meta.url,
          datePublished: meta.datePublished ?? '2026-06-17',
          dateModified: meta.datePublished ?? '2026-06-17',
          inLanguage: 'es-CL',
          author: { '@id': 'https://www.domis.cl/#founder' },
          publisher: { '@id': 'https://www.domis.cl/#business' },
          mainEntityOfPage: { '@type': 'WebPage', '@id': meta.url },
          image: 'https://www.domis.cl/og-image.jpg',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.domis.cl' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.domis.cl/blog' },
            { '@type': 'ListItem', position: 3, name: headline, item: meta.url },
          ],
        },
      ],
    });
    document.head.appendChild(script);
    return () => { document.getElementById('blog-article-schema')?.remove(); };
  }, [meta]);

  return (
    <div className="min-h-screen bg-slate-950 font-sans">
      {/* Nav */}
      <nav className="border-b border-white/10 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/" className="flex flex-col leading-none group" aria-label="Ir al inicio">
            <div className="flex items-start">
              <span className="text-xl font-black text-white tracking-tight uppercase leading-none group-hover:text-cyan-50 transition-colors">DOMIS</span>
              <span className="text-cyan-500 text-sm font-bold ml-1 relative top-[-2px]">™</span>
            </div>
            <span className="text-[9px] text-cyan-500 font-bold tracking-[0.35em] uppercase leading-none mt-0.5">PROPERTY-AUDIT</span>
          </a>
          <a href="/blog" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm">
            <ArrowLeft size={16} />
            Blog
          </a>
        </div>
      </nav>

      {/* Article */}
      <main className="max-w-3xl mx-auto px-6 py-12">
        {children}
      </main>

      {/* Footer CTA */}
      <div className="border-t border-white/10 py-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-slate-400 text-sm uppercase tracking-widest mb-4">DOMIS™ Property Audit</p>
          <a
            href="https://wa.me/56929901343?text=Hola, vi el blog de DOMIS™ y quiero saber más sobre la auditoría técnica."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black uppercase tracking-widest text-sm px-8 py-4 rounded-full transition-colors"
          >
            Cotiza tu auditoría →
          </a>
        </div>
      </div>
    </div>
  );
}
