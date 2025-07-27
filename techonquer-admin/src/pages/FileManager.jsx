import React, { useState, useEffect } from 'react';

export default function FileManager() {
  const [files, setFiles] = useState([]);
  const [uploadFile, setUploadFile] = useState(null);
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setFiles(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      alert('Please select a file to upload');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', uploadFile);
      formData.append('description', description);
      formData.append('isPublic', isPublic.toString());
      formData.append('tags', tags);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        setFiles([data.data, ...files]);
        // Reset form
        setUploadFile(null);
        setDescription('');
        setTags('');
        setIsPublic(true);
        document.getElementById('file-input').value = '';
        alert('File uploaded successfully!');
      } else {
        alert('Failed to upload file: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/files/${fileId}`, {
          method: 'DELETE',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.success) {
          setFiles(files.filter(file => file.id !== fileId));
          alert('File deleted successfully!');
        } else {
          alert('Failed to delete file. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting file:', error);
        alert('An error occurred while deleting the file. Please try again.');
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimetype, category) => {
    if (category === 'image') return '🖼️';
    if (mimetype.includes('pdf')) return '📄';
    if (mimetype.includes('video')) return '🎥';
    if (mimetype.includes('audio')) return '🎵';
    if (mimetype.includes('text')) return '📝';
    return '📁';
  };

  const filteredFiles = files.filter(file =>
    file.originalName?.toLowerCase().includes(search.toLowerCase()) ||
    file.description?.toLowerCase().includes(search.toLowerCase()) ||
    file.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">File Manager</h2>
      </div>

      {/* Upload Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Upload New File</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Select File *</label>
              <input
                id="file-input"
                type="file"
                onChange={(e) => setUploadFile(e.target.files[0])}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="Enter file description..."
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Tags (comma separated)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
                placeholder="tag1, tag2, tag3"
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2 w-4 h-4 text-purple-600 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
              />
              <label className="text-gray-300">Make file public</label>
            </div>
            
            <button
              onClick={handleFileUpload}
              disabled={uploading}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ${
                uploading 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700'
              } text-white`}
            >
              {uploading ? 'Uploading...' : 'Upload File'}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search files by name, description, or tags..."
        className="w-full mb-6 p-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-purple-500"
      />

      {/* Files Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFiles.length > 0 ? filteredFiles.map((file) => (
          <div key={file.id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-750 transition duration-300">
            {/* File Preview */}
            <div className="mb-4 text-center">
              {file.category === 'image' ? (
                <img
                  src={file.publicUrl}
                  alt={file.originalName}
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : (
                <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center text-4xl">
                  {getFileIcon(file.mimetype, file.category)}
                </div>
              )}
              <div className="w-full h-32 bg-gray-700 rounded-lg items-center justify-center text-4xl hidden">
                {getFileIcon(file.mimetype, file.category)}
              </div>
            </div>

            {/* File Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-white truncate" title={file.originalName}>
                {file.originalName}
              </h4>
              
              <p className="text-sm text-gray-400 line-clamp-2">
                {file.description || 'No description'}
              </p>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatFileSize(file.size)}</span>
                <span className={`px-2 py-1 rounded ${file.isPublic ? 'bg-green-600' : 'bg-red-600'}`}>
                  {file.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
              
              {file.tags && file.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {file.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-600 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  {file.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-600 text-xs rounded">
                      +{file.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              <div className="text-xs text-gray-500">
                {new Date(file.createdAt).toLocaleDateString()}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => window.open(file.publicUrl, '_blank')}
                className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition duration-300"
              >
                View
              </button>
              <button
                onClick={() => window.open(file.downloadUrl, '_blank')}
                className="flex-1 py-2 px-3 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition duration-300"
              >
                Download
              </button>
              <button
                onClick={() => handleDeleteFile(file.id)}
                className="py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition duration-300"
              >
                🗑️
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-12">
            <div className="text-6xl mb-4">📁</div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No files found</h3>
            <p className="text-gray-500">Upload your first file to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
