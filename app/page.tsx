"use client"
import ChannelInput from './components/ChannelInput';
import Header from './components/Header';
import { ResultsProvider } from './helpers/ResultsContext';
import Results from './components/Results';

export default function Home() {
  return (
    <main>
      <Header />
      <ResultsProvider>
        <div className="mx-auto lg:w-[75%]">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr,1fr] gap-4 ">
            <ChannelInput />
            <Results />
          </div>
        </div>
      </ResultsProvider>
    </main>
  )
}
