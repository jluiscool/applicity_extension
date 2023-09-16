/*global chrome*/
import "./App.css";

import {
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  useClerk,
  useUser,
  ClerkProvider,
} from "@clerk/chrome-extension";
import {
  useNavigate,
  Routes,
  Route,
  MemoryRouter
} from "react-router-dom";

function HelloUser() {
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  if (!isSignedIn) {
    return null;
  }

  chrome.runtime.sendMessage(
    { greeting: user.primaryEmailAddress?.emailAddress },
    function (response) {
      console.log(response.farewell)
    }
  )

  const data = user.primaryEmailAddress.emailAddress

  chrome.storage.local.set({ cache: data, cacheTime: Date.now() }, function () {
    console.log(data);
  });

  return (
    <>
      <p>Hi, {user.primaryEmailAddress?.emailAddress}!</p>
      <p>
        <button onClick={() => clerk.signOut()}>Sign out</button>
      </p>
    </>
  );
}

const publishableKey = "pk_test_ZGV2b3RlZC1raW5nZmlzaC0xNy5jbGVyay5hY2NvdW50cy5kZXYk";

function ClerkProviderWithRoutes() {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={publishableKey} navigate={(to) => navigate(to)}>
      <div className="App">
        <main className="App-main">
          <Routes>
            <Route
              path="/sign-up/*"
              element={<SignUp signInUrl="/" />}
            />
            <Route path='/' element={
              <>
                <SignedIn>
                  <HelloUser />
                </SignedIn>
                <SignedOut>
                  <SignIn afterSignInUrl="/" signUpUrl="/sign-up" />
                </SignedOut>
              </>
            } />
          </Routes>
        </main>
      </div>
    </ClerkProvider>
  );
}

function App() {

  return (
    <MemoryRouter>
      <ClerkProviderWithRoutes />
    </MemoryRouter>
  );
}

export default App;
