import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '../RegisterForm';
import { BrowserRouter } from 'react-router-dom';

// Wrap with BrowserRouter to support useNavigate
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('RegisterForm', () => {
  test('shows validation errors when submitting empty form', () => {
    renderWithRouter(<RegisterForm />);
    
    fireEvent.click(screen.getByText(/Sign Me Up!/i));

    expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
  });

  test('does not show validation errors with valid input', () => {
    renderWithRouter(<RegisterForm />);

    fireEvent.change(screen.getByPlaceholderText(/Name/i), {
      target: { value: 'Clio', name: 'name' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'clio@example.com', name: 'email' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'securePass123', name: 'password' },
    });

    fireEvent.click(screen.getByText(/Sign Me Up!/i));

    expect(screen.queryByText(/Name is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
  });
});
