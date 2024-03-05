export type BundleStartProps = {
  cellId: string;
};

export type BundleCompleteProps = {
  cellId: string;
  bundle: {
    code: string;
    err: string;
  };
};

export type BundleProps = BundleStartProps | BundleCompleteProps;
