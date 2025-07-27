import React, { useState, useEffect } from 'react';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

const courseStats = [
  { name: 'React', enrolled: 120, completion: 80 },
  { name: 'Node.js', enrolled: 95, completion: 60 },
  { name: 'Python', enrolled: 150, completion: 110 },
  { name: 'AI/ML', enrolled: 70, completion: 40 },
];


export default function Courses() {
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses?page=1`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setCourses(data.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials?page=1&limit=10&isActive=true`, {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setTestimonials(data.data);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchCourses();
    fetchTestimonials();
  }, []);

  const [editCourseId, setEditCourseId] = useState(null);
  const [editedPrice, setEditedPrice] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showEditTestimonialForm, setShowEditTestimonialForm] = useState(false);
  const [editTestimonialId, setEditTestimonialId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    path: '',
    description: '',
    shortDescription: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    price: '',
    originalPrice: '',
    category: '',
    syllabusDownloadLink: '',
    enrollLink: '',
    tags: '',
    image: '',
    requirements: '',
    whatYouWillLearn: '',
    isFeatured: false
  });

  const [editTestimonialData, setEditTestimonialData] = useState({
    name: '',
    designation: '',
    company: '',
    message: '',
    rating: 5,
    image: ''
  });

  // Form states for new course
  const [formData, setFormData] = useState({
    title: '',
    path: '',
    description: '',
    shortDescription: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    price: '',
    originalPrice: '',
    category: '',
    syllabusDownloadLink: '',
    enrollLink: '',
    tags: '',
    image: '',
    requirements: '',
    whatYouWillLearn: '',
    isFeatured: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditTestimonialChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditTestimonialData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      path: '',
      description: '',
      shortDescription: '',
      instructor: '',
      duration: '',
      level: 'Beginner',
      price: '',
      originalPrice: '',
      category: '',
      syllabusDownloadLink: '',
      enrollLink: '',
      tags: '',
      image: '',
      requirements: '',
      whatYouWillLearn: '',
      isFeatured: false
    });
  };

  const handleAddCourse = async () => {
    try {
      // Convert comma-separated strings to arrays
      const courseData = {
        ...formData,
        price: parseFloat(formData.price) || 0,
        originalPrice: parseFloat(formData.originalPrice) || 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        requirements: formData.requirements.split('\n').map(req => req.trim()).filter(req => req),
        whatYouWillLearn: formData.whatYouWillLearn.split('\n').map(item => item.trim()).filter(item => item)
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (data.success) {
        setCourses([...courses, data.data]);
        setShowForm(false);
        resetForm();
        alert('Course added successfully!');
      } else {
        alert('Failed to add course: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('An error occurred while adding the course. Please try again.');
    }
  };

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditClick = (course) => {
    setEditFormData({
      title: course.title || '',
      path: course.path || '',
      description: course.description || '',
      shortDescription: course.shortDescription || '',
      instructor: course.instructor || '',
      duration: course.duration || '',
      level: course.level || 'Beginner',
      price: course.price || '',
      originalPrice: course.originalPrice || '',
      category: course.category || '',
      syllabusDownloadLink: course.syllabusDownloadLink || '',
      enrollLink: course.enrollLink || '',
      tags: Array.isArray(course.tags) ? course.tags.join(', ') : '',
      image: course.image || '',
      requirements: Array.isArray(course.requirements) ? course.requirements.join('\n') : '',
      whatYouWillLearn: Array.isArray(course.whatYouWillLearn) ? course.whatYouWillLearn.join('\n') : '',
      isFeatured: course.isFeatured || false
    });
    setEditCourseId(course._id);
    setShowEditForm(true);
  };

  const handleSaveClick = async (courseId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ price: parseFloat(editedPrice) }),
      });

      const data = await response.json();

      if (data.success) {
        const updatedCourses = courses.map(course => {
          if (course._id === courseId) {
            return { ...course, price: parseFloat(editedPrice) };
          }
          return course;
        });
        setCourses(updatedCourses);
        setEditCourseId(null);
        setEditedPrice('');
        alert('Course updated successfully!');
      } else {
        alert('Failed to update course: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('An error occurred while updating the course. Please try again.');
    }
  };

  const handleUpdateCourse = async () => {
    try {
      // Convert comma-separated strings to arrays
      const courseData = {
        ...editFormData,
        price: parseFloat(editFormData.price) || 0,
        originalPrice: parseFloat(editFormData.originalPrice) || 0,
        tags: editFormData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        requirements: editFormData.requirements.split('\n').map(req => req.trim()).filter(req => req),
        whatYouWillLearn: editFormData.whatYouWillLearn.split('\n').map(item => item.trim()).filter(item => item)
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${editCourseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(courseData),
      });

      const data = await response.json();

      if (data.success) {
        const updatedCourses = courses.map(course => {
          if (course._id === editCourseId) {
            return { ...course, ...data.data };
          }
          return course;
        });
        setCourses(updatedCourses);
        setShowEditForm(false);
        setEditCourseId(null);
        alert('Course updated successfully!');
      } else {
        alert('Failed to update course: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating course:', error);
      alert('An error occurred while updating the course. Please try again.');
    }
  };

  const handleDeleteCourse = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/courses/${courseId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setCourses(courses.filter(course => course._id !== courseId));
          alert('Course deleted successfully!');
        } else {
          console.error('Error deleting course:', data.message);
          alert('Failed to delete course. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting course:', error);
        alert('An error occurred while deleting the course. Please try again.');
      }
    }
  };

  const handleDeleteTestimonial = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials/${testimonialId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialId));
          alert('Testimonial deleted successfully!');
        } else {
          console.error('Error deleting testimonial:', data.message);
          alert('Failed to delete testimonial. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('An error occurred while deleting the testimonial. Please try again.');
      }
    }
  };

  const handleEditTestimonialClick = (testimonial) => {
    setEditTestimonialData({
      name: testimonial.name || '',
      designation: testimonial.designation || '',
      company: testimonial.company || '',
      message: testimonial.message || '',
      rating: testimonial.rating || 5,
      image: testimonial.profilePicture || testimonial.image || ''
    });
    setEditTestimonialId(testimonial._id);
    setShowEditTestimonialForm(true);
  };

  const handleUpdateTestimonial = async () => {
    try {
      const testimonialData = {
        ...editTestimonialData,
        rating: parseInt(editTestimonialData.rating) || 5
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/testimonials/${editTestimonialId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(testimonialData),
      });

      const data = await response.json();

      if (data.success) {
        const updatedTestimonials = testimonials.map(testimonial => {
          if (testimonial._id === editTestimonialId) {
            return { ...testimonial, ...data.data };
          }
          return testimonial;
        });
        setTestimonials(updatedTestimonials);
        setShowEditTestimonialForm(false);
        setEditTestimonialId(null);
        alert('Testimonial updated successfully!');
      } else {
        alert('Failed to update testimonial: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating testimonial:', error);
      alert('An error occurred while updating the testimonial. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">
      {/* Header + Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">Manage Courses</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-300">
          + Add Course
        </button>

        {/* Popup Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="course-modal max-h-[90vh] overflow-y-auto w-full max-w-4xl bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Add New Course</h3>
                <button
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Basic Information</h4>

                  <div>
                    <label className="block text-gray-300 mb-2">Course Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Course Path *</label>
                    <input
                      type="text"
                      name="path"
                      value={formData.path}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., vapt-july-2025-batch"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Instructor *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={formData.instructor}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., 2 months"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Level *</label>
                    <select
                      name="level"
                      value={formData.level}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., Cybersecurity"
                      required
                    />
                  </div>
                </div>

                {/* Pricing and Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Pricing & Links</h4>

                  <div>
                    <label className="block text-gray-300 mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Enroll Link</label>
                    <input
                      type="url"
                      name="enrollLink"
                      value={formData.enrollLink}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Syllabus Download Link</label>
                    <input
                      type="url"
                      name="syllabusDownloadLink"
                      value={formData.syllabusDownloadLink}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="VAPT, Penetration Testing, Bug Bounty"
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Short Description *</label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Full Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Requirements (one per line)</label>
                  <textarea
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Basic understanding of computers and networking&#10;No prior hacking experience required"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">What You Will Learn (one per line)</label>
                  <textarea
                    name="whatYouWillLearn"
                    value={formData.whatYouWillLearn}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Introduction to VAPT methodology&#10;Information gathering & enumeration"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="mr-2 w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <label className="text-gray-300">Featured Course</label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-600">
                <button
                  type="button"
                  onClick={() => { setShowForm(false); resetForm(); }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300"
                >
                  Add Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Course Modal */}
        {showEditForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Edit Course</h3>
                <button
                  onClick={() => { setShowEditForm(false); setEditCourseId(null); }}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Basic Information</h4>

                  <div>
                    <label className="block text-gray-300 mb-2">Course Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={editFormData.title}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Course Path *</label>
                    <input
                      type="text"
                      name="path"
                      value={editFormData.path}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., vapt-july-2025-batch"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Instructor *</label>
                    <input
                      type="text"
                      name="instructor"
                      value={editFormData.instructor}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Duration *</label>
                    <input
                      type="text"
                      name="duration"
                      value={editFormData.duration}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., 2 months"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Level *</label>
                    <select
                      name="level"
                      value={editFormData.level}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Category *</label>
                    <input
                      type="text"
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="e.g., Cybersecurity"
                      required
                    />
                  </div>
                </div>

                {/* Pricing and Links */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-purple-400 mb-3">Pricing & Links</h4>

                  <div>
                    <label className="block text-gray-300 mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={editFormData.originalPrice}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Image URL</label>
                    <input
                      type="url"
                      name="image"
                      value={editFormData.image}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Enroll Link</label>
                    <input
                      type="url"
                      name="enrollLink"
                      value={editFormData.enrollLink}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Syllabus Download Link</label>
                    <input
                      type="url"
                      name="syllabusDownloadLink"
                      value={editFormData.syllabusDownloadLink}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
                    <input
                      type="text"
                      name="tags"
                      value={editFormData.tags}
                      onChange={handleEditInputChange}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                      placeholder="VAPT, Penetration Testing, Bug Bounty"
                    />
                  </div>
                </div>
              </div>

              {/* Full Width Fields */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Short Description *</label>
                  <textarea
                    name="shortDescription"
                    value={editFormData.shortDescription}
                    onChange={handleEditInputChange}
                    rows={2}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Full Description *</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Requirements (one per line)</label>
                  <textarea
                    name="requirements"
                    value={editFormData.requirements}
                    onChange={handleEditInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Basic understanding of computers and networking&#10;No prior hacking experience required"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">What You Will Learn (one per line)</label>
                  <textarea
                    name="whatYouWillLearn"
                    value={editFormData.whatYouWillLearn}
                    onChange={handleEditInputChange}
                    rows={4}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Introduction to VAPT methodology&#10;Information gathering & enumeration"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={editFormData.isFeatured}
                    onChange={handleEditInputChange}
                    className="mr-2 w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                  />
                  <label className="text-gray-300">Featured Course</label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-600">
                <button
                  type="button"
                  onClick={() => { setShowEditForm(false); setEditCourseId(null); }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateCourse}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300"
                >
                  Update Course
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Testimonial Modal */}
        {showEditTestimonialForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Edit Testimonial</h3>
                <button
                  onClick={() => { setShowEditTestimonialForm(false); setEditTestimonialId(null); }}
                  className="text-gray-400 hover:text-white text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={editTestimonialData.name}
                    onChange={handleEditTestimonialChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={editTestimonialData.designation}
                    onChange={handleEditTestimonialChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={editTestimonialData.company}
                    onChange={handleEditTestimonialChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="e.g., Tech Corp"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Rating *</label>
                  <select
                    name="rating"
                    value={editTestimonialData.rating}
                    onChange={handleEditTestimonialChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Profile Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={editTestimonialData.image}
                    onChange={handleEditTestimonialChange}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={editTestimonialData.message}
                    onChange={handleEditTestimonialChange}
                    rows={5}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                    placeholder="Write your testimonial message here..."
                    required
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-600">
                <button
                  type="button"
                  onClick={() => { setShowEditTestimonialForm(false); setEditTestimonialId(null); }}
                  className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateTestimonial}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition duration-300"
                >
                  Update Testimonial
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search courses..."
        style={{
          width: '70%',
          marginBottom: '1.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#18181b',
          border: '1px solid #3f3f46',
          borderRadius: '6px',
          color: 'white'
        }}
      />

      {/* Table Layout */}
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#1f2937',
        color: 'white',
        marginBottom: '2rem',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#111827' }}>
          <tr>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>S.No.</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Course Name</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Instructor</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Level</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Price (₹)</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Featured</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map((course, index) => (
            <tr key={course._id} style={{ borderBottom: '1px solid #374151' }}>
              <td style={{ padding: '12px' }}>{index + 1}</td>
              <td style={{ padding: '12px' }}>
                <div>
                  <div className="font-medium">{course.title}</div>
                  <div className="text-sm text-gray-400">{course.shortDescription || course.description?.substring(0, 50) + '...'}</div>
                </div>
              </td>
              <td style={{ padding: '12px' }}>{course.instructor || 'N/A'}</td>
              <td style={{ padding: '12px' }}>{course.category || 'N/A'}</td>
              <td style={{ padding: '12px' }}>
                <span className={`px-2 py-1 rounded text-xs ${course.level === 'Beginner' ? 'bg-green-600' :
                  course.level === 'Intermediate' ? 'bg-yellow-600' :
                    'bg-red-600'
                  }`}>
                  {course.level || 'N/A'}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                {editCourseId === course._id ? (
                  <input
                    type="number"
                    value={editedPrice}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    className="px-2 py-1 bg-zinc-700 border border-zinc-600 rounded text-white w-24"
                  />
                ) : (
                  <div>
                    <div className="font-medium">₹{course.price}</div>
                    {course.originalPrice && course.originalPrice > course.price && (
                      <div className="text-sm text-gray-400 line-through">₹{course.originalPrice}</div>
                    )}
                  </div>
                )}
              </td>
              <td style={{ padding: '12px' }}>
                <span className={`px-2 py-1 rounded text-xs ${course.isFeatured ? 'bg-purple-600' : 'bg-gray-600'}`}>
                  {course.isFeatured ? 'Featured' : 'Regular'}
                </span>
              </td>
              <td style={{ padding: '12px' }}>
                {editCourseId === course._id ? (
                  <button
                    onClick={() => handleSaveClick(course._id)}
                    style={{
                      backgroundColor: '#10b981', // Tailwind green-500
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(16, 185, 129, 0.4)',
                      transition: 'background-color 0.3s ease',
                    }}
                    className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(course)}
                    style={{
                      backgroundColor: '#f59e0b', // Tailwind yellow-500
                      color: '#fff',
                      padding: '6px 14px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(245, 158, 11, 0.4)',
                      transition: 'background-color 0.3s ease',
                      marginRight: '10px'
                    }}
                    className="text-sm bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDeleteCourse(course._id)}
                  style={{
                    backgroundColor: '#ef4444', // red-500
                    color: '#fff',
                    padding: '6px 14px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 2px 6px rgba(239, 68, 68, 0.4)',
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Testimonials Table */}
      <h2 className="text-2xl font-bold mb-4 mt-12">Testimonials</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#1f2937',
        color: 'white',
        marginBottom: '0px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <thead style={{ backgroundColor: '#111827', width: "100%" }}>
          <tr>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>S.No.</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Company</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Rating</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Message</th>
            <th style={{ padding: '12px', borderBottom: '1px solid #374151', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.length > 0 ? testimonials.map((testimonial, index) => (
            <tr key={testimonial._id} style={{ borderBottom: '1px solid #374151' }}>
              <td style={{ padding: '12px' }}>{index + 1}</td>
              <td style={{ padding: '12px' }}>
                <div className="flex items-center space-x-3">
                  {testimonial.profilePicture && (
                    <img
                      src={testimonial.profilePicture}
                      alt="profile"
                      style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name || 'User')}&background=6366f1&color=fff`;
                      }}
                    />
                  )}
                  <span className="font-medium">{testimonial.name || 'N/A'}</span>
                </div>
              </td>
              <td style={{ padding: '12px' }}>{testimonial.email || 'N/A'}</td>
              <td style={{ padding: '12px' }}>{testimonial.company || 'N/A'}</td>
              <td style={{ padding: '12px' }}>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < (testimonial.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm text-gray-400">({testimonial.rating || 0}/5)</span>
                </div>
              </td>
              <td style={{ padding: '12px', maxWidth: '300px' }}>
                <div className="text-sm text-gray-300 line-clamp-2">
                  {testimonial.message ? (
                    testimonial.message.length > 100
                      ? testimonial.message.substring(0, 100) + '...'
                      : testimonial.message
                  ) : 'No message'}
                </div>
              </td>
              <td style={{ padding: '12px' }}>
                <div className="flex space-x-2">
                  <button
                    onClick={() => alert(`Full testimonial:\n\n"${testimonial.message || 'No message'}"\n\n- ${testimonial.name || 'Anonymous'}\n${testimonial.company ? `  ${testimonial.company}` : ''}`)}
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEditTestimonialClick(testimonial)}
                    style={{
                      backgroundColor: '#f59e0b',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(testimonial._id)}
                    style={{
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#9ca3af' }}>
                No testimonials found
              </td>
            </tr>
          )}
        </tbody>

      </table>
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Enrollment Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937', // dark gray 
                  border: '1px solid #4b5563', // subtle border
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  fontSize: '14px',
                }}
                labelStyle={{
                  color: '#9ca3af', // light gray
                }}
              />

              <Bar
                dataKey="enrolled"
                fill="#38bdf8"
                radius={[8, 8, 0, 0]} // rounded corners for the top of the bars
                background={{ fill: '#374151' }} // dark gray background for the bars
                isAnimationActive={false}
                activeBar={false}
              />

            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseStats}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1f2937', // dark gray (tailwind bg-gray-800)
                  border: '1px solid #4b5563', // subtle border
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                  color: '#fff',
                  fontSize: '14px',
                }}
                labelStyle={{
                  color: '#9ca3af', // light gray
                }}
              />

              <Line type="monotone" dataKey="completion" stroke="#22c55e" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
} 