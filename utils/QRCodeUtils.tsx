import React from "react";
import QRCode from "qrcode.react";
import utilStyles from "../src/styles/utils.module.scss";
import PropTypes from "prop-types";

const QRCodeGenerator = ({ url, className }) => {
  return (
    <div className={utilStyles.flexCenter}>
      <QRCode value={url} className={utilStyles[className]} />
    </div>
  );
};

export default QRCodeGenerator;

QRCodeGenerator.propTypes = {
  url: PropTypes.node.isRequired,
  className: PropTypes.node.isRequired,
};
