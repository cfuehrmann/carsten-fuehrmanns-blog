import "../styles/katex.min.css";
import "../styles/w3.css";

import { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
