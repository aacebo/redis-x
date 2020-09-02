declare module 'feather-icons/*' {
  export interface IFeather {
    readonly icons: {
      [iconName: string]: {
        readonly attrs: any;
        readonly contents: string;
        readonly name: string;
        readonly tags: string[];
        readonly toSvg: () => string;
      };
    };
  }

  const feather: IFeather;
  export default feather;
}
