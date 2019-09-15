import React from "react";
import styled from "@emotion/native";
import RView from "emotion-native-media-query";
import { SectionStyle, SectionWithoutStyle } from "../../Section";
import { MainSection } from "./MainSection";
import { LeftSection } from "./LeftSection";
import { DesktopRow } from "./DesktopRow";
import { SectionTitle } from "./SectionTitle";
import { SectionProps } from "./SectionProps";

export const SportsSection: React.ElementType = (props: SectionProps) => {
  const { content, mainBeforeSide, style, rStyle } = props;
  const leftContent = content.slice(3);
  const mainContent = content.slice(0, 3);
  const SectionStyleWithoutPaddingTop = styled(SectionStyle)({
    paddingTop: 0,
  });
  const LeftSportSection: React.ElementType = (lsProps: SectionProps) => {
    return (
      <LeftSection
        content={leftContent}
        sectionTitle={null}
        SectionTag={SectionStyleWithoutPaddingTop}
        {...lsProps}
      />
    );
  };
  const MainSportSection: React.ElementType = (msProps: SectionProps) => {
    return (
      <MainSection
        content={mainContent}
        sectionTitle={null}
        SectionTag={SectionStyleWithoutPaddingTop}
        {...msProps}
      />
    );
  };
  return (
    <RView
      WebTag={SectionWithoutStyle}
      NativeTag={SectionWithoutStyle}
      style={style}
      rStyle={rStyle}
    >
      <SectionStyle style={{ paddingBottom: 0 }}>
        <SectionTitle>Sports</SectionTitle>
      </SectionStyle>
      <DesktopRow>
        {mainBeforeSide ? (
          <>
            <MainSportSection />
            <LeftSportSection />
          </>
        ) : (
          <>
            <LeftSportSection />
            <MainSportSection />
          </>
        )}
      </DesktopRow>
    </RView>
  );
};
