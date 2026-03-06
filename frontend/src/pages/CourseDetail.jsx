import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${id}`);
        const data = await response.json();
        setCourse(data);
      } catch (err) {
        setError('Failed to load course details');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEnrolled(true);
        setCourse(data.course);
      } else {
        setError(data.message || 'Failed to enroll');
      }
    } catch (err) {
      setError('Failed to enroll in course');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error && !course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-8 max-w-md">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-8 px-4 py-2 text-blue-600 hover:text-blue-700 font-semibold transition"
        >
          ← Back to Courses
        </button>

        {course && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Course Image */}
            <div className="h-96 bg-gradient-to-r from-blue-400 to-purple-500">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Course Content */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                {course.description}
              </p>

              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-gray-600 mb-2">Price</p>
                  <p className="text-4xl font-bold text-blue-600">
                    ${course.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 mb-2">Students Enrolled</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {course.students?.length || 0}
                  </p>
                </div>
              </div>

              {enrolled ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700 text-center font-semibold">
                  ✓ You're enrolled in this course
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {enrolling ? 'Enrolling...' : token ? 'Enroll Now' : 'Sign In to Enroll'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
