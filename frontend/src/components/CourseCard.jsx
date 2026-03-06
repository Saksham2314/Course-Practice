import { Link } from 'react-router-dom';

export const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 hover:scale-105 overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Course Image Container */}
        <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500 overflow-hidden flex items-center justify-center group">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=' + encodeURIComponent(course.title);
            }}
          />
          {/* Overlay with instructor info */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
        </div>

        {/* Course Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition">
            {course.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {course.description}
          </p>

          {/* Instructor info */}
          <p className="text-xs text-gray-500 mb-4">
            by {course.instructor?.email || 'Instructor'}
          </p>

          {/* Footer with price and students */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-2xl font-bold text-blue-600">
              ${course.price}
            </span>
            <span className="text-xs text-gray-500 bg-gradient-to-r from-blue-100 to-purple-100 px-3 py-1 rounded-full hover:from-blue-200 hover:to-purple-200 transition font-semibold">
              👥 {course.students?.length || 0}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
