import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import fs from 'fs/promises';
import { Layout } from '@/components/Layout';

import { useI18N } from 'context/i18n.js'

export default function Home({latestComics}) {
  const {t} = useI18N()
  return (
    <>
      <Head>
        <meta name="description" content="Comics for developers" />
      </Head>

      <Layout>
        <h2 className="text-3xl font-bold text-center mb-10">{t('LATEST_COMICS')}</h2>
        <section className="grid grid-cols-1 gap-2 max-w-md m-auto sm:grid-cols-2 md:grid-cols-3">
          {latestComics.map((comic) => (
            <Link
              className="relative block mb-4 pb-4"
              href={`/comic/${comic.id}`}
              key={comic.id}
            >
              <h3 className="font-semibold text-center text-sm mb-4">
                {comic.title}
              </h3>
              <Image
                width={comic.width}
                height={comic.height}
                style={{objectFit: 'cover', margin: '0 auto'}}
                src={comic.img}
                alt={comic.alt}
              />
            </Link>
          ))}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const files = await fs.readdir('./comics');
  const latestComicsFiles = files.splice(-8, files.length);

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8');
    return JSON.parse(content);
  });

  const latestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      latestComics,
    },
  };
}
