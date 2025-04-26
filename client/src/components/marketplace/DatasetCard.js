import React from 'react';
import { Link } from 'react-router-dom';

const DatasetCard = ({ dataset }) => {
  return (
    <div className="dataset-card">
      <Link to={`/datasets/${dataset._id}`}>
        <h3>{dataset.title}</h3>
        <p>{dataset.description.substring(0, 100)}...</p>
        <span className={`price ${dataset.price === 0 ? 'free' : 'paid'}`}>
          {dataset.price === 0 ? 'FREE' : `$${dataset.price}`}
        </span>
      </Link>
    </div>
  );
};

export default DatasetCard;