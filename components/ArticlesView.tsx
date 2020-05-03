import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import RView, { MediaRule, mergeRStyle } from "emotion-native-media-query";
import {
  STANFORD_COLORS,
  FONTS,
  COLORS,
  BREAKPOINTS,
  MORE_FROM_DAILY_POST_PER_PAGE,
} from "helpers/constants";
import { Post } from "helpers/wpapi";
import { SECTION_PADDING } from "components/Section";
import { TextOnlyArticle } from "components/pages/HomePage/TextOnlyArticle";
import { HeadlineArticle } from "./pages/HomePage/HeadlineArticle";

const EachArticleView: React.ElementType = ({
  children,
  style,
  rStyle = {},
  large = false,
}) => {
  return (
    <RView
      style={{
        width: "100%",
        flexGrow: large ? 4 : 1,
        flexShrink: 0,
        flexBasis: large ? "50%" : 250,
        marginLeft: SECTION_PADDING,
        marginRight: SECTION_PADDING,
        marginBottom: SECTION_PADDING,
        ...style,
      }}
      rStyle={mergeRStyle(
        {
          [MediaRule.MinWidth]: {
            [BREAKPOINTS.TABLET]: {
              minHeight: large ? 400 : 200,
            },
          },
        },
        rStyle,
      )}
    >
      {children}
    </RView>
  );
};

interface ArticlesViewProps {
  initPosts: Post[];
  getExtraPosts?: (pageNumber: number) => Promise<Post[]>;
  displayCategory?: boolean;
  displayLoadMore?: boolean;
  displayExcerpt?: boolean;
  displayDateAuthor?: boolean;
  hideCategory?: boolean;
  textColor?: string;

  // Whether the first article is enlarged / "featured". Currently
  // enabled only on category pages.
  enlargeFirstArticle?: boolean;
}

const ArticlesView: React.ElementType<ArticlesViewProps> = ({
  initPosts,
  getExtraPosts,
  displayCategory = true,
  displayLoadMore = true,
  displayExcerpt = true,
  displayDateAuthor = true,
  hideCategory = false,
  textColor = STANFORD_COLORS.BLACK,
  enlargeFirstArticle = false,
}: ArticlesViewProps) => {
  const [extraPosts, setExtraPosts]: [Post[], any] = React.useState([]);
  const [extraPageNumber, setExtraPageNumber]: [number, any] = React.useState(
    1,
  );
  const [loading, setLoading]: [boolean, any] = React.useState(false);
  const [allLoaded, setAllLoaded]: [boolean, any] = React.useState(
    initPosts.length < MORE_FROM_DAILY_POST_PER_PAGE,
  );

  const LoadMoreTag = Platform.OS === "web" ? "a" : View;
  let LoadMoreNativeColor = loading ? "black" : COLORS.LINK.DEFAULT;
  if (Platform.OS === "web") {
    LoadMoreNativeColor = loading ? "black" : "inherit";
  }
  return (
    <RView
      style={{
        flexWrap: "wrap",
        flexDirection: "row",
        // Offset the leftmost and rightmost articles' margin
        marginLeft: -SECTION_PADDING,
        marginRight: -SECTION_PADDING,
      }}
    >
      {initPosts.concat(extraPosts).map((post, i) => (
        <EachArticleView
          key={post.id}
          large={enlargeFirstArticle && i === 0 ? true : false}
        >
          {enlargeFirstArticle && i === 0 ? (
            <HeadlineArticle post={post} />
          ) : (
            <TextOnlyArticle
              post={post}
              displayCategory={hideCategory ? false : displayCategory}
              displayExcerpt={displayExcerpt}
              displayDateAuthor={displayDateAuthor}
              textColor={textColor}
            />
          )}
        </EachArticleView>
      ))}
      {[...Array(6)].map((value, index) => (
        // Make sure the last row of articles will not stretch.
        // https://jsfiddle.net/7yr86aow/3/
        // It has 6 elements because 1, 2, 3, 4, 6 are all factors of 6.
        <EachArticleView
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            height: 0,
            marginBottom: 0,
          }}
          rStyle={{
            [MediaRule.MinWidth]: {
              [BREAKPOINTS.TABLET]: {
                minHeight: 0,
              },
            },
          }}
        />
      ))}
      <LoadMoreTag
        style={{
          width: "100%",
          paddingLeft: SECTION_PADDING / 2,
          paddingRight: SECTION_PADDING / 2,
          ...(displayLoadMore || !allLoaded ? {} : { display: "none" }),
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 100,
            borderRadius: 5,
          }}
          disabled={loading}
          onPress={async () => {
            setLoading(true);
            const newPosts = await getExtraPosts(extraPageNumber + 1);
            if (newPosts.length < MORE_FROM_DAILY_POST_PER_PAGE) {
              setAllLoaded(true);
            }
            setExtraPosts(extraPosts.concat(newPosts));
            setExtraPageNumber(extraPageNumber + 1);
            setLoading(false);
          }}
        >
          <Text
            style={{
              ...FONTS.AUXILIARY,
              fontSize: 20,
              color: LoadMoreNativeColor,
            }}
          >
            {loading ? "Loading..." : "Load more"}
          </Text>
        </TouchableOpacity>
      </LoadMoreTag>
    </RView>
  );
};

export default ArticlesView;
