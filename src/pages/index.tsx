import type { NextPage } from "next";
import Head from "next/head";
import { LandingPage } from "../ui/templates/LandingPage/LandingPage";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Generate and create your own RANDOM words"
        />
        <title>Random word generator</title>
      </Head>
      <LandingPage />
    </>
  );
};

export default Home;
