type Work = import('./const-work').Work;
type ImmerHook<S> = import('use-immer').ImmerHook<S>;
type ImmWork = ImmerHook<Work>;
type Options = import('./const-store').Options;
