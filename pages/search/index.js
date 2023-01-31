import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Layout } from '@/components/Layout.tsx'
import {search} from 'services/search.js'
import {useI18N} from 'context/i18n.js'

export default function Component({ query, results }) {
  const {t} = useI18N()

  return <>
    <Head>
      <title>{`xkcd - Results for ${query}`}</title>
      <meta name="description" content={`Search results for ${query}`} />
    </Head>

    <Layout>
      <h1>{t('SEARCH_RESULTS_TITLE', results.length, query)}</h1>
      {
        results.map(result => {
          return (
            <Link className='flex flex-row content-center justify-start bg-slate-300 hover:bg-slate-50' key={result.id} href={`/comic/${result.id}`}>
              <Image src={result.img} width={50} height={50} alt={result.alt} className="rounded-full" />
            </Link>
          )
        })
      }
    </Layout>

    <style jsx>{``}</style>
  </>
}

export async function getServerSideProps(context) {
  const { query } = context
  const { q = '' } = query

  const { results } = await search({query: q})

  return {
    props: {
      query: q,
      results
    }
  }
}