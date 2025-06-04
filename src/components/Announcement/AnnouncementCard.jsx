import React from 'react';
import { Heart, MessageCircle, Calendar, User } from 'lucide-react';

const AnnouncementCard = ({ announcement, onReact }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{announcement.title}</h3>
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {announcement.category}
        </span>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <User className="w-4 h-4" />
          <span>{announcement.authorName}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>{announcement.date}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-6">{announcement.content}</p>

      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onReact(announcement.id, 'like')}
            className="flex items-center space-x-2 text-green-600 hover:text-green-700"
          >
            <Heart className="w-5 h-5" />
            <span>{announcement.likes.length}</span>
          </button>
          <button
            onClick={() => onReact(announcement.id, 'dislike')}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
          >
            <Heart className="w-5 h-5 transform rotate-180" />
            <span>{announcement.dislikes.length}</span>
          </button>
          <div className="flex items-center space-x-2 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span>{announcement.comments.length}</span>
          </div>
        </div>
        <span className="text-sm text-gray-400">#{announcement.id}</span>
      </div>
    </div>
  );
};

export default AnnouncementCard;
