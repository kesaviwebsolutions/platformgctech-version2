import React from 'react'
import Main from '../Main'
import Swap from '../Swap'

export default function Home({gcsmaketcap,
  gcstousd,
  gcsusdm,
  xaustousd,
  xausmk,
  usdmtousdt,
  usdmmarketcap,
  xaustogcs,
  xaustousdm,
  account}) {
  return (
    <div>
      <Main gcsmaketcap={gcsmaketcap}
          gcstousd={gcstousd}
          gcsusdm={gcsusdm}
          xaustousd={xaustousd}
          xausmk={xausmk}
          usdmtousdt={usdmtousdt}
          usdmmarketcap={usdmmarketcap}
          xaustogcs={xaustogcs}
          xaustousdm={xaustousdm}
          account={account}/>
      <Swap  gcsusdm={gcsusdm} xaustousdm={xaustousdm} account={account} xaustousd={xaustousd} />
    </div>
  )
}
