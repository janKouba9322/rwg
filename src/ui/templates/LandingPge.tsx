import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, getItems, items } from "../../api/Firebase";
import { Card } from "../components/Card/Card";
import { Layout } from "../layouts/Layout";
import css from "./LandingPage.module.css";

export const LandingPge = () => {
  const [data, setData] = useState("");
  const [newWord, setNewWord] = useState("");
  const [loader, setLoader] = useState(false);
  const [messages, setMessages] = useState("");
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
    setData(`${items[Math.floor(Math.random() * items.length)]}`);
    setMessages("");
    console.log(items);
  };
  //do
  return (
    <Layout>
      <Card>
        <h1>Get random word</h1>
        {loader === true && <p>Loading...</p>}
        {loader === false && (
          <>
            <button onClick={handleClick}>get</button>
            <h1>{data}</h1>
            <input
              type="search"
              value={newWord}
              onChange={(e) => {
                setNewWord(e.target.value.trim());
                if (newWord.length >= 50) {
                  setMessages("max number characters is 50");
                } else {
                  setMessages("");
                }
              }}
              maxLength={51}
              id="wordInput"
              placeholder="type word you wanna create"
            ></input>
            <br />
            <button
              onClick={async () => {
                if (newWord !== "") {
                  await setDoc(doc(db, "words", `${newWord}`), {
                    word: newWord,
                    id: uuidv4(),
                  });

                  setNewWord("");
                  location.reload();
                } else {
                  setMessages("No letters!");
                }
              }}
            >
              create word
            </button>
            <h2>Number of words: {items.length}</h2>
            <h3 className={css.messages}>{messages}</h3>
          </>
        )}
        <p>by: 21st Century</p>
      </Card>
    </Layout>
  );
};
