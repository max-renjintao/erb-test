type WorkImmer = import('use-immer').ImmerHook<Work>;
type WorkImmerProps = { imm: WorkImmer };
type FilterPredicate<T> = (value: T, index: number, array: T[]) => unknown;
