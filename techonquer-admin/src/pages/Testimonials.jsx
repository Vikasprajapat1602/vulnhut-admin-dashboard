import React, { useState, useEffect } from 'react';

export default function Testimonials() {
  // Mock data instead of API calls
  const [testimonials, setTestimonials] = useState([
    { _id: '1', name: 'Alice Johnson', designation: 'Student', message: 'Amazing course content and great support!' },
    { _id: '2', name: 'Bob Smith', designation: 'Developer', message: 'Practical examples really helped me understand React better.' },
    { _id: '3', name: 'Charlie Brown', designation: 'Mentor', message: 'Well-structured material and responsive instructors.' }
  ]);
  const [filteredTestimonials, setFilteredTestimonials] = useState(testimonials);
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editedTestimonial, setEditedTestimonial] = useState({});
  const [newTestimonial, setNewTestimonial] = useState({ name: '', designation: '', message: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setFilteredTestimonials(testimonials);
  }, [testimonials]);

  const handleAddTestimonial = () => {
    if (!newTestimonial.name.trim() || !newTestimonial.designation.trim() || !newTestimonial.message.trim()) return;
    
    const newTestimonialWithId = {
      ...newTestimonial,
      _id: Date.now().toString() // Simple ID generation
    };
    
    setTestimonials([...testimonials, newTestimonialWithId]);
    setNewTestimonial({ name: '', designation: '', message: '' });
    setShowForm(false);
  };

  useEffect(() => {
    setFilteredTestimonials(
      testimonials.filter(testimonial =>
        testimonial.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, testimonials]);

  const handleEditClick = (testimonial, index) => {
    setEditIndex(index);
    setEditedTestimonial({ ...testimonial });
  };

  const handleSaveClick = (index) => {
    const updated = [...testimonials];
    updated[index] = { ...editedTestimonial };
    setTestimonials(updated);
    setEditIndex(null);
    setEditedTestimonial({});
  };
  
  const handleDeleteClick = (testimonialId) => {
    const filtered = testimonials.filter(t => t._id !== testimonialId);
    setTestimonials(filtered);
  };

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditedTestimonial(prev => ({ ...prev, [name]: value }));
    } else {
      setNewTestimonial(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">Manage Testimonials</h2>
        <button 
         onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: '#9333ea',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '6px',
          fontSize: '0.875rem',
          fontWeight: 600,
          transition: 'background-color 0.3s'
        }}>
          + Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 bg-gray-800 rounded-lg">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newTestimonial.name}
            onChange={handleInputChange}
            className="mr-2 mb-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            value={newTestimonial.designation}
            onChange={handleInputChange}
            className="mr-2 mb-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
           <input
            type="text"
            name="message"
            placeholder="Message"
            value={newTestimonial.message}
            onChange={handleInputChange}
            className="mr-2 mb-2 p-2 rounded border border-gray-600 bg-gray-700 text-white"
          />
          <button
            onClick={handleAddTestimonial}
            className="p-2 rounded bg-green-600 text-white font-bold"
          >
            Add
          </button>
        </div>
      )}

      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search testimonials..."
        className="w-full mb-6 p-2 bg-gray-800 border border-gray-700 rounded"
      />

      <table className="w-full border-collapse bg-gray-900 text-white mb-8 rounded-lg overflow-hidden">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 border-b border-gray-700 text-left">S.No.</th>
            <th className="p-3 border-b border-gray-700 text-left">Name</th>
            <th className="p-3 border-b border-gray-700 text-left">Designation</th>
            <th className="p-3 border-b border-gray-700 text-left">Message</th>
            <th className="p-3 border-b border-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTestimonials.map((testimonial, index) => (
            <tr key={testimonial._id} className="border-b border-gray-800">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">
                {editIndex === index ? (
                  <input type="text" name="name" value={editedTestimonial.name} onChange={(e) => handleInputChange(e, true)} className="p-1 bg-gray-700 border border-gray-600 rounded text-white w-full" />
                ) : (
                  testimonial.name
                )}
              </td>
              <td className="p-3">
                {editIndex === index ? (
                  <input type="text" name="designation" value={editedTestimonial.designation} onChange={(e) => handleInputChange(e, true)} className="p-1 bg-gray-700 border border-gray-600 rounded text-white w-full" />
                ) : (
                  testimonial.designation
                )}
              </td>
              <td className="p-3">
                {editIndex === index ? (
                  <input type="text" name="message" value={editedTestimonial.message} onChange={(e) => handleInputChange(e, true)} className="p-1 bg-gray-700 border border-gray-600 rounded text-white w-full" />
                ) : (
                  testimonial.message
                )}
              </td>
              <td className="p-3 text-center">
                {editIndex === index ? (
                  <button onClick={() => handleSaveClick(index)} className="text-sm bg-green-600 hover:bg-green-700 px-3 py-1 rounded">
                    Save
                  </button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(testimonial, index)} className="text-sm bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteClick(testimonial._id)} className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded">
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
