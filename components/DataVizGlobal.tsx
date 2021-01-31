import React from "react";
import Head from "next/head";

import { Global } from "@emotion/core";
import { COLORS } from "helpers/constants";

// Mentions humor here cause it also has unique styling done similarly
const HumorGlobal: React.ElementType = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Global
        styles={{
          "#tsd-navbar, #site-footer": {
            backgroundColor: COLORS.DATA_RED,
          },
          ".tsd-article h2, .tsd-article a, .tsd-article time, #main-article-content": {
            fontFamily: "'Roboto', sans-serif !important",
          },
          ".tsd-article": {
            // backgroundColor: "#fee",
            // borderRadius: "10px",
            // padding: "24px",
          },
          ".small-section": {
            display: "none",
          },
          ".small-section.small-section-sodp, .small-section.small-section-issuu": {
            display: "block",
          },
          ".section-title": {
            // Remove "Data Viz" title at top
            display: "none !important",
          },
          "#tsd-logo": {
            display: "none !important",
          },
          "#tsd-logo-dataviz": {
            display: "flex !important",
            marginLeft: -15,
          },
          "#tsd-logo-dataviz div": {
            fontFamily: "'Roboto', sans-serif !important",
            position: "absolute",
            top: 0,
          },
        }}
      />
    </>
  );
};

export default HumorGlobal;
