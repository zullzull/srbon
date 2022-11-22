import Link from "next/link";

export default function CustomLink({ to, className, children }) {
  const getLink = (link) => {
    if (isExternal(link)) {
      return link;
    } else {
      if (link[0] != "/") {
        link = "/" + link;
      }
      return link;
    }
  };

  const isExternal = (link) => {
    return link.split("://").length > 1;
  };

  return (
    <>
      {isExternal(to) ? (
        <a
          href={getLink(to)}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          {children}
        </a>
      ) : (
        <Link href={getLink(to)} className={className}>
          {children}
        </Link>
      )}
    </>
  );
}
