import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
const App = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filters, setFilters] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterText, setFilterText] = useState('');
  const [selectedFiltersMap, setSelectedFiltersMap] = useState({});
  useEffect(() => {
    fetchLogs();
  }, []);

  //fetch all logs
  const fetchLogs = async () => {
    try {
      const response = await axios.get('https://localhost:3000/logs');
      setLogs(response.data);
      setFilteredLogs(response.data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const addFilter = () => {
    if (selectedFilter !== '' && filterText !== '') {
      setSelectedFiltersMap({
        ...selectedFiltersMap,
        [selectedFilter]: filterText
      });
      setFilters([...filters, selectedFilter]);
      setSelectedFilter('');
      setFilterText('');
    }
  };

  // Function to apply filters
  const applyFilters = () => {

    const isMatching = (obj) => {
      for (const filter of filters) {
        if (
          !obj.hasOwnProperty(filter) ||
          obj[filter].toLowerCase().indexOf(selectedFiltersMap[filter].toLowerCase()) === -1
        ) {
          return false;
        }
      }
      return true;
    };

    // Filter the data array based on the selected filters
    const filteredData = logs.filter(isMatching);
    setFilteredLogs(filteredData);
  };

  // Function to clear filters
  const clearFilters = () => {
    setSelectedFiltersMap({});
    setFilters([]);
  };


  
  const getLogLevelColor = (level) => {
    switch (level) {
      case 'error':
        return 'text-red-600';
      case 'success':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-black';
    }
  };


  return (
    <div className="p-4">
      <div className="flex space-x-4 mb-4">
        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md"
        >
          <option value="">Select Filter</option>
         
          <option value="level">Level</option>
          <option value="message">Message</option>
          <option value="resourceId">Resource ID</option>
          <option value="timestamp">Timestamp</option>
          <option value="traceId">Trace ID</option>
          <option value="commit">Commit</option>
          <option value="spanId">Span ID</option>
          <option value="parentResourceId">Parent Resource ID</option>

        </select>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md flex-1"
          placeholder="Enter text..."
        />
        <button
          onClick={addFilter}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Filter
        </button>
      </div>

      {/* Display added filters and their corresponding text */}
      <div className="flex flex-wrap mb-4 space-x-2">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="bg-gray-200 px-3 py-1 rounded-md flex items-center"
          >
            {filter}: {selectedFiltersMap[filter]}
          </div>
        ))}
      </div>

      {/* Apply and Clear Filter Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={applyFilters}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Clear Filters
        </button>
      </div>
      {/*display filtered logs*/}
      <div>
        <h2 className="text-xl font-bold">Filtered Logs</h2>
        {filteredLogs.map((log, index) => (
          <div
            key={index}
            className={`border border-gray-300 p-3 m-3 rounded-md ${getLogLevelColor(log.level)}`}
          >
          <div className="space-y-2">
          <p>
            <span className="mr-2"><strong>Level:</strong> {log.level}</span>
            <span className="mr-2"><strong>Message:</strong> {log.message}</span>
          </p>
          <p>
            <span className="mr-2"><strong>Resource ID:</strong> {log.resourceId}</span>
            <span className="mr-2"><strong>Span ID:</strong> {log.spanId}</span>
            <span className="mr-2"><strong>Trace ID:</strong> {log.traceId}</span>
          </p>
          <p>
            <span className="mr-2"><strong>Timestamp:</strong> {log.timestamp}</span>
            <span className="mr-2"><strong>Commit:</strong> {log.commit}</span>
            <span className="mr-2"><strong>Parent Span ID:</strong> {log.metadata.parentResourceId}</span>
          </p>
          </div> 
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
