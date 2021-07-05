import {
  centerContentStyle,
  centerOuterContentStyle,
} from "./Size1ContentViewStyles";
import { FONTS, STANFORD_COLORS } from "helpers/constants";
import { SECTION_PADDING } from "components/Section";

export default {
  "#main-article-content": {
    ...FONTS.CONTENT,
    marginTop: SECTION_PADDING,
    "#main-article-text2": {
      ...centerOuterContentStyle,
    },
    a: {
      textDecoration: "underline",
    },
    "p, h1, h2, h3, h4, h5, h6, li, figcaption": {
      ...centerContentStyle,
      marginBottom: "1em",
      fontSize: "2.4rem",
      color: STANFORD_COLORS.BLACK,
      lineHeight: "normal",
    },
    h1: {
      fontSize: "4.1rem",
    },
    h2: {
      fontSize: "3.5rem",
    },
    h3: {
      fontSize: "3rem",
    },
    h4: {
      fontSize: "2.7rem",
    },
    h5: {
      fontSize: "2.5rem",
    },
    h6: {
      fontSize: "2.4rem",
    },
    figcaption: {
      ...FONTS.AUXILIARY,
      textTransform: "none",
      textAlign: "right",
      marginTop: 5,
      color: STANFORD_COLORS.COOL_GREY,
      fontSize: "2.2rem",
      fontStyle: "italic",
    },
    figure: {
      margin: "0 auto",
      width: "initial !important",
      textAlign: "center",
      img: {
        ...centerOuterContentStyle,
        maxWidth: "100%",
        width: "100%",
        height: "auto",
      },
      "&#featured-image": {
        width: "100% !important",
      },
    },
    blockquote: {
      display: "flex !important",
      flexDirection: "column",
      justifyContent: "center !important",
      padding: "5px 0 0 0px !important",
      borderLeft: "3px solid #820000 !important",
      cite: {
        width: "350px !important",
        padding: "5px 0 0 0 !important",
        borderLeft: "3px solid #820000 !important",
        fontSize: "2.4em !important",
        textAlign: "center",
      },
      p: {
        fontSize: "2.7em !important",
        lineHeight: "normal",
        textAlign: "left",
        overflowWrap: "break-word",
        padding: "25px 25px 0 25px !important",
        backgroundImage: `url(${"../assets/pullquote.gif"})`,
        backgroundSize: "20%",
        backgroundRepeat: "no-repeat !important",
        "&::first-letter": {
          fontSize: "2.9em !important",
          fontWeight: "bold !important",
        },
      },
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "center",
      border: `1px solid ${STANFORD_COLORS.COOL_GREY}`,
      fontSize: "2.4rem",
    },
    td: {
      border: `1px solid ${STANFORD_COLORS.COOL_GREY}`,
      padding: "10px",
    },
  },
};
