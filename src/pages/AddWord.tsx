import Head from "next/head";
import { AddingWord } from "../ui/templates/AddingWord/AddingWord";

const AddWord = () => {
  return (
    <>
      <Head>
        <title>Random word generator || Create word</title>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <AddingWord />
    </>
  );
};
export default AddWord;
