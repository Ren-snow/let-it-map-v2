import { signIn } from "@/lib/auth";

export default function SignInPage() {
    return (
        <>
            <form action={async () => await signIn("google")}>
                <button type="submit">Sign in with Google</button>
            </form>;
            <form action={async () => await signIn("github")}>
                <button type="submit">Sign in with GitHub</button>
            </form>;
        </>
    );
}