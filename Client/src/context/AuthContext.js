import React, { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext({
    isAuthenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null
});
