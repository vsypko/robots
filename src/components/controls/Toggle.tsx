import type { Dispatch, ReactNode, SetStateAction } from "react";

export default function Toggle<T>({
  value,
  setValue,
  title
}: {
  value: T;
  setValue: Dispatch<SetStateAction<boolean>>;
  title: string;
}): ReactNode {
  const handleClick = () => {
    setValue((prev: boolean) => !prev);
  };

  return (
    <button
      className={`flex px-2 ${
        value ? "bg-slate-800" : "bg-yellow-600"
      } text-white rounded-full hover:opacity-90 active:scale-90 transition-all`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
}
