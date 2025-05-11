import { useEffect } from "react";

type LiqPayDonateProps = {
  data: string;
  signature: string;
};

const LiqPayDonate: React.FC<LiqPayDonateProps> = ({ data, signature }) => {
  useEffect(() => {
    window.onerror = (message, source, lineno, colno, error) => {
      console.error("Error caught:", message, source, lineno, colno, error);
    };

    const script = document.createElement("script");
    script.src = "https://static.liqpay.ua/libjs/checkout.js";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // @ts-expect-error: LiqPayCheckout isn't recognized by Typescript
      if (window.LiqPayCheckout) {
        // @ts-expect-error: LiqPayCheckout isn't recognized by Typescript
        window.LiqPayCheckout.init({
          data,
          signature,
          embedTo: "#liqpay_checkout",
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
      document.body.removeChild(script);
      // @ts-expect-error: LiqPayCheckout isn't recognized by Typescript
      delete window.LiqPayCheckoutCallback;
    };
  }, [data, signature]);

  return <div id="liqpay_checkout"></div>;
};

export default LiqPayDonate;
