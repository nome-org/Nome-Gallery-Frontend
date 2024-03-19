import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';


// Initialize Firebase
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);


function EmailForm() {
    const [email, setEmail] = useState('');
    const [emailExists, setEmailExists] = useState(false);
  
    const handleSubmit = async (event) => {
      event.preventDefault(); // Prevent the default form submission behavior
  
      try {
        // Check if the email exists in Firebase Authentication
        const signInMethods = await firebase.auth().fetchSignInMethodsForEmail(email);
  
        // If the email exists, it means the user is registered
        const exists = signInMethods.length > 0;
        setEmailExists(exists);
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while checking the email');
      }
    };
  
    const handleChange = (event) => {
      setEmail(event.target.value); // Update the email state with the input value
    };
  
    return (
      <div>
         <form className='flex-row'>
             <input className='border rounded-md w-60 h-8 object-center text-black' type="email" placeholder='Verify E-mail'/>

            <button className='border border-white rounded-md text-black bg-white hover:text-slate-500 p-1 text-center duration-300 cursor-pointer hover:border-slate-500 w-60 h-8 object-center mt-10 '>Verify Email</button>
          </form>
        {emailExists && <p>Email exists</p>}
        {!emailExists && <p>Email does not exist</p>}
      </div>
    );
  }
  
  export default EmailForm;