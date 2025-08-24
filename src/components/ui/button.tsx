export function Button({ asChild, children, className = "", ...props }: any) {
  const Comp: any = asChild ? "span" : "button";
  return (
    <Comp
      className={
        "inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white text-sm font-medium hover:bg-indigo-500 transition " +
        className
      }
      {...props}
    >
      {children}
    </Comp>
  );
}

