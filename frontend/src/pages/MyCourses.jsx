import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CourseCard } from '../components/CourseCard';
import { useAuth } from '../context/AuthContext';

export const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuth();

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const fetchMyCourses = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/courses');
      const allCourses = await response.json();
      // Filter courses created by the current user
      const myCourses = allCourses.filter(
        (course) => course.instructor._id === user._id
      );
      setCourses(myCourses);
    } catch (err) {
      setError('Failed to load your courses');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setCourses(courses.filter((c) => c._id !== courseId));
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to delete course');
      }
    } catch (err) {
      setError('Failed to delete course');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Courses</h1>
            <p className="text-gray-600 mt-2">Manage and view all your created courses</p>
          </div>
          <Link
            to="/create-course"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            + Create New Course
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8 border border-red-200">
            {error}
          </div>
        )}

        {courses.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Courses Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't created any courses yet. Start by creating your first course!
            </p>
            <Link
              to="/create-course"
              className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Create Your First Course
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {/* Course Image */}
                  <div className="md:col-span-1">
                    <div className="h-40 rounded-lg overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex items-center gap-6 mb-4 flex-wrap">
                      <div>
                        <p className="text-gray-500 text-sm">Price</p>
                        <p className="text-2xl font-bold text-blue-600">${course.price}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Students Enrolled</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {course.students?.length || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 text-sm">Created</p>
                        <p className="text-2xl font-bold text-gray-800">
                          {new Date(course.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <Link
                        to={`/course/${course._id}`}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                      >
                        View Course
                      </Link>
                      <button
                        onClick={() => handleDelete(course._id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
