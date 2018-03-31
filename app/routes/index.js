import React from 'react';
import asyncComponent from '../views/hoc/asyncComponent';
import BookBoard from '../views/containers/BookBoard';

const asyncDetails   = asyncComponent( () => import('../views/containers/BookDetails') )
const asyncAuth      = asyncComponent( () => import('../views/containers/Auth') )
const asyncLogout    = asyncComponent( () => import('../views/containers/Auth/Logout') )
const asyncNewBook   = asyncComponent( () => import('../views/containers/NewBook') )
const AsyncBookBoard = asyncComponent( () => import('../views/containers/BookBoard'))

const routes = [
    {
        path     : '/book/:id',
        component: asyncDetails,
        exact    : true,                
    },
    {
        path     : '/book/:id/:personal',
        component: asyncDetails,
    },    
    {
        path     : '/auth',
        component: asyncAuth        
    },
    {
        path: '/logout',
        component: asyncLogout
    },
    {
        path: '/new-book',
        component: asyncNewBook
    },
    {
        path: '/uploaded',
        render: () => <AsyncBookBoard personal={true}/>
    },
    {
        path     : '/',
        component: BookBoard,
        exact    : true,
    },
];

export default routes;