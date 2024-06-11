"use client";

import { IBM_Plex_Mono } from "next/font/google";
import { CopyBlock, github, tomorrowNight } from "react-code-blocks";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--imb-plex-mono",
});

type CodeProps = {
  code: string;
  showLineNumbers?: boolean;
  highlightLines?: string;
  theme?: any;
};

export default function Code(props: CodeProps) {
  const getTheme = (theme: string) => {
    switch (theme) {
      case "github":
        return github;
      default:
        return tomorrowNight;
    }
  };

  return (
    <div className="max-w-7xl">
      <div className={ibmPlexMono.className}>
        <CopyBlock
          language="ts"
          wrapLongLines
          theme={getTheme(props.theme)}
          showLineNumbers={props.showLineNumbers}
          text={props.code.trim()}
          codeBlock
          highlight={props.highlightLines}
        />
      </div>
    </div>
  );
}
