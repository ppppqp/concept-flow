import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function Concepts({ concepts }: { concepts: string[] }) {
  return (
    <div className="flex justify-start items-center gap-0.5 select-text">
      <div className="	rounded inline-flex px-1 justify-center items-center flex-wrap text-zinc-700">
        {concepts.at(-1)}

      </div>

    </div>
  );
}
