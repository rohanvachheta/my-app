import type { NextPage } from "next";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NextNProgress from "nextjs-progressbar";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { DataEntity, responseProps } from "../interfaces";

interface Props {
  response?: responseProps;
  page?: number;
}

const PageDetails: NextPage<Props> = ({ response, page: pageProps }) => {
  const [data, setData] = useState([...(response?.data || [])]);
  const [page, setPage] = useState(pageProps || 1);
  const [hasMaxPageReached, setHasMaxPageReached] = useState(false);

  const apiCall = async (apiPage: number) => {
    const response = await fetch(
      "https://api.artic.edu/api/v1/exhibitions?page=" + apiPage
    );
    const responseData = await response.json();
    setHasMaxPageReached(
      responseData.pagination.current_page ===
        responseData.pagination.total_pages
    );

    setData((prevda) => {
      return [...prevda, ...responseData.data];
    });
  };

  const callNext = async () => {
    setPage(page + 1);
    apiCall(page + 1);
  };

  return (
    <div>
      <NextNProgress
        color="#29D"
        startPosition={0.3}
        stopDelayMs={200}
        height={4}
        showOnShallow={true}
      />

      <div className={styles.header}>Exhibitions</div>

      <InfiniteScroll
        dataLength={data.length}
        next={callNext}
        hasMore={!hasMaxPageReached}
        loader={<h3 style={{ textAlign: "center" }}> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <div className={styles.grid}>
          {data.map((item: DataEntity) => (
            <div key={item.id}>
              <Link href={`/page-details/${item.id}`}>
                <div className={styles.card}>
                  <div>
                    {/* lorem image url */}
                    <img
                      src={item.image_url}
                      alt="card-img"
                      className={styles.cardImage}
                    />
                  </div>
                  <div className={styles.cardTitle}>{item.title}</div>
                  <div className={styles.cardDate}>
                    {new Date(item.aic_start_at || "").toLocaleDateString(
                      "en-US"
                    )}{" "}
                    -{" "}
                    {new Date(item.aic_end_at || "").toLocaleDateString(
                      "en-US"
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default PageDetails;
