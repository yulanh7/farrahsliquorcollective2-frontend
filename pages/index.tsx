import React, { useState, ChangeEvent } from "react";
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import QRCodeGenerator from "../utils/QRCodeUtils";
import Link from "next/link";


export default function Home() {
  const [referra, setReferra] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setReferra(event.target.value);
  };

  const newUrl = referra ? `/detail?referra=${referra}` : "/detail";

  return (
    <Layout title="WELCOME - OPT IN" logo="/images/logo.jpg">
      <h2
        className={`${utilStyles.headingMd} ${utilStyles.flexCenter} ${utilStyles.pB10px}`}
      >
        OPT IN OFFER TO REGISTER
      </h2>
      <QRCodeGenerator url={newUrl} className="qrcode40" />
      <p
        className={`${utilStyles.text} ${utilStyles.lightText} ${utilStyles.flexCenter} ${utilStyles.pT10px}`}
      >
        <span className={`${utilStyles.pR5px} ${utilStyles.darkText}`}>
          URL:
        </span>
        <Link href={newUrl}>
          Detail
        </Link>

      </p>
      <section className={utilStyles.flexCenter}>
        <span className={utilStyles.pR5px}>Reference: </span>
        <input type="text" value={referra} onChange={handleChange} />
      </section>
    </Layout>
  );
}
