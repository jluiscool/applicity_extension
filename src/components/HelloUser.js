export default function HelloUser({ isSignedIn, user, handleSignOut }) {

    if (!isSignedIn) {
        return null;
    }

    return (
        <>
            <p>Hi, {user.primaryEmailAddress?.emailAddress}!</p>
            <p>
                <button onClick={handleSignOut}>Sign out</button>
            </p>
        </>
    );
}