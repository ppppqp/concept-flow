import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
export default function Concepts({ concepts }: { concepts: string[] }) {
  return (
    <div className="flex justify-start items-center gap-0.5 select-text">
      <div><EllipsisVerticalIcon className="h-5 w-5 text-zinc-600 cursor-grab custom-drag-handle"/></div>
      {concepts.map((concept) => (
        <div className="	rounded inline-flex px-1 justify-center items-center flex-wrap text-zinc-700">
          {concept}
        </div>
      ))}
    </div>
  );
}
