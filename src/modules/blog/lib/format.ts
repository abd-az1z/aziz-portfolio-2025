// date/relative time helpers
export const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  
  export const monthsAgo = (iso: string) => {
    const d = new Date(iso), now = new Date();
    const diff = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
    return diff <= 0 ? "Recently" : `${diff} mo ago`;
  };