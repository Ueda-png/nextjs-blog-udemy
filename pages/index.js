import Image from "next/image";
import Layout, { siteTitle } from "../components/Layout";
import styles from "../styles/Home.module.css";

import Link from "next/link";
import { getPostsData } from "../lib/post";
import utilStyle from "../styles/utils.module.css";
import Head from "next/head";

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); //id,title,date,thumbnail

  return {
    props: {
      allPostsData,
    },
  };
}

//SSRの場合
// export async function getServerSideProps(context){
//   return {
//     props: {
//       //コンポーネントに渡すprops
//     },
//   };
// }

export default function Home({ allPostsData }) {
  return (
    <Layout home>
<Head>
<title>{siteTitle}</title>
</Head>
      <section className={utilStyle.headingMd}>
        <p>私はただいまNext.jsを勉強中です。他にもいろいろと勉強中です。</p>
      </section>
      <section className={`${utilStyle.headingMd} ${utilStyle.padding1px}`}>
        <h2>✍エンジニアのブログ</h2>
        <div className={styles.grid}>
{allPostsData.map(({id,title,date,thumbnail})=>(
  <article key={id}>
            <Link href={`/posts/${id}`}>
              <img
                src={`${thumbnail}`}
                className={styles.thumbnailImage}
              />
            </Link>
            <Link href={`/posts/${id}`}>
<>
                <a className={utilStyle.boldText}>
                  {title}
                </a>
</>
            </Link>
            <br />
            <small className={utilStyle.lightText}>{date}</small>
          </article>
))}
        </div>
      </section>
    </Layout>
  );
}
