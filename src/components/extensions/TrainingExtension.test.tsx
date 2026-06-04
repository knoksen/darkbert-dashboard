import React from 'react';
import { describe, test, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrainingExtension from './TrainingExtension';

describe('TrainingExtension', () => {
  test('renders header and progress', () => {
    render(<TrainingExtension />);
    expect(screen.getByText(/Training To-Do List/i)).toBeTruthy();
    expect(screen.getByText(/Weekly training workflow/i)).toBeTruthy();
  });

  test('can add a new task', async () => {
    render(<TrainingExtension />);
    const user = userEvent.setup();

    const addCard = screen.getAllByText('Add new training task')[0].closest('div');
    const title = within(addCard as HTMLElement).getByLabelText(/Task title/i);
    await user.type(title, 'My new task');
    const addButton = within(addCard as HTMLElement).getByRole('button', { name: /Add training task/i });
    await user.click(addButton);

    expect(screen.getByText('My new task')).toBeTruthy();
  });

  test('toggle complete and reopen task', async () => {
    render(<TrainingExtension />);
    const user = userEvent.setup();

    const addCard = screen.getAllByText('Add new training task')[0].closest('div');
    const title = within(addCard as HTMLElement).getByLabelText(/Task title/i);
    await user.type(title, 'Toggle task');
    const addButton = within(addCard as HTMLElement).getByRole('button', { name: /Add training task/i });
    await user.click(addButton);

    const taskRow = screen.getByText('Toggle task').closest('div');
    expect(taskRow).toBeTruthy();
    const completeBtn = screen.getAllByLabelText(/Complete task|Reopen task/)[0];
    await user.click(completeBtn);

    const titleElem = screen.getByText('Toggle task');
    expect(titleElem.className).toMatch(/line-through/);
  });

  test('filter by high priority', async () => {
    render(<TrainingExtension />);
    const user = userEvent.setup();

    const addCard = screen.getAllByText('Add new training task')[0].closest('div');
    const title = within(addCard as HTMLElement).getByLabelText(/Task title/i);
    await user.type(title, 'High priority test');

    const prioritySelect = within(addCard as HTMLElement).getByLabelText(/Priority/i);
    await user.click(prioritySelect);
    const highOption = screen.getByRole('option', { name: /High/i });
    await user.click(highOption);

    const addButton = within(addCard as HTMLElement).getByRole('button', { name: /Add training task/i });
    await user.click(addButton);

    const filtersCard = screen.getAllByText('Filters')[0].closest('div');
    const highFilterButton = within(filtersCard as HTMLElement).getByRole('button', { name: /High Priority/i });
    await user.click(highFilterButton);

    expect(screen.getByText('High priority test')).toBeTruthy();
  });
});
