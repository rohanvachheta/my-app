import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { responseProps } from "../interfaces";
import styles from "../styles/Home.module.css";
import PageDetails from "./page-details";

interface Props {
  response?: responseProps;
  page?: number;
}

const Home: NextPage<Props> = ({ response, page: pageProps }) => {
  return <PageDetails response={response} page={pageProps} />;
};

Home.getInitialProps = async () => {
  const response = await fetch(
    "https://api.artic.edu/api/v1/exhibitions?page=1"
  );

  const responseData = await response.json();
  console.log(responseData, "testi");

  return { response: responseData, page: 1 };
};

export default Home;
