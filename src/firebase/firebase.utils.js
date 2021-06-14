import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyDa87zC3bMrJqCIZxOBbXDf0W8pjo8C4Kk",
	authDomain: "crwn-db-23cd3.firebaseapp.com",
	projectId: "crwn-db-23cd3",
	storageBucket: "crwn-db-23cd3.appspot.com",
	messagingSenderId: "1079955060974",
	appId: "1:1079955060974:web:fd84ab8db7a8ba8d2d5bff",
	measurementId: "G-CNDZZHR544",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot =await userRef.get();

	if(!snapShot.exists){
		const {displayName,email} = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData
			})
		} catch (error) {
			console.log('Error creating user',error.message);
		}
	}

	return userRef;


}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
