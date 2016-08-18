type SplytUnitStatus = 'adding' | 'added' | 'removing';
type SplytUnitSize = 'small' | 'large';

export type SplytTree = {
  status: SplytUnitStatus,
  size: SplytUnitSize,
  left: ?SplytTree,
  right: ?SplytTree
};

export type State = {
  name: string,
  tree: SplytTree
};
