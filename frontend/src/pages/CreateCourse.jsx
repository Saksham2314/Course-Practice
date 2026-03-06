import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');

    if (!formData.title || !formData.description || !formData.price) {
      setError('Please fill in all required fields');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/courses', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Course created successfully!');
        setFormData({ title: '', description: '', price: '', image: '' });
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        setError(data.message || 'Failed to create course');
      }
    } catch (err) {
      setError('Failed to create course: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Create A Course</h1>
          <p className="text-gray-600 mb-8">Share your knowledge and earn money by creating a course</p>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 border border-green-200">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="e.g., Advanced React & TypeScript"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Course Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                placeholder="Describe what students will learn in this course..."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price (USD) *
                </label>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">$</span>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    placeholder="99.99"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="https://via.placeholder.com/500x300?text=My+Course"
                />
              </div>
            </div>

            {formData.image && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image Preview
                </label>
                <div className="rounded-lg overflow-hidden border border-gray-300 h-48">
                  <img
                    src={formData.image}
                    alt="Course preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x300?text=Invalid+Image';
                    }}
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating Course...' : 'Create Course'}
            </button>

            <p className="text-center text-gray-500 text-sm">
              * Required fields
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
