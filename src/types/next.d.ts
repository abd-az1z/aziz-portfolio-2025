import 'next';

declare module 'next' {
  export type PageProps<Params = Record<string, string>, SearchParams = Record<string, string | string[] | undefined>> = {
    params: Params;
    searchParams?: SearchParams;
  };
}
