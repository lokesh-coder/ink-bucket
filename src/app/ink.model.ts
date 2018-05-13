export enum InkColorType {
  RGB,
  HEX,
  HSL
}

export interface InkColor {
  name?: string;
  value: string;
  type: InkColorType;
  belongsTo: string;
}

export interface InkCollection {
  name: string;
  colors: InkColor[];
  created: Date;
}
export enum InkAppView {
  ROUND,
  RECT,
  STRIP
}
export interface InkAppSettings {
  view: InkAppView;
  sortBy: string;
}
