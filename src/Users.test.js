import React from 'react';
import { render } from '@testing-library/react';
import {Users} from './Users';

test('renders in table with provided columns', () => {
    const {getByRole}=render(<Users />);
    const tableElement=getByRole('table');
    expect(tableElement).toBeInTheDocument();
 });

 test('displays header text', () => {
    const {getByText} = render(<Users />);
    const headerElement = getByText(/Users' data/i);
    expect(headerElement).toBeInTheDocument();
 }
 );