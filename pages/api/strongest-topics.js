export default function handler(req, res) {
  res.status(200).json({ 
    content: [{
      id: 1,
      name: 'Covid Protocols',
      image: '../../covid-protocols.svg',
      readingPercentage: 95
    }, {
      id: 2,
      name: 'Cyber Security Basics',
      image: '../../cyber-security.svg',
      readingPercentage: 92
    }, {
      id: 3,
      name: 'Social Media Policies',
      image: '../../social-media.svg',
      readingPercentage: 89
    }]
  });
}