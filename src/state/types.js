type SplytUnitStatus = 'adding' | 'added' | 'removing';
type SplytUnitSize = 'small' | 'large';
type Ui = {
  windowWidth: number,
  windowHeight: number
};

export type SplytTree = {
  id: string,
  status: SplytUnitStatus,
  size: SplytUnitSize,
  left: ?SplytTree,
  right: ?SplytTree
};

export type State = {
  ui: Ui,
  tree: SplytTree,
  isDashboardExpanded: boolean
};
