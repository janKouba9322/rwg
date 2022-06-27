import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, getItems, items } from "../../api/Firebase";
import { Card } from "../components/Card/Card";
import { Layout } from "../layouts/Layout";
import css from "./LandingPage.module.css";

export const LandingPge = () => {
  const [data, setData] = useState({
    author: "",
    word: "",
  });
  const [newWord, setNewWord] = useState("");
  const [loader, setLoader] = useState(true);
  const [messages, setMessages] = useState("");
  const [author, setAuthor] = useState("");
  const [creatingLoader, setCreatingLoader] = useState(false);
  useEffect(() => {
    if (newWord.length >= 50) {
      setMessages("the maximum number of characters in a word is 50");
    }
  }, [newWord]);
  useEffect(() => {
    if (author.length >= 30) {
      setMessages("the maximum number of characters in a nickname is 30");
    }
  }, [author]);

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
    setMessages("");
    console.log(items);
  };
  const addDoc = async () => {
    if (newWord !== "" && author !== "") {
      await setDoc(doc(db, "words", `${newWord}`), {
        word: newWord,
        author: author,
        id: uuidv4(),
      });
      setNewWord("");
      setAuthor("");
      await setCreatingLoader(true);
      location.reload();
    }
    if (author === "") {
      setMessages("Your nick also needs letters");
    }
    if (newWord === "") {
      setMessages("Your word has no letters! This is not how it works!");
    }
  };

  return (
    <Layout>
      <Card>
        <h1>Get random word</h1>
        {creatingLoader === false && loader === true && <p>Loading...</p>}
        {loader === false && creatingLoader === false && (
          <>
            <button onClick={handleClick}>get</button>
            {data.word !== "" && (
              <h1>
                <span>{data.word}</span>
              </h1>
            )}
            {data.author !== "" && (
              <h2>
                Created by: <span>{data.author}</span>
              </h2>
            )}

            <input
              type="text"
              value={newWord}
              onChange={(e) => {
                setNewWord(e.target.value.replace(/\s/g, ""));
                setNewWord(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                );
                setMessages("");
              }}
              onPaste={(e: any) => {
                e.preventDefault();
                setMessages("pasting disabled");
                return false;
              }}
              onKeyPress={(e) => e.key === "Enter" && addDoc()}
              maxLength={50}
              id="wordInput"
              placeholder="type word you wanna create"
              onKeyUp={(e) =>
                e.code === "Space" &&
                setMessages("have you ever seen a gap in a word?")
              }
            />

            <input
              value={author}
              placeholder="your nickname..."
              onChange={(e) => {
                setAuthor(e.target.value.trim());
                setMessages("");
              }}
              onKeyPress={(e) => e.key === "Enter" && addDoc()}
              maxLength={30}
            />
            <br />
            <button onClick={() => addDoc()}>create word</button>
            <h2>Number of words: {items.length}</h2>
            <h3 className={css.messages}>{messages}</h3>
          </>
        )}
        {creatingLoader === true && <p>Creating...</p>}
        <p>by: 21st Century</p>
      </Card>
    </Layout>
  );
};
