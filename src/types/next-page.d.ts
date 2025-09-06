export type PageProps<Params = Record<string, string>> = {
  params: Params;
  searchParams?: { [key: string]: string | string[] | undefined };
};
