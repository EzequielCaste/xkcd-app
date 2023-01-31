import Link from 'next/link';
import { useRouter } from 'next/router';
import {useState, useRef} from 'react';

export function Header() {
  const [results, setResults] = useState([])
  const searchRef = useRef<HTMLInputElement>()
  const { locale, locales } = useRouter()

  const getValue = () => searchRef.current?.value;
  
  const handleChange = () => {
    const q = getValue()

    if (!q) return 

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResults(searchResults)
      })
  }

  const restOfLocales: string[] = locales ? locales.filter(l => l !== locale) : []

  return (
    <header className="flex justify-between items-center p-4 max-w-xl m-auto">
      <h1 className="font-bold">
        <Link href="/">next</Link>
        <span className="font-light">xkcd</span>
      </h1>
      <nav>
        <ul className="flex flex-row gap-2">
          <li>
            <Link className="text-sm font-bold" href="/">
              Home
            </Link>
          </li>

          <li>
            <Link className="text-sm font-bold" href='/' locale={restOfLocales[0]}>
              {restOfLocales[0]}
            </Link>
          </li>
          {/* <li>
            <input
              className="text-xs px-4 py-1 border border-gray-400 rounded-3xl"
              ref={searchRef}
              type="search"
              onChange={handleChange}
            />
            <div className="relative z-10">
              {Boolean(results.length) && (
                <div className="absolute top-0 left-0">
                  <ul className="w-full border rounded-lg shadow-xl border-gray-50 bg-white z-50 overflow-hidden">
                    <li className="m-0" key='all-results'>
                      <Link
                        className="italic text-gray-500 block px-2 py-1 text-sm font-semibold hover:bg-slate-200 overflow-hidden text-ellipsis whitespace-nowrap"
                        href={`/search?q=${getValue()}`}
                      >
                        Ver {results.length} resultados
                      </Link>
                    </li>
                    {results.map((result) => {
                      return (
                        <li className="m-0" key={result.id}>
                          <Link
                            className="block px-2 py-1 text-sm font-semibold hover:bg-slate-200 overflow-hidden"
                            href={`/comic/${result.id}`}
                          >
                            {result.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </li> */}
        </ul>
      </nav>
    </header>
  );
}
