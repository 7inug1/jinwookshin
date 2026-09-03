import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <p className="label">404</p>
      <h1 className="display mt-gap-2">여기에는 아무것도 없다.</h1>
      <p className="mt-gap-3">
        <Link href="/">홈으로</Link>
      </p>
    </>
  );
}
