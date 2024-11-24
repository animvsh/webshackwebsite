import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import DynamicHeader from '@/components/DynamicHeader'
import { blogPosts } from '@/lib/blogPosts'

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPosts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <DynamicHeader logo={
        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          🐘 WebShack
        </span>
      } />
      <main className="container mx-auto px-4 py-20">
        <Link href="/blog">
          <Button variant="outline" className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </Link>
        <article className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={400}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {post.title}
            </h1>
            <div className="flex items-center mb-6 text-gray-400">
              {post.icon && <post.icon className="w-5 h-5 mr-2" />}
              <span>By {post.author} | {post.date}</span>
            </div>
            <div className="prose prose-invert max-w-none">
              <p className="text-xl mb-6 text-gray-300">{post.excerpt}</p>
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}