import Link from "next/link";
import styles from "../../styles/Home.module.css";

const Post = ({ response }) => {
  const header = (
    <>
      <div className={styles.header}>Exhibitions</div>
      <Link href={"/"}>
        <div className={styles.linkBtn}>
          <span>&#8592;</span>
          Back
        </div>
      </Link>
    </>
  );
  if (!response.data) {
    return (
      <div>
        {header}

        <div className={styles.noPageFound}>Page not found</div>
      </div>
    );
  }
  return (
    <div>
      {header}

      <div className={styles.container}>
        <header className={styles.headRoot}>
          <h3 className={styles.title}>{response.data.title}</h3>
          <span className={styles.metaInfo}>
            {new Date(response.data.aic_start_at || "").toLocaleDateString(
              "en-US"
            )}{" "}
            -{" "}
            {new Date(response.data.aic_end_at || "").toLocaleDateString(
              "en-US"
            )}
          </span>
        </header>

        <div className={styles.pageDetails}>
          <div className={styles.pageDetailsImage}>
            <img src={response.data.image_url} alt="card-img" />
          </div>

          <div className={styles.pageDetailsDesc}>
            {response.data.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

Post.getInitialProps = async ({ query }) => {
  const response = await fetch(
    "https://api.artic.edu/api/v1/exhibitions/" + query.id
  );
  const responseData = await response.json();

  return { response: responseData, page: 1 };
};
