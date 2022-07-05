import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { db, getItems, items } from "../../../api/Firebase";
import { Layout } from "../../layouts/Layout";
import css from "./AddingWord.module.css";

export const AddingWord = () => {
  const [newWord, setNewWord] = useState("");
  const router = useRouter();
  const [messages, setMessages] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [creatingLoader, setCreatingLoader] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const numberOfWords = items.length;

  useEffect(() => {
    if (newWord.length >= 50) {
      setMessages("the maximum number of characters in a word is 50");
    }
  }, [newWord]);
  useEffect(() => {
    if (newAuthor.length >= 30) {
      setMessages("max characters in a nick is 30");
    }
  }, [newAuthor]);
  useEffect(() => {
    if (newDescription.length >= 1000) {
      setMessages("max characters in a description is 1000");
    }
  }, [newDescription]);

  const addDoc = async () => {
    setMessages("");
    await setCreatingLoader(true);
    for (let i = 0; i < numberOfWords; i++) {
      await items.pop();
    }
    await getItems();
    if (items.length === 0) {
      return setTimeout(() => {
        setMessages("Creating failed, try better WIFI");
        setCreatingLoader(false);
      }, 3000);
    }
    if (newWord === "") {
      setMessages("Your word has no letters! This is not how it works!");
      return setCreatingLoader(false);
    }
    if (newAuthor.trim() === "") {
      setMessages("Your nick also needs letters");
      return setCreatingLoader(false);
    }

    for (let i = 0; i < items.length; i++) {
      if (newWord.toLowerCase() === items[i].word.toLowerCase()) {
        setCreatingLoader(false);
        return setMessages("This word already exists");
      }
    }
    if (newAuthor !== "") {
      await setNewAuthor(newAuthor.trim);
    }
    if (newWord !== "" && newAuthor !== "") {
      await setDoc(doc(db, "words", `${newWord}`), {
        word: newWord,
        author: newAuthor,
        description: newDescription.trim(),
        id: uuidv4(),
      });
      setNewWord("");
      setNewAuthor("");
      await setCreatingLoader(true);
    }

    if (newWord !== "" && newAuthor !== "") {
      await router.push("/");
    }
  };
  return (
    <>
      <Link href="/">
        <button className={css.backButton}>Back</button>
      </Link>
      <Layout>
        <div className={css.container}>
          <h1 className={css.title}>Create new word</h1>
          <input
            type="text"
            value={newWord}
            onChange={(e) => {
              setNewWord(e.target.value.replace(/\s/g, ""));

              setMessages("");
            }}
            maxLength={50}
            id="wordInput"
            placeholder="type word you wanna create"
            onKeyUp={(e) =>
              e.code === "Space" &&
              setMessages("have you ever seen a gap in a word?")
            }
            className={css.input}
          />

          <input
            className={css.input}
            value={newAuthor}
            placeholder="your nickname..."
            onChange={(e) => {
              setNewAuthor(e.target.value);
              setMessages("");
            }}
            onKeyPress={(e) => e.key === "Enter" && addDoc()}
            maxLength={30}
          />
          <textarea
            placeholder="description (not necessary)"
            className={css.description}
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
            maxLength={1000}
          />
          <p>{newDescription.length}/1000</p>
          <br />
          <button onClick={() => addDoc()} className={css.addWordButton}>
            create word
          </button>
          {messages !== "" && (
            <div className={css.messageBox}>
              <i
                className="material-icons"
                style={{ color: "#EF4444" }}
                translate="no"
              >
                error
              </i>
              <h3 className={css.messages}>{messages}</h3>
            </div>
          )}
          {creatingLoader === true && <p>Creating...</p>}
        </div>
      </Layout>
    </>
  );
};
