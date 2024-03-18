import React, { ReactNode, useState } from 'react';
import Head from 'next/head';
import styles from './layout.module.scss';
import utilStyles from '../styles/utils.module.scss';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { Button } from "react-bootstrap";
import FeedbackForm from "./feedback";
interface LayoutProps {
  children: ReactNode;
  title: ReactNode;
  logo: string;
  subTitle?: string;
  topSubTitle?: string;
  showFeedback?: boolean;
  showOptOut?: boolean;
  showABN?: boolean;
  width?: string;
}

export default function Layout({ children, title, subTitle, logo, showFeedback, showOptOut, topSubTitle, showABN, width }: LayoutProps) {
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const handleShowFeedbackModal = () => {
    setShowFeedbackModal(true);
  };

  const handleCloseFeedbackModal = () => {
    setShowFeedbackModal(false);
  };
  return (
    <div className={width == "lg" ? styles.containerLg : styles.container}>
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
              <Image src={logo} alt="logo" width={100} height={50} className={styles.logo} unoptimized />
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
            <h3>{title}</h3>
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
              onClick={handleShowFeedbackModal}
            >
              FEEDBACK
            </Button>
            <FeedbackForm show={showFeedbackModal} onHide={handleCloseFeedbackModal} />

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
            <Link href="https://4block.com.au/" target='_blank'>
              <span>www.4block.com.au </span>
            </Link>
            - Want to know more?
          </div>
          <div className={`${utilStyles.textSm} `}>
            ©2023 Farrahs Liquor Collective
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
  width: PropTypes.string,
  showFeedback: PropTypes.bool,
  showOptOut: PropTypes.bool,
  showABN: PropTypes.bool,
};
