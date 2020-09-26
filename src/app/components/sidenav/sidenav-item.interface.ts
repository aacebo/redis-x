export interface ISidenavItem {
  readonly type: 'spacer' | 'button' | 'link';
  icon?: string;
  text?: string;
  readonly route?: string;
  readonly click?: () => void;
}
