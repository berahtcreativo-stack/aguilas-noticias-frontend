// app/page.tsx

import Link from 'next/link';
import Image from 'next/image'; // ✅ Importar el componente de Next.js
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';

// Consulta a Sanity
const query = groq`*[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
}`;

export default async function HomePage() {
  const posts = await client.fetch(query);

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      <header className="text-center my-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Noticias y Novedades</h1>
        <p className="text-lg text-gray-600 mt-2">Las Águilas del Norte</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/noticias/${post.slug}`}
            className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="overflow-hidden relative w-full h-48">
              <Image
                src={post.mainImage || 'https://via.placeholder.com/400x250'}
                alt={post.title}
                fill // ✅ Hace que la imagen ocupe todo el contenedor
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold text-gray-700 group-hover:text-blue-600">
                {post.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
