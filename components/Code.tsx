"use client";

import { IBM_Plex_Mono } from "next/font/google";
import { CopyBlock, tomorrowNight } from "react-code-blocks";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--imb-plex-mono",
});

type CodeProps = {
  code: string;
  showLineNumbers?: boolean;
  highlightLines?: string;
};

export default function Code(props: CodeProps) {
  return (
    <div className="max-w-7xl">
      <div className={ibmPlexMono.className}>
        <CopyBlock
          language="ts"
          wrapLongLines
          theme={tomorrowNight}
          showLineNumbers={props.showLineNumbers}
          text={props.code.trim()}
          codeBlock
          highlight={props.highlightLines}
        />
      </div>
    </div>
  );
}
