import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const urlsWithoutLayout = [
    "/auth/login",
    "/auth/register",
    "/auth/organization",
    "/auth/organization/createOrganization",
  ];

  return (
    <>
      {urlsWithoutLayout?.includes(router?.pathname) ? (
        <>
          <Component {...pageProps} />
          <ToastContainer />
        </>
      ) : (
        <>
          <Layout>
            <Component {...pageProps} />
            <ToastContainer />
          </Layout>
        </>
      )}
    </>
  );
}
