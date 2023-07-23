import React from 'react';

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    onSearch(searchTerm);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by description"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
