import React, {useEffect, useState} from 'react';
import './App.css';
import twitterLogo from './assets/twitter-logo.svg';
import WalletNotConnected from "./components/WalletNotConnected";
import WalletNotExists from "./components/WalletNotExists";
import WalletConnected from "./components/WalletConnected";

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletExists, setWalletExists] = useState(false);

  const checkIfWalletExists = () => {
    try {
      setWalletExists(window.solana);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.addEventListener('load', checkIfWalletExists);
    return () => window.removeEventListener('load', checkIfWalletExists);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🍭 Candy Drop</p>
          <p className="sub-text">NFT drop machine with fair mint</p>
          {
            walletExists ?
              (!walletAddress && <WalletNotConnected setWalletAddress={setWalletAddress}/>) :
              <WalletNotExists/>
          }
          {walletAddress && <WalletConnected walletAddress={walletAddress}/>}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo}/>
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
