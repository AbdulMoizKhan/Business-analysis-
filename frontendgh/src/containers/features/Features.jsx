import React from 'react';
import Feature from '../../components/feature/Feature';
import './features.css';

const featuresData = [
  {
    title: 'Starting A New Business',
    text: 'Conducting in-depth market research on your field and the demographics of your potential clientele is an important part of crafting a business plan. This involves running surveys, holding focus groups, and researching SEO and public data.',
  },
  {
    title: 'Research Purpose',
    text: 'A Research can be conducted by many ways. Acessing the data freely can be used for research.data sets can contain records such as financial data,statistical data,demographics of specific populations,insurance data,performance measures & assessment tools. This information can be used to plan and implement various procedures and policies',
  },
  {
    title: 'Success Rate',
    text: 'Success rate is the fraction or percentage of success among a number of attempts perform a procedure or task.How is the success rate determined ?',
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">The Future is Now and You Just Need to Realize It. Step into Future Today. & Make it Happen.</h1>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
