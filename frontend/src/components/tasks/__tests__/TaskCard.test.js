import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskCard from '../TaskCard';

describe('TaskCard', () => {
  test('renders task title and urgency badge', () => {
    const mockTask = {
      id: 1,
      title: 'Fix login bug',
      description: 'Resolve JWT validation issue',
      dueDate: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 2 days from now
      status: 'IN_PROGRESS',
      project: { id: 2, name: 'Security Module' },
      assignedTo: { name: 'Clio' },
    };

    render(
      <TaskCard
        task={mockTask}
        onEdit={() => {}}
        onDelete={() => {}}
        onStartTimer={() => {}}
        onStopTimer={() => {}}
        timerRunningTaskId={null}
      />
    );

    expect(screen.getByText(/Fix login bug/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium urgency/i)).toBeInTheDocument();
    expect(screen.getByText(/Security Module/i)).toBeInTheDocument();
    expect(screen.getByText(/Clio/i)).toBeInTheDocument();
  });
});
