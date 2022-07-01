import { useEffect, useState } from "react";
import { getItems, items } from "../../../api/Firebase";
import { Card } from "../../components/Card/Card";
import { Layout } from "../../layouts/Layout";
import { Navbar } from "../../modules/Navbar/Navbar";
import css from "./LandingPage.module.css";

export const LandingPage = () => {
  const [data, setData] = useState({
    author: "",
    word: "",
    description: "",
  });
  const [refreshingLoader, setRefreshingLoader] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await setLoader(true);
      await getItems();
    };

    fetchData()
      .catch(console.error)
      .then(() => {
        setLoader(false);
      });
  }, []);
  const handleClick = async () => {
    setData(items[Math.floor(Math.random() * items.length)]);
  };

  return (
    <Layout>
      <Navbar />
      <Card>
        <h1 className={css.title}>Get random word</h1>
        {loader === true && refreshingLoader === false && <p>Loading...</p>}
        {loader === false && refreshingLoader === false && (
          <div className={css.container}>
            <button onClick={handleClick} className={css.btn}>
              Get
            </button>
            {data.word === "" && (
              <h1>
                <span className={css.randomWord}>Random word</span>
              </h1>
            )}
            {data.word !== "" && (
              <h1>
                <span className={css.randomWord}>{data.word}</span>
              </h1>
            )}
            {data.author === "" && (
              <h2>
                Created by: <span>Author of the random word</span>
              </h2>
            )}
            <details>
              <summary>Description</summary>
              {data.description === "" && <p>No description</p>}
              {!data.description && data.description !== "" && (
                <p>No description</p>
              )}
              {data.description && <p>{data.description}</p>}
            </details>
            {data.author !== "" && (
              <h2>
                Created by: <span>{data.author}</span>
              </h2>
            )}
            <h2>Number of words: {items.length}</h2>
            <button
              className={css.btn}
              onClick={async () => {
                await setRefreshingLoader(true);
                location.reload();
              }}
            >
              Refresh
            </button>
          </div>
        )}

        {refreshingLoader === true && <p>Refreshing...</p>}
        <p>by: 21st Century</p>
      </Card>
    </Layout>
  );
};
