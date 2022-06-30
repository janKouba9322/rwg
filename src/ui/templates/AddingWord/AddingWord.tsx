import { useEffect, useState } from "react";
import { doc, setDoc } from "@firebase/firestore";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../api/Firebase";
import { Layout } from "../../layouts/Layout";
import css from "./AddingWord.module.css";

export const AddingWord = () => {
  const [newWord, setNewWord] = useState("");

  const [messages, setMessages] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [creatingLoader, setCreatingLoader] = useState(false);

  useEffect(() => {
    if (newWord.length >= 50) {
      setMessages("the maximum number of characters in a word is 50");
    }
  }, [newWord]);
  useEffect(() => {
    if (newAuthor.length >= 30) {
      setMessages("max characters in a nick is 50");
    }
  }, [newAuthor]);

  const addDoc = async () => {
    if (newWord !== "" && newAuthor !== "") {
      await setDoc(doc(db, "words", `${newWord}`), {
        word: newWord,
        author: newAuthor,
        id: uuidv4(),
      });
      setNewWord("");
      setNewAuthor("");
      await setCreatingLoader(true);
      location.reload();
    }
    if (newAuthor === "") {
      setMessages("Your nick also needs letters");
    }
    if (newWord === "") {
      setMessages("Your word has no letters! This is not how it works!");
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
              setNewWord(
                e.target.value.replace(/\s/g, "").replace(/[^\w ]/g, "")
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
            className={css.input}
          />

          <input
            className={css.input}
            value={newAuthor}
            placeholder="your nickname..."
            onChange={(e) => {
              setNewAuthor(e.target.value.trim());
              setMessages("");
            }}
            onKeyPress={(e) => e.key === "Enter" && addDoc()}
            maxLength={30}
          />
          <textarea
            placeholder="description (zatim nefacha)"
            className={css.description}
          />
          <br />
          <Link href="/">
            <button onClick={() => addDoc()} className={css.addWordButton}>
              create word
            </button>
          </Link>
          {messages !== "" && (
            <div className={css.messageBox}>
              <i className="material-icons" style={{ color: "#EF4444" }}>
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