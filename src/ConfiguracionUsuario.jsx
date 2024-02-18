import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from './Firebase'; // Importa las instancias de autenticación y Firestore desde Firebase
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'; // Importa funciones de autenticación de Firebase


// Crea un contexto de autenticación
const AuthContext = createContext();


// Hook personalizado para acceder al contexto de autenticación
export function useAuth() {
    return useContext(AuthContext);
}

// Proveedor de contexto de autenticación
export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Escucha el cambio de estado de autenticación
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
            setCargando(false);
        });

        return () => unsubscribe();
    }, []);

    // Funciones relacionadas con la autenticación (por ejemplo, iniciar sesión, cerrar sesión, etc.)
    function iniciarSesionConGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    function iniciarSesionConCorreoElectronico(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function registrarUsuarioConCorreoElectronico(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function cerrarSesion() {
        
        return auth.signOut();
    }

    const value = {
        usuario,
        iniciarSesionConGoogle,
        iniciarSesionConCorreoElectronico,
        registrarUsuarioConCorreoElectronico,
        cerrarSesion,
    };

    return (
        <AuthContext.Provider value={value}>
            {!cargando && children}
        </AuthContext.Provider>
    );
}
