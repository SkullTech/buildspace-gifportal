import React, { useState, useEffect } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import "./App.css";
import { render } from "@testing-library/react";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIFS = [
  "https://media.giphy.com/media/VLljKzBZ2uPfYDpsNV/giphy.gif",
  "https://media.giphy.com/media/6ooljphNL0kTA7ppZH/giphy.gif",
  "https://media.giphy.com/media/wLnzickMaEJgdHzTCp/giphy.gif",
];

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputUrl, setInputUrl] = useState("");
  const [gifList, setGifList] = useState([]);

  const connectWallet = async () => {
    try {
      const { solana } = window;
      const response = await solana.connect();
      setWalletAddress(response.publicKey.toString());
      console.log("Connected with public key:", response.publicKey.toString());
    } catch (err) {
      console.log(err);
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const sendGif = async () => {
    console.log(inputUrl);
  };

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendGif();
        }}
      >
        <input
          type="text"
          placeholder="Enter gif link!"
          value={inputUrl}
          onChange={(event) => {
            setInputUrl(event.target.value);
          }}
        />
        <button type="submit" className="cta-button submit-gif-button">
          Submit
        </button>
      </form>
      <div className="gif-grid">
        {TEST_GIFS.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  const checkIfWalletIsConnected = async () => {
    try {
      const isPhantomInstalled = window.solana && window.solana.isPhantom;
      if (!isPhantomInstalled) {
        console.log("No Phantom found. Ngmi.");
      }
      const { solana } = window;
      if (solana.isConnected) {
        setWalletAddress(solana.publicKey.toString());
      } else {
        const response = await solana.connect({ onlyIfTrusted: true });
        setWalletAddress(response.publicKey.toString());
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
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
