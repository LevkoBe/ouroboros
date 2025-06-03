import React, { useEffect } from "react";
import styles from "./LiqPayPopup.module.css";
import Popup from "@/components/Popup/Popup";

type LiqPayPopupProps = {
  data: string;
  signature: string;
  onClose: () => void;
};

const LiqPayPopup: React.FC<LiqPayPopupProps> = ({
  data,
  signature,
  onClose,
}) => {
  useEffect(() => {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Error caught:", message, source, lineno, colno, error);
    };

    const script = document.createElement("script");
    script.src = "https://static.liqpay.ua/libjs/checkout.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      document.getElementById("liqpay_checkout_popup")!.innerHTML = "";

      // @ts-expect-error: LiqPayCheckout isn't recognized by Typescript
      if (window.LiqPayCheckout) {
        // @ts-expect-error: LiqPayCheckout isn't recognized by Typescript
        window.LiqPayCheckout.init({
          data,
          signature,
          embedTo: "#liqpay_checkout_popup",
          mode: "embed",
        })
          .on("liqpay.callback", function (data: unknown) {
            console.log("Payment callback", data);
          })
          .on("liqpay.ready", function () {
            console.log("LiqPay widget ready");
          })
          .on("liqpay.close", function () {
            console.log("LiqPay widget closed");
            onClose();
          });
      } else {
        console.error("LiqPayCheckout script is not loaded properly.");
      }
    };

    script.onerror = () => {
      console.error("Failed to load LiqPay script.");
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      // @ts-expect-error: LiqPayCheckout isn't recognized by Typescript
      delete window.LiqPayCheckoutCallback;
    };
  }, [data, signature, onClose]);

  return (
    <Popup onClose={onClose}>
      <div id="liqpay_checkout_popup" className={styles.liqpayContainer}></div>
    </Popup>
  );
};

export default LiqPayPopup;
