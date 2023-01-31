import Head from 'next/head';
import Image from 'next/image'
import Link from 'next/link'
import { Header } from 'components/Header'
import { Layout } from 'components/Layout'
import { readFile, stat, readdir } from 'fs/promises'
import { basename } from 'path';

export default function Comic({ id, title, img, alt, width, height, prevId, nextId, hasNext, hasPrevious }) {
  return (
    <>
      <Head>
        <title>xkcd - Comics for developers</title>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <section className="max-w-lg m-auto">
          <h1 className='font-bold text-center mb-4 text-xl'>{title}</h1>
          <div className="max-w-sm m-auto">
            <Image className="max-w-sm m-auto" placeholder='blur' blurDataURL='data:,Hello%2C%20World%21' width={width} height={height} src={img} alt={alt} />
          </div>

          <p>{alt}</p>
          <div className="flex justify-between mt-4 font-bold">
            {
              hasPrevious && <Link className="text-gra-600" href={`/comic/${prevId}`}>
                ⬅ Previous
              </Link>
            }
            {
              hasNext && <Link className="text-gra-600" href={`/comic/${nextId}`}>
                Next ➡
              </Link>
            }
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticPaths({ locales }) {
  const files = await readdir('./comics')

  let paths = []
  
  locales.forEach(locale => {
    paths = paths.concat(files.map(file => {
      const id = basename(file, '.json')
      return {
        params: { id }, locale
      }
    }))
  })

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const { id } = params
  const content = await readFile(`./comics/${id}.json`, 'utf8')
  const comic = JSON.parse(content)

  const idNumber = +id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`)
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId
    },
  };
}
