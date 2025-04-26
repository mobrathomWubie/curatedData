// src/components/Admin/AdminDatasets.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchAdminDatasets,
  selectAdminDatasets,
  selectAdminDatasetStatus,
  selectAdminDatasetError
} from '../../features/datasets/datasetSlice';

const AdminDatasets = () => {
  const dispatch = useDispatch();
  const datasets = useSelector(selectAdminDatasets);
  const status = useSelector(selectAdminDatasetStatus);
  const error = useSelector(selectAdminDatasetError);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === 'admin' && status === 'idle') {
      dispatch(fetchAdminDatasets());
    }
  }, [dispatch, status, user]);

  if (user?.role !== 'admin') {
    return (
      <div className="alert alert-danger">
        You don't have permission to view this page
      </div>
    );
  }

  if (status === 'loading') {
    return <div className="text-center py-5">Loading datasets...</div>;
  }

  if (status === 'failed') {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="admin-datasets">
      <h2>Dataset Management</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset) => (
              <tr key={dataset._id}>
                <td>{dataset.title}</td>
                <td>{dataset.category}</td>
                <td>{dataset.price === 0 ? 'FREE' : `$${dataset.price}`}</td>
                <td>
                  <span className={`badge ${dataset.isApproved ? 'bg-success' : 'bg-warning'}`}>
                    {dataset.isApproved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td>{dataset.downloads || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDatasets;