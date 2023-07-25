import React from 'react';

const SearchBar = ({ onSearch }) => {
  
  //when the user types in the search bar this function is called and takes in the value
  //it then calls the onsearch function
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
