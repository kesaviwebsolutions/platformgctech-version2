import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./compnents/Navbar";
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  XAUs_Totak_Supply,
  USDM_Totak_Supply,
  GCS_Totak_Supply,
  login,
  GetChainId,
  getUserAddress,
  getAdmin,
  DissconnectWallet
} from "./Web3/Web3";
import axios from "axios";
import Footer from "./compnents/Footer";
import Admin from "./compnents/pages/Admin";
import Home from "./compnents/pages/Home";
import "./App.css";
import CreateLevel from "./compnents/pages/CreateLevel.tsx";
import Referralid from "./compnents/pages/Referralid.tsx";
import Secondlevel from "./compnents/pages/Secondlevel.tsx"
import StakingTable from "./compnents/StakingTable";
import Staking from "./compnents/pages/StakingNav.tsx";
import PersonalReferralId from "./compnents/pages/PersonalReferralId.tsx";
import { poeldata1, poeldata2, poeldata3, poeldata4 } from "./Web3/Web3"
import Pool from "./compnents/pages/Addpool";
import SeeLevel from "./compnents/pages/SeeLevel";
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
          // console.log(response.data[0].price);
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

  const [day1, setDay1] = useState();
  const [day2, setDay2] = useState(0);
  const [day3, setDay3] = useState(0);
  const [day4, setDay4] = useState(0);

  useEffect(()=>{
    const init=async()=>{
      const fday = await poeldata1();
      setDay1(fday[1]/100)
      const sday = await poeldata2()
      setDay2(sday[1]/100)
      const tday = await poeldata3()
      setDay3(tday[1]/100)
      const frday = await poeldata4()
      setDay4(frday[1]/100)
    }
    init();
  })
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
    const xaustousdm = Number(
      ((xau / 31.1025) * 0.425 * 1.03) / (3 / btwo)
    ).toFixed(5);
    setXaustousdm(xaustousdm);
  };

  const [acount, setAccount] = useState();

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        await Metamask();
      }
      const id = await GetChainId();
      console.log("Chain ID is ",id);
      if (Number(id) != 5) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x5" }], // chainId must be in hexadecimal numbers
        });
      }
    };

    init();
  }, []);

  const Metamask = async () => {
    await login();
    const add = await getUserAddress();
    
    setAccount(add);
  };

  const Dissconnect = async () => {
    await DissconnectWallet();
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
  useEffect(() => {});
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
          Dissconnect={Dissconnect}
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
          <Route path="/staking" element={<Staking account={acount} aday1={day1} aday2={day2} aday3={day3} aday4={day4}/>} />
          <Route path="/staking/:ID" element={<Staking account={acount} aday1={day1} aday2={day2} aday3={day3} aday4={day4}/>} />
          <Route path="/admin/referral-second/:secondref"element={<Secondlevel account={acount} aday1={day1} aday2={day2} aday3={day3} aday4={day4}/>}
          />
          <Route
            path="/admin/staker's-detail"
            element={<StakingTable account={acount} aday1={day1} aday2={day2} aday3={day3} aday4={day4}/>}
          />
           <Route
            path="/admin/pool"
            element={<Pool account={acount} aday1={day1} aday2={day2} aday3={day3} aday4={day4}/>}
          />
          <Route
            exact
            path="/admin/referral-id/:ref/:poodid"
            element={<Referralid account={acount} aday1={day1} aday2={day2} aday3={day3} aday4={day4}/>}
          />
          <Route
            exact
            path="/admin/000xxxx2323245"
            element={<PersonalReferralId />}
          />
          <Route exact path="/admin/create-level" element={<CreateLevel account={acount} />} />
          <Route exact path="/admin/see-level" element={<SeeLevel />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
