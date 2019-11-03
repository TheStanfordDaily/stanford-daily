import React from "react";
import { Text, ScrollView, Platform } from "react-native";
import { STANFORD_COLORS, FONTS, LINKS } from "helpers/constants";
import { Category } from "helpers/wpapi";
import { SECTION_PADDING } from "./Section";
import { CategoryLink } from "./CategoryLink";

enum LinkType {
  LINK,
  CATEGORY,
}

type CategoryLink = Category & {
  type: LinkType.CATEGORY;
};

type LinkLink = {
  type: LinkType.LINK;
  name: string;
  url: string;
};

export const CategoryList: React.ElementType = ({ itemStyle }: any) => {
  // https://www.stanforddaily.com/wp-json/tsd/json/v1/nav
  const categoryLinkList: (CategoryLink | LinkLink)[] = [
    {
      type: LinkType.CATEGORY,
      id: 3,
      name: "News",
      slug: "news",
      url: "/category/news/",
    },
    {
      type: LinkType.CATEGORY,
      id: 23,
      name: "Sports",
      slug: "sports",
      url: "/category/sports/",
    },
    // {
    //   type: LinkType.CATEGORY,
    //   id: 55043,
    //   name: "SPONSORED",
    //   slug: "sponsored",
    //   url: "/category/sponsored/",
    // },
    {
      type: LinkType.CATEGORY,
      id: 24,
      name: "Opinions",
      slug: "opinions",
      url: "/category/opinions/",
    },
    {
      type: LinkType.CATEGORY,
      id: 25,
      name: "Arts & Life",
      slug: "arts-life",
      url: "/category/arts-life/",
    },
    {
      type: LinkType.CATEGORY,
      id: 32278,
      name: "The Grind",
      slug: "thegrind",
      url: "/category/thegrind/",
    },
    {
      type: LinkType.CATEGORY,
      id: 55796,
      name: "Satire",
      slug: "satire",
      url: "/category/satire/",
    },
    // {
    //   type: LinkType.CATEGORY,
    //   id: 53462,
    //   name: "Magazine",
    //   slug: "magazine",
    //   url: "/category/magazine/",
    // },
    {
      type: LinkType.CATEGORY,
      id: 58277,
      name: "Data",
      slug: "data-vizzes",
      url: "/category/data-vizzes/",
    },
    // {
    //   type: LinkType.LINK,
    //   name: "Podcast",
    //   url: "/podcasts/",
    // } as LinkLink,
    {
      type: LinkType.LINK,
      name: "Video",
      url: LINKS.YOUTUBE,
    } as LinkLink,
    {
      type: LinkType.LINK,
      name: "Yearbook",
      url: "/yearbook/",
    } as LinkLink,
    {
      type: LinkType.LINK,
      name: "About Us",
      url: "/about/",
    } as LinkLink,
    {
      type: LinkType.LINK,
      name: "Advertising",
      url: "/advertise/",
    } as LinkLink,
    {
      type: LinkType.LINK,
      name: "Archives",
      url: LINKS.ARCHIVES,
    } as LinkLink,
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingLeft: SECTION_PADDING,
        paddingRight: SECTION_PADDING,
      }}
    >
      {categoryLinkList.map((item, i) => {
        const _itemStyle = {
          ...itemStyle,
        };
        if (i === categoryLinkList.length - 1) {
          _itemStyle.marginRight = 0;
        }
        // We have to add `paddingTop` and `paddingBottom` here instead of in `contentContainerStyle`
        // because if we do that, the letter will get cut off at the bottom.
        const actualStyle = {
          ...FONTS.AUXILIARY,
          color: STANFORD_COLORS.WHITE,
          marginRight: 30,
          paddingTop: SECTION_PADDING,
          paddingBottom: SECTION_PADDING,
          ..._itemStyle,
        };
        if (item.type === LinkType.CATEGORY) {
          const category = item as CategoryLink;
          return (
            <CategoryLink
              key={category.id}
              category={category}
              style={actualStyle}
            />
          );
        } else {
          const link = item as LinkLink;
          if (Platform.OS !== "web") {
            // TODO: OPEN PAGE IN WEBVIEW
            return <></>;
          }
          return (
            <Text style={actualStyle}>
              <a href={link.url} style={{ color: "inherit" }}>
                {link.name}
              </a>
            </Text>
          );
        }
      })}
    </ScrollView>
  );
};
