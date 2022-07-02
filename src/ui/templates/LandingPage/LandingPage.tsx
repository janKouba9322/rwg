import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getItems, items } from "../../../api/Firebase";
import { Card } from "../../components/Card/Card";
import { Layout } from "../../layouts/Layout";
import { Navbar } from "../../modules/Navbar/Navbar";
import css from "./LandingPage.module.css";

export const LandingPage = () => {
  const [data, setData] = useState({
    author: "",
    word: "",
    description: "Some people add a description to their words. Try it too :)",
  });

  const [loader, setLoader] = useState(true);
  const [messages, setMessages] = useState("Loading...");
  const fetchData = async () => {
    await setMessages("Loading...");
    await setLoader(true);
    await getItems();
    if (items.length === 0) {
      setTimeout(() => {
        setMessages("Low wifi, can not fetch data from server");
      }, 5000);
    }
    if (items.length !== 0) {
      setLoader(false);
    }
  };
  useEffect(() => {
    fetchData().catch();
  }, [useRouter()]);
  const handleClick = async () => {
    await setData(items[Math.floor(Math.random() * items.length)]);
  };

  return (
    <Layout>
      <Navbar />
      <Card>
        <h1 className={css.title}>Get random word</h1>
        {loader === true && <p>{messages}</p>}
        {loader === false && (
          <div className={css.container}>
            <button onClick={handleClick} className={css.btn}>
              Get
            </button>
            {data && data.word === "" && (
              <h1>
                <span className={css.randomWord}>Random word</span>
              </h1>
            )}
            {data && data.word !== "" && (
              <h1>
                <span translate="no" className={css.randomWord}>
                  {data.word}
                </span>
              </h1>
            )}
            {data && data.author === "" && (
              <h2>
                Created by: <span>Author of the random word</span>
              </h2>
            )}
            <details>
              <summary>Description</summary>
              <div className={css.descriptionBox}>
                {data && data.description === "" && <p>No description</p>}
                {data && !data.description && data.description !== "" && (
                  <p>No description</p>
                )}
                {data && data.description && (
                  <p className={css.description}>{data.description}</p>
                )}
              </div>
            </details>
            {data && data.author !== "" && (
              <h2>
                Created by: <span translate="no">{data.author}</span>
              </h2>
            )}
            <h2>Number of words: {items.length}</h2>
            <button
              className={css.btn}
              onClick={async () => {
                await fetchData().catch();
                setData({
                  author: "",
                  word: "",
                  description:
                    "Some people add a description to their words. Try it too :)",
                });
              }}
            >
              Refresh
            </button>
          </div>
        )}
        {messages === "Low wifi, can not fetch data from server" && (
          <button
            className={css.btn}
            onClick={() => {
              fetchData().catch();
            }}
          >
            Try again
          </button>
        )}
        <p>
          by: <span translate="no">21st Century</span>
        </p>
      </Card>
    </Layout>
  );
};
