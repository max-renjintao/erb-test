type WorkImmer = import('use-immer').ImmerHook<Work>;
type WorkImmerProps = { immer: WorkImmer };
type FilterPredicate<T> = (value: T, index: number, array: T[]) => unknown;
