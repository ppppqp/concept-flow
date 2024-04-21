import {
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import { useState, useMemo } from "react";
export default function Content({ content }: { content: string }) {
  const [fold, setFold] = useState(false);
  const foldClassName = "max-h-0 overflow-hidden";
  const expandClassName = "select-text";
  const icon = useMemo(() => {
    return (
      <div
        className="w-full cursor-pointer hover:bg-zinc-100 p-1 mb-2 rounded"
        onClick={() => setFold((fold) => !fold)}
      >
        {fold ? (
          <ChevronDoubleDownIcon className="w-3 h-3 " />
        ) : (
          <ChevronDoubleUpIcon className="w-3 h-3 cursor-pointer" />
        )}
      </div>
    );
  }, [fold]);
  return (
    <>
      {content ? icon : null}
      <div className={fold ? foldClassName : expandClassName}>{content}</div>
    </>
  );
}
