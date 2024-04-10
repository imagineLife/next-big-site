import Link from 'next/link';

export default function CustomLink({ as, href, ...otherProps }) {
  return (
    <>
      <Link
        as={as}
        href={href}
        style={{
          '&:hover:before': {
            content: '"#"',
            position: 'relative',
            marginLeft: '-1.2ch',
            paddingRight: '0.2ch',
          },
        }}
      >
        <a {...otherProps} />
      </Link>
    </>
  );
}
