import { signIn } from "@/lib/auth";

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 w-full max-w-sm text-center">
        <h1 className="text-xl font-semibold text-white mb-2">Admin login</h1>
        <p className="text-gray-400 text-sm mb-6">
          Sign in to access your CMS dashboard
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/admin" });
          }}
        >
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium py-2.5 px-4 rounded-lg hover:bg-gray-100 transition cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.263.82-.582 0-.287-.01-1.046-.015-2.054-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.24 1.84 1.24 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.305-5.467-1.335-5.467-5.933 0-1.31.467-2.38 1.235-3.22-.123-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.3 1.23a11.49 11.49 0 013.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.65.241 2.872.118 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.922.43.37.814 1.102.814 2.222 0 1.606-.015 2.902-.015 3.293 0 .322.218.7.825.58C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Continue to GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
