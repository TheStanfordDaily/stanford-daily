import React from "react";
import { Text, View, Image } from "react-native";
import { Global } from "@emotion/core";
import RView, { MediaRule } from "emotion-native-media-query";
import LogoFacebook from "react-ionicons/lib/LogoFacebook";
import LogoTwitter from "react-ionicons/lib/LogoTwitter";
import LogoInstagram from "react-ionicons/lib/LogoInstagram";
import LogoYoutube from "react-ionicons/lib/LogoYoutube";
import { BREAKPOINTS, STANFORD_COLORS, FONTS, LINKS } from "helpers/constants";
import { SectionStyle } from "components/Section";
import Link from "../../Link";

export interface SmallSectionProps {
  url: string;
  imageUrl: string;
  header: string;
  title: string;
  newTab?: boolean;
}

export const TopSection: React.ElementType = ({ style }) => {
  const SmallSection: React.ElementType<SmallSectionProps> = ({
    url,
    imageUrl,
    header,
    title,
    newTab,
  }) => {
    const additionalPropsForA: any = {};
    if (newTab) {
      additionalPropsForA.target = "_blank";
    }

    return (
      <a href={url} title={title} {...additionalPropsForA}>
        <View
          style={{
            marginRight: 30,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            resizeMode="cover"
            style={{
              width: 50,
              height: 50,
            }}
            source={{
              uri: imageUrl,
            }}
          />
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <View>
              <Text
                style={{
                  ...FONTS.AUXILIARY,
                  color: STANFORD_COLORS.CARDINAL_DARK_RED,
                  fontSize: 12,
                }}
              >
                {header}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >
                {title}
              </Text>
            </View>
            {/* <View>
            <Text>Subtitle here lorem</Text>
          </View> */}
          </View>
        </View>
      </a>
    );
  };
  const LogoIconWithLink: React.ElementType = ({ url, LogoComponent }: any) => (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        marginRight: 20,
      }}
    >
      <LogoComponent className="headerLogoIcon" fontSize="25px" />
    </a>
  );

  const TextButtonWithLink: React.ElementType = ({
    url,
    urlFile = "/[year]/",
    title,
    tbwlStyle,
  }: any) => (
    <Link href={urlFile} as={url}>
      <a
        title={title}
        style={{
          ...FONTS.AUXILIARY,
          color: STANFORD_COLORS.CARDINAL_RED,
          border: `2px ${STANFORD_COLORS.CARDINAL_RED} solid`,
          fontSize: 14,
          letterSpacing: 1.5,
          padding: 8,
          ...tbwlStyle,
        }}
      >
        {title}
      </a>
    </Link>
  );

  return (
    <RView
      style={{ ...style }}
      rStyle={{
        [MediaRule.MaxWidth]: {
          [BREAKPOINTS.MAX_WIDTH.DESKTOP]: {
            display: "none",
          },
        },
      }}
    >
      <SectionStyle style={{ paddingTop: 10, paddingBottom: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SmallSection
              url={LINKS.ISSUU}
              imageUrl={LINKS.ISSUU_LOGO}
              header="Newspaper & Magazine"
              title="Read the Print Issues"
              newTab
            />
            {/* <SmallSection
              imageUrl="https://www.stanforddaily.com/wp-content/uploads/2018/10/Stanford_School_of_Medicine_Li_Ka_Shing_Center.jpg"
              header="Issue #"
              title="The Daily Magazine"
            /> */}
            <SmallSection
              url="/category/podcasts/"
              imageUrl={LINKS.DAILY_BREW_LOGO}
              header="Podcasts"
              title="The Daily Brew & More"
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Global
              styles={{
                ".headerLogoIcon": {
                  fill: STANFORD_COLORS.CARDINAL_RED,
                  "&:hover": {
                    fill: STANFORD_COLORS.BLACK,
                  },
                },
              }}
            />
            <LogoIconWithLink
              url={LINKS.FACEBOOK}
              LogoComponent={LogoFacebook}
            />
            <LogoIconWithLink url={LINKS.TWITTER} LogoComponent={LogoTwitter} />
            <LogoIconWithLink
              url={LINKS.INSTAGRAM}
              LogoComponent={LogoInstagram}
            />
            <LogoIconWithLink url={LINKS.YOUTUBE} LogoComponent={LogoYoutube} />
            <TextButtonWithLink
              url="/tips/"
              title="Send Tips"
              tbwlStyle={{
                marginRight: 15,
              }}
            />
            <TextButtonWithLink url="/email-digests/" title="Email Digest" />
          </View>
        </View>
      </SectionStyle>
    </RView>
  );
};
