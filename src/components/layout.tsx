import React, { ReactNode } from 'react';
import Head from 'next/head';
import styles from './layout.module.scss';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Button } from "react-bootstrap";

interface LayoutProps {
  children: ReactNode;
  title: ReactNode;
  logo: string;
  subTitle?: string;
  topSubTitle?: string;
  showFeedback?: boolean;
  showOptOut?: boolean;
  showABN?: boolean;
}

export default function Layout({ children, title, subTitle, logo, showFeedback, showOptOut, topSubTitle, showABN }: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
      </Head>
      <header>
        <div className={styles.headerTop}>
          <div className={styles.logoBox}>

            <a target="_blank" rel="noopener noreferrer" href="https://farrahsliquorcollective.com/">
              <Image src={logo} alt="logo" width={100} height={50} className={styles.logo} />
            </a>
            {
              showABN &&
              <div className={utilStyles.textSm}>
                ABN 92 637 607 517
              </div>
            }
          </div>
          <div>
            <div className={`${utilStyles.text} ${utilStyles.textCenter}`}>{topSubTitle}</div>
            <div className={utilStyles.headingLg}>{title}</div>
            <div className={`${utilStyles.textMd} ${utilStyles.textCenter}`}>
              {subTitle}
            </div>
          </div>
        </div>

      </header>
      <main className={styles.pageContainer}>{children}</main>
      <footer>
        {showFeedback &&
          <div className={` ${utilStyles.pB10px} ${utilStyles.textRight}`}>
            <Button
              variant="primary"
              className={utilStyles.button}
            >
              FEEDBACK
            </Button>
          </div>
        }
        {showOptOut &&
          <div className={` ${utilStyles.pB10px} ${utilStyles.textRight}`}>
            <Link href="/opt-out">
              <Button
                variant="primary"
                className={utilStyles.button}
              >
                <div className={utilStyles.textXs}>UNSUBSCRIBE</div>
                OPT OUT
              </Button>
            </Link>
          </div>
        }
        <div className={`${utilStyles.footerContainer} ${utilStyles.pT10px}`}>

          <div >
            <Link href="https://4block.com.au/">
              <span>www.4block.com.au </span>
            </Link>
            - Want to know more?
          </div>
          <div className={`${utilStyles.textSm} `}>
            Copyright © 2023 – All rights reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  logo: PropTypes.string.isRequired,
  topSubTitle: PropTypes.string,
  subTitle: PropTypes.string,
  showFeedback: PropTypes.bool,
  showOptOut: PropTypes.bool,
  showABN: PropTypes.bool,
};
