// app/noticias/[slug]/page.tsx

import { client } from '@/sanity/client';
import { groq } from 'next-sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';

const query = groq`*[_type == "post" && slug.current == $slug][0] {
  title,
  "mainImage": mainImage.asset->url,
  body, // El cuerpo del artículo
}`;

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await client.fetch(query, { slug: params.slug });

  if (!post) return <div>Noticia no encontrada.</div>;

  return (
    <main className="bg-gray-50 py-12">
        <article className="max-w-3xl mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg">
            <Link href="/" className="text-blue-600 hover:underline mb-8 block">&larr; Volver a todas las noticias</Link>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">{post.title}</h1>
            <img src={post.mainImage} alt={post.title} className="w-full h-auto max-h-[500px] object-cover rounded-lg my-8" />
            
            {/* El componente PortableText es especial para renderizar el texto enriquecido de Sanity */}
            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>
        </article>
    </main>
  );
}