import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./compnents/Navbar";
import { useEffect, useState } from "react";
import {
  XAUs_Totak_Supply,
  USDM_Totak_Supply,
  GCS_Totak_Supply,
  login,
  GetChainId,
  getUserAddress,
  getAdmin,
} from "./Web3/Web3";
import axios from "axios";
import Footer from "./compnents/Footer";
import Admin from "./compnents/pages/Admin";
import Home from "./compnents/pages/Home";
import "./App.css";
import CreateLevel from "./compnents/pages/CreateLevel.tsx";
const url = "https://apigctech.ap.ngrok.io";

function App() {
  const [xausSupply, setXausSupply] = useState(0);
  const [usdmSupply, setUsdmSupply] = useState(0);
  const [gcsSupply, setGcsSupply] = useState(0);
  const [contractadmin, setContractAdmin] = useState();

  useEffect(() => {
    const init = async () => {
      const xaus = await XAUs_Totak_Supply();
      setXausSupply(xaus);
      const gcs = await GCS_Totak_Supply();
      setGcsSupply(gcs);
      const usdm = await USDM_Totak_Supply();
      setUsdmSupply(usdm);
      const user = await getAdmin();
      setContractAdmin(user);

      const closeprice = await axios
        .get("https://close.ap.ngrok.io/kws/v4/closeprice", {})
        .then(function (response) {
          return Number(response.data[0].GCStoUSDT);
        })
        .catch(function (error) {
          console.log(error);
        });

      const mmk = await axios
        .get(`https://apigctech.ap.ngrok.io/mmkprice`)
        .then(function (response) {
          response.data.reverse();
          console.log(response.data[0].price);
          return response.data[0].price;
        })
        .catch(function (error) {
          console.log("Error", error);
        });

      const govt = await axios
        .get(`https://apigctech.ap.ngrok.io/values`)
        .then(function (response) {
          return response.data[0].govt;
        })
        .catch(function (error) {
          console.log(error);
        });

      let headersXau = {
        "x-access-token": "goldapi-6vbttl4viue6x-io",
        "Content-Type": "application/json",
      };

      let xauOptions = {
        url: "https://www.goldapi.io/api/XAU/USD",
        method: "GET",
        headers: headersXau,
      };
      const xau = await axios.request(xauOptions).then(function (response) {
        return response.data.price;
      });

      let headersList = {
        Accept: "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      };
      let reqOptions = {
        url: "https://api.exchangerate.host/convert?from=USD&to=CNH",
        method: "GET",
        headers: headersList,
      };
      const btwo = await axios.request(reqOptions).then(function (response) {
        return Number(response.data.info.rate).toFixed(5);
      });

      const added = await axios
        .get(`${url}/values`)
        .then(function (response) {
          return response.data[0].addMMk;
        })
        .catch(function (error) {
          console.log(error);
        });

      Calculation(xaus, gcs, usdm, closeprice, mmk, govt, xau, btwo, added);
    };
    init();

    setInterval(() => {
      init();
    }, 10000);
  }, []);
  const [gcsmaketcap, setGcsSupplyCap] = useState(0);
  const [gcstousd, setGcstoUsd] = useState(0);
  const [gcsusdm, setGcsusdm] = useState(0);
  const [xaustousd, setXaustoUsd] = useState(0);
  const [xausmk, setXausmk] = useState(0);
  const [usdmtousdt, setUsdmtousdt] = useState(0);
  const [usdmmarketcap, setUsdmMarketcap] = useState(0);
  const [xaustogcs, setXausGcs] = useState(0);
  const [xaustousdm, setXaustousdm] = useState(0);

  const Calculation = (
    xaus,
    gcs,
    usdm,
    closeprice,
    mmk,
    govt,
    xau,
    btwo,
    added
  ) => {
    const gcsmk = (Number(closeprice) * 5000000).toFixed(0);
    setGcsSupplyCap(gcsmk);
    const gcstousd = closeprice;
    setGcstoUsd(closeprice);
    const gcsusdm = ((mmk + added) * closeprice) / govt;
    setGcsusdm(gcsusdm);
    const xaustousd = ((xau / 31.1025) * 0.425 * 1.03).toFixed(5);
    setXaustoUsd(xaustousd);
    const xausmk = Number(
      xaus * ((xau / 31.1025) * 0.425 * 1.03).toFixed(5)
    ).toFixed(0);
    setXausmk(xausmk);
    const usdmtousdt = Number(closeprice / gcsusdm).toFixed(5);
    setUsdmtousdt(usdmtousdt);
    const usdmmk = 755030 * closeprice;
    setUsdmMarketcap(usdmmk);
    const xaustogcs = (((xau / 31.1025) * 0.425 * 1.03) / gcstousd).toFixed(5);
    setXausGcs(xaustogcs);
    const xaustousdm = Number(((xau / 31.1025) * 0.425 * 1.03)/(3 / btwo)).toFixed(5)
    setXaustousdm(xaustousdm);
  };

  const [user, setUser] = useState();
  const [acount, setAccount] = useState();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await Metamask();
      }
      const id = await GetChainId();
      console.log(id);
      if (Number(id) != 56) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x38" }], // chainId must be in hexadecimal numbers
        });
      }
    };

    init();
  }, []);

  const Metamask = async () => {
    await login();
    const add = await getUserAddress();
    console.log("Metamask", add);
    setAccount(add);
  };

  const Dissconnect = async () => {
    setAccount(undefined);
  };

  try {
    window.ethereum.on("accountsChanged", function (accounts) {
      setAccount(accounts[0]);
    });
  } catch (error) {}

  try {
    window.ethereum.on("chainChanged", function (accounts) {
      window.location.reload();
    });
  } catch (error) {}

  return (
    <div className="App">
      {/* <<<<<<< Updated upstream
      <Navbar
        Metamask={Metamask}
        acount={acount}/>
        <Main gcsmaketcap={gcsmaketcap} gcstousd={gcstousd} gcsusdm={gcsusdm} xaustousd={xaustousd} xausmk={xausmk} usdmtousdt={usdmtousdt} usdmmarketcap={usdmmarketcap} xaustogcs={xaustogcs} xaustousdm={xaustousdm} account={acount}/>
        <Swap gcsusdm={gcsusdm} xaustousdm={xaustousdm} account={acount} xaustousd={xaustousd} />
      <Footer/>
======= */}
      <Router>
        <Navbar
          Metamask={Metamask}
          account={acount}
          contractadmin={contractadmin}
        />
        {/* <Main
          gcsmaketcap={gcsmaketcap}
          gcstousd={gcstousd}
          gcsusdm={gcsusdm}
          xaustousd={xaustousd}
          xausmk={xausmk}
          usdmtousdt={usdmtousdt}
          usdmmarketcap={usdmmarketcap}
          xaustogcs={xaustogcs}
          xaustousdm={xaustousdm}
          account={acount}
        />
        <Swap gcsusdm={gcsusdm} xaustousdm={xaustousdm} account={acount} xaustousd={xaustousd} /> */}

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                gcsmaketcap={gcsmaketcap}
                gcstousd={gcstousd}
                gcsusdm={gcsusdm}
                xaustousd={xaustousd}
                xausmk={xausmk}
                usdmtousdt={usdmtousdt}
                usdmmarketcap={usdmmarketcap}
                xaustogcs={xaustogcs}
                xaustousdm={xaustousdm}
                account={acount}
              />
            }
          />
          <Route
            path="/admin"
            element={<Admin account={acount} contractadmin={contractadmin} />}
          />
          <Route path="/create-level" element={<CreateLevel />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
