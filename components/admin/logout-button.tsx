import { logout } from "@/actions/admin-auth";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="font-mono text-[10px] tracking-[0.15em] uppercase text-g-mid hover:text-g-ink transition-colors"
      >
        Sign out →
      </button>
    </form>
  );
}
