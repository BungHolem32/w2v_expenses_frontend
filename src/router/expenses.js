import Index from '../components/expenses';

export const expense = [
    {
       path: '/', redirect: '/expenses'
    },
    {
        path: '/expenses',
        name: 'ExpenseIndex',
        props: true,
        component: Index,
    },
];