import Course from '../models/Course.js';

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'email').populate('students', 'email');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'email')
      .populate('students', 'email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Title, description, and price are required' });
    }

    const course = await Course.create({
      title,
      description,
      price,
      image: image || 'https://via.placeholder.com/300x200?text=Course',
      instructor: req.user._id,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.students.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.students.push(req.user._id);
    await course.save();

    res.status(200).json({ message: 'Successfully enrolled', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
