export default function handler(req, res) {
  res.status(200).json({ 
    content: [{
      id: 1,
      name: 'Jesse Thomas',
      image: 'jesse.png',
      points: 637,
      correctRatio: 98,
      pointsIncreased: true
    }, {
      id: 2,
      name: 'Thisal Mathiyazhagan',
      image: 'thisal.png',
      points: 637,
      correctRatio: 89,
      pointsIncreased: false
    }, {
      id: 3,
      name: 'Lura Silverman',
      image: 'lura.png',
      points: 637,
      correctRatio: null,
      pointsIncreased: true
    }, {
      id: 4,
      name: 'Helen Chuang',
      image: 'helen.png',
      points: 637,
      correctRatio: 88,
      pointsIncreased: true
    }]
  });
}