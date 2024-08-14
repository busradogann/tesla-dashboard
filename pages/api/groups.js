export default function handler(req, res) {
  res.status(200).json({ 
    content: [{
      id: 3,
      name: 'Sales Leadership',
      points: 52,
      correctRatio: 87,
      pointsIncreased: true
    }, {
      id: 1,
      name: 'Houston Facility',
      points: 52,
      correctRatio: 97,
      pointsIncreased: true
    }, {
      id: 4,
      name: 'Northeast Region',
      points: 52,
      correctRatio: null,
      pointsIncreased: true
    }, {
      id: 2,
      name: 'Test Group',
      points: 52,
      correctRatio: 95,
      pointsIncreased: false
    }]
  });
}