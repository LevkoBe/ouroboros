export function formatMarkdown(markdown: string, styles: { [key: string]: string }): string {
  const escapeHtml = (str: string): string =>
    str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const parseInline = (text: string): string => {
    return escapeHtml(text)
      .replace(
        /\*\*(.+?)\*\*/g,
        (_, m: string) => `<strong class="${styles.strong}">${m}</strong>`
      )
      .replace(
        /\*(.+?)\*/g,
        (_, m: string) => `<em class="${styles.em}">${m}</em>`
      )
      .replace(
        /`(.+?)`/g,
        (_, m: string) => `<code class="${styles.code}">${m}</code>`
      );
  };

  const lines = markdown.split("\n");
  const output: string[] = [];
  let inList = false;

  for (const line of lines) {
    if (/^[-*] /.test(line)) {
      if (!inList) {
        output.push(`<ul class="${styles.ul}">`);
        inList = true;
      }
      output.push(`<li class="${styles.li}">${parseInline(line.slice(2))}</li>`);
    } else {
      if (inList) {
        output.push(`</ul>`);
        inList = false;
      }

      if (/^#{1,6} /.test(line)) {
        const level = line.match(/^#+/)?.[0].length || 1;
        const content = line.slice(level + 1);
        output.push(`<h${level} class="${styles[`h${level}`]}">${parseInline(content)}</h${level}>`);
      } else if (line.trim() !== "") {
        output.push(`<p class="${styles.p}">${parseInline(line)}</p>`);
      } else {
        output.push("");
      }
    }
  }

  if (inList) output.push(`</ul>`);

  return output.join("\n");
}
