import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from '../LoginForm';
import { BrowserRouter } from 'react-router-dom';

describe('LoginForm', () => {
  test('renders login form with inputs and button', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Let's go!/i })).toBeInTheDocument();
  });

  test('updates input values on change', () => {
    render(
      <BrowserRouter>
        <LoginForm />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const passwordInput = screen.getByPlaceholderText(/Password/i);

    fireEvent.change(emailInput, { target: { value: 'clio@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepass' } });

    expect(emailInput.value).toBe('clio@example.com');
    expect(passwordInput.value).toBe('securepass');
  });
});
