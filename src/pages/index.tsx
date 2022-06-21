import type { NextPage } from "next";
import Head from "next/head";
import { LandingPge } from "../ui/templates/LandingPge";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Generate and create your own RANDOM words"
        />
        <title>Random word generator</title>
      </Head>
      <LandingPge />
    </>
  );
};

export default Home;
