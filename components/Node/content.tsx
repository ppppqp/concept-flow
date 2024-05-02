import { markdown } from "@/utils/markdown";
import { Ref } from "react";
export default function Content({
  content,
  fold,
  contentRef,
}: {
  content: string;
  fold: boolean;
  contentRef: Ref<HTMLDivElement>;

}) {
  const foldClassName = "max-h-5 overflow-hidden";
  const expandClassName = "select-text";
  return (
    <div className={fold ? foldClassName : expandClassName} ref={contentRef}>
      {fold ? <div className="text-center">...</div> : <div dangerouslySetInnerHTML={{__html: markdown(content)}}></div>}
    </div>
  );
}
