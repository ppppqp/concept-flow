export default function Concepts({ concepts }: { concepts: string[] }) {
  return (
    <div className="flex justify-start items-center gap-0.5 select-text">
      {concepts.map((concept) => (
        <div contentEditable className="text-xs	rounded inline-flex px-1 justify-center items-center flex-wrap text-zinc-700">
          {concept}
        </div>
      ))}
    </div>
  );
}
