export function cssClassNames(
  defaultClassName: string | Record<string, boolean>,
  otherClassNames?: Record<string, boolean>
): string {
  let classNames = "";

  if (defaultClassName && typeof defaultClassName === "string") {
    classNames = defaultClassName;
  }

  if (defaultClassName && typeof defaultClassName === "object") {
    classNames = Object.keys(defaultClassName)
      .filter((className) => defaultClassName[className])
      .join(" ");
  }

  if (otherClassNames && typeof otherClassNames === "object") {
    const other = Object.keys(otherClassNames)
      .filter((className) => otherClassNames[className])
      .join(" ");
    classNames = `${classNames} ${other}`.trim();
  }

  return classNames;
}
