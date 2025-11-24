import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-zinc-400">Sign in to continue to Zenith</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-zinc-900 border border-zinc-800 shadow-2xl",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white",
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/50",
              footerActionLink: "text-indigo-500 hover:text-indigo-400",
              formFieldInput: "bg-zinc-800 border-zinc-700 text-white focus:border-indigo-600",
              identityPreviewText: "text-white",
              identityPreviewEditButton: "text-indigo-500",
              formFieldLabel: "text-zinc-300",
              dividerLine: "bg-zinc-700",
              dividerText: "text-zinc-400",
            }
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/chat"
        />
      </div>
    </div>
  )
}
