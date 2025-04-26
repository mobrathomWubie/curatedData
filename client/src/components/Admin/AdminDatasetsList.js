import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminDatasets } from '../../features/datasets/datasetSlice';

const AdminDatasets = () => {
  const dispatch = useDispatch();
  const datasets = useSelector(state => state.datasets.adminItems);
  const status = useSelector(state => state.datasets.adminStatus);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAdminDatasets());
    }
  }, [status, dispatch]);

  return (
    <div className="admin-datasets">
      <h2>Admin Datasets</h2>
      {status === 'loading' ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {datasets.map(dataset => (
            <li key={dataset._id}>
              <h3>{dataset.title}</h3>
              <p>Status: {dataset.isApproved ? 'Approved' : 'Pending'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDatasets;