import React from "react";
import QRCode from "qrcode.react";
import utilStyles from "../src/styles/utils.module.scss";
import PropTypes from "prop-types";

interface QRCodeGeneratorProps {
  url?: string; // '?' makes the 'url' prop optional, as it may be undefined.
  className: string;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ url, className }) => {
  const qrCodeValue = url || ""; // Use an empty string if 'url' is undefined

  return (
    <div className={utilStyles.flexCenter}>
      <QRCode value={qrCodeValue} className={utilStyles[className]} />
    </div>
  );
};

export default QRCodeGenerator;

QRCodeGenerator.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string.isRequired,
};
