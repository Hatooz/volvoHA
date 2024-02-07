import Link from "next/link";
import { useRouter } from "next/router";

export default function Learn() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="p-2">
      <div>This is the learn page for car: {id}</div>
      <div>
        <Link href="/">
          <button className="mt-10 bg-blue-500 text-white px-4 rounded-xl">
            Back
          </button>
        </Link>
      </div>
    </div>
  );
}
