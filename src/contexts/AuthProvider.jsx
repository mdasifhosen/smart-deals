import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.config';


const googleProvider=new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)

    // create user
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // sign in user
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // google login
    const signInWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    // sign out
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    // update user
    const updateUser = (profile) => {
        setLoading(true)
        return updateProfile(auth. currentUser, profile)
    }

    // verification email

    const emailVerification = (user) => {
        setLoading(true)
        return sendEmailVerification(user)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log('current user',currentUser)
            if (currentUser) {
                const loggedUser={email:currentUser.email}
                fetch(
                  "http://localhost:3000/getToken",
                    {
                        method: "POST",
                        headers: {
                            'content-type':"application/json"
                        },
                        body:JSON.stringify(loggedUser)
                  },
                )
                  .then((res) => res.json())
                  .then((data) => {
                      console.log("after getting token", data);
                      localStorage.setItem('token',data.token)
                  });
            }
            else {
                localStorage.removeItem('token')
            }
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])
    

    const authInfo = {
      createUser,
      user,
      setUser,
      loading,
      setLoading,
      signInUser,
      signInWithGoogle,
      signOutUser,
      updateUser,
      emailVerification,
    };
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;