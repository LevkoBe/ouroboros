import { useEffect } from "react";

type LiqPayDonateProps = {
  data: string;
  signature: string;
};

const LiqPayDonate: React.FC<LiqPayDonateProps> = ({ data, signature }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.liqpay.ua/libjs/checkout.js";
    script.async = true;
    script.defer = true;

    script.onload = () => {
      // @ts-expect-error: LiqPayCheckoutCallback is not defined on the window object by TypeScript
      window.LiqPayCheckoutCallback = function () {
        // @ts-expect-error: LiqPayCheckout is not recognized by TypeScript as it is dynamically loaded
        LiqPayCheckout.init({
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
      };
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      // @ts-expect-error: LiqPayCheckoutCallback is dynamically added to the window object
      delete window.LiqPayCheckoutCallback;
    };
  }, [data, signature]);

  return <div id="liqpay_checkout"></div>;
};

export default LiqPayDonate;
