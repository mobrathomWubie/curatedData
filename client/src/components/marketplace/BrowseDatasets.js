// src/components/marketplace/BrowseDatasets.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDatasets, selectAllDatasets, selectDatasetStatus } from '../../features/datasets/datasetSlice';
import DatasetCard from './DatasetCard';

const BrowseDatasets = () => {
  const dispatch = useDispatch();
  const datasets = useSelector(selectAllDatasets);
  const status = useSelector(selectDatasetStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDatasets());
    }
  }, [status, dispatch]);

  return (
    <div className="browse-container">
      {status === 'loading' ? (
        <div>Loading datasets...</div>
      ) : (
        <div className="datasets-grid">
          {datasets.map(dataset => (
            <DatasetCard key={dataset._id} dataset={dataset} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseDatasets;