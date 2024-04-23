export default function Content({
  content,
  fold,
}: {
  content: string;
  fold: boolean;
}) {
  const foldClassName = "max-h-5 overflow-hidden";
  const expandClassName = "select-text";
  return (
    <div className={fold ? foldClassName : expandClassName}>
      {fold ? <div className="text-center">...</div> : content}
    </div>
  );
}
