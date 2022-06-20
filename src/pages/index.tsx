import type { NextPage } from "next";
import Head from "next/head";
import { LandingPge } from "../ui/templates/LandingPge";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="description" content="RANDOM" />
      </Head>
      <LandingPge />
    </>
  );
};

export default Home;
