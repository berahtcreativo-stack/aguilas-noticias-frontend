// app/page.tsx

import Link from 'next/link';
import { client } from '@/sanity/client';
import { groq } from 'next-sanity';

// Esta es la "pregunta" que le hacemos a Sanity para que nos dé las noticias
const query = groq`*[_type == "post"] | order(_createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  "mainImage": mainImage.asset->url,
}`;

export default async function HomePage() {
  // Aquí pedimos los datos
  const posts = await client.fetch(query);

  return (
    <main className="max-w-5xl mx-auto p-4 md:p-8">
      <header className="text-center my-8">
        {/* Puedes cambiar esto para que muestre tu logo */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Noticias y Novedades</h1>
        <p className="text-lg text-gray-600 mt-2">Las Águilas del Norte</p>
      </header>

      {/* Aquí creamos la cuadrícula de noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post: any) => (
          <Link key={post._id} href={`/noticias/${post.slug}`} className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <div className="overflow-hidden">
              <img src={post.mainImage || 'https://via.placeholder.com/400x250'} alt={post.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4 bg-white">
              <h2 className="text-xl font-semibold text-gray-700 group-hover:text-blue-600">{post.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}