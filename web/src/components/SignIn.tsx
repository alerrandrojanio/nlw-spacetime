import { User } from "lucide-react";

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="keyboard-navigation flex items-center gap-3 rounded text-left"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <User className="h-5 w-5 text-gray-500" />
      </div>
      <p className="max-w-[140px] text-sm leading-snug">
        <span className="underline transition-colors hover:text-gray-50">
          Crie sua conta
        </span>{" "}
        e salve suas memórias!
      </p>
    </a>
  );
}
