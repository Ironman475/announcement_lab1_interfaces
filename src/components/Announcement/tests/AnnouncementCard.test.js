import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnnouncementCard from '../AnnouncementCard';
import { within } from '@testing-library/react';
const mockAnnouncement = {
  id: 1,
  title: 'Test Announcement',
  content: 'This is a test announcement content',
  category: 'Загальне',
  authorName: 'John Doe',
  date: '2024-01-01',
  likes: [1, 2],
  dislikes: [3],
  comments: [{ id: 1, text: 'Great!' }],
};

describe('AnnouncementCard', () => {
  const mockOnReact = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders announcement details correctly', () => {
    render(<AnnouncementCard announcement={mockAnnouncement} onReact={mockOnReact} />);
    const allOnes = screen.getAllByText('1');
    expect(screen.getByText('Test Announcement')).toBeInTheDocument();
    expect(screen.getByText('This is a test announcement content')).toBeInTheDocument();
    expect(screen.getByText('Загальне')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument(); // likes count
    expect(allOnes.length).toBeGreaterThanOrEqual(2); // dislikes count
    expect(screen.getByText('#1')).toBeInTheDocument(); // announcement ID
  });

  test('handles like button click', async () => {
    const user = userEvent.setup();
    render(<AnnouncementCard announcement={mockAnnouncement} onReact={mockOnReact} />);

    const likeButton = screen.getAllByRole('button')[0];
    await user.click(likeButton);

    expect(mockOnReact).toHaveBeenCalledWith(1, 'like');
  });

  test('handles dislike button click', async () => {
    const user = userEvent.setup();
    render(<AnnouncementCard announcement={mockAnnouncement} onReact={mockOnReact} />);

    const dislikeButton = screen.getAllByRole('button')[1];
    await user.click(dislikeButton);

    expect(mockOnReact).toHaveBeenCalledWith(1, 'dislike');
  });
});