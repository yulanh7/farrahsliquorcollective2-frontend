import React, { ReactNode } from 'react';
import Head from 'next/head';
import styles from './layout.module.scss';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';

interface LayoutProps {
  children: ReactNode;
  title: ReactNode;
  logo: string;
}

export default function Layout({ children, title, logo }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <header className={styles.header}>
        <>
          <Link href="/" className={styles.logoBox}>
            <Image src={logo} alt="logo" width={100} height={50} className={styles.logo} />
          </Link>
          <h1 className={utilStyles.headingLg}>{title}</h1>
        </>
      </header>
      <main className={styles.pageContainer}>{children}</main>
      <footer className={`${utilStyles.footerContainer} ${utilStyles.pT10px}`}>
        <Link href="https://4block.com.au/">
          <div>www.4block.com.au</div>
        </Link>
        <div className={`${utilStyles.textSm} `}>
          Copyright © 2023 – All rights reserved
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  logo: PropTypes.string.isRequired,
};
