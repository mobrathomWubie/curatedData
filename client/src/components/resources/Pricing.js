import React from 'react';
import './Pricing.css'; // Create this file for styling

const Pricing = () => {
  const pricingTiers = [
    {
      name: 'Free Tier',
      price: '$0',
      description: 'For researchers and non-profits',
      features: [
        'Access to basic datasets',
        'Limited downloads per month',
        'Community support',
        'Public domain datasets only'
      ],
      cta: 'Browse Free Datasets'
    },
    {
      name: 'Standard Tier',
      price: '$10-$50',
      description: 'For small businesses and startups',
      features: [
        'Access to premium datasets',
        'Higher download limits',
        'Priority support',
        'Commercial use license',
        'Basic data cleaning included'
      ],
      cta: 'Get Standard Access'
    },
    {
      name: 'Enterprise Tier',
      price: 'Custom',
      description: 'For large organizations',
      features: [
        'Unlimited dataset access',
        'Custom dataset requests',
        'Dedicated account manager',
        'White-glove data preparation',
        'API access available',
        'SLAs and guaranteed uptime'
      ],
      cta: 'Contact Sales'
    }
  ];

  const dataExchangeOption = {
    name: 'Data Exchange',
    description: 'Contribute to get access',
    benefits: [
      'Upload your datasets to gain credits',
      '1GB uploaded = 1 credit (varies by quality)',
      'Credits never expire',
      'Verified contributors get bonus credits'
    ]
  };

  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Dataset Pricing Plans</h1>
      <p className="pricing-subtitle">
        Affordable access to high-quality datasets for developing countries
      </p>

      <div className="pricing-tiers">
        {pricingTiers.map((tier, index) => (
          <div key={index} className={`pricing-tier ${tier.name.toLowerCase().replace(' ', '-')}`}>
            <h2>{tier.name}</h2>
            <h3>{tier.price}</h3>
            <p className="tier-description">{tier.description}</p>
            <ul>
              {tier.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="cta-button">
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="data-exchange">
        <h2>{dataExchangeOption.name}</h2>
        <p>{dataExchangeOption.description}</p>
        <h4>Benefits:</h4>
        <ul>
          {dataExchangeOption.benefits.map((benefit, i) => (
            <li key={i}>{benefit}</li>
          ))}
        </ul>
        <button className="exchange-button">
          Learn About Contribution
        </button>
      </div>

      <div className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3>What payment methods do you accept?</h3>
          <p>We accept credit cards, PayPal, and mobile money payments (M-Pesa, MTN Mobile Money, etc.).</p>
        </div>
        <div className="faq-item">
          <h3>Are there discounts for developing countries?</h3>
          <p>Yes! We offer 30% discounts for verified organizations in low-income countries.</p>
        </div>
        <div className="faq-item">
          <h3>Can I get a refund if the data doesn't meet my needs?</h3>
          <p>We offer sample downloads for all datasets. Full refunds available within 7 days if data is materially different from its description.</p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;