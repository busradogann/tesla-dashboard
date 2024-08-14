export default function handler(req, res) {
  res.status(200).json({ 
    content: [{
      id: 1,
      name: 'Food Safety',
      image: '../../food-safety.svg',
      readingPercentage: 74
    }, {
      id: 2,
      name: 'Compliance Basics Procedures',
      image: '../../basic-procedures.svg',
      readingPercentage: 52
    }, {
      id: 3,
      name: 'Company Networking',
      image: '../../company-networking.svg',
      readingPercentage: 36,
      subject: 'technology'
    }, { 
      id: 4,
      name: 'Food Safety',
      image: '../../food-safety.svg',
      readingPercentage: 74
    }, {
      id: 5,
      name: 'Compliance Basics Procedures',
      image: '../../basic-procedures.svg',
      readingPercentage: 52
    }, {
      id: 6,
      name: 'Company Networking',
      image: '../../company-networking.svg',
      readingPercentage: 36,
      subject: 'technology'
    }, {      
      id: 7,
      name: 'Food Safety',
      image: '../../food-safety.svg',
      readingPercentage: 74
    }, {
      id: 8,
      name: 'Compliance Basics Procedures',
      image: '../../basic-procedures.svg',
      readingPercentage: 52
    }, {
      id: 9,
      name: 'Company Networking',
      image: '../../company-networking.svg',
      readingPercentage: 36,
      subject: 'technology'
    }]
  });
}