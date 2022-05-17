import Head from 'next/head';

import Search from '@/components/Seach';

import styles from '../../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search</title>
        <meta name="description" content="This is a task completion site" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Search />
      </main>

      <footer className={styles.footer}>{/* add footer here */}</footer>
    </div>
  );
}
