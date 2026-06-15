import React, { useState, useEffect, useContext } from 'react';
import { Card, Container, Row, Col, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Variety.css';
import Banner2 from '../../assets/banner.jpg';
import Header from '../header/index';
import Footer from '../footer/index';
import Gala from '../../assets/gala.png';
import Granny from '../../assets/granny.png';
import Honey from '../../assets/honeycrisp.png';
import Galacard from '../../assets/gala-card.jpg';
import Grannycard from '../../assets/granny-card.jpg';
import Honeycard from '../../assets/honey-card.jpg';
import AppleDetail from './AppleDetail';
import Fujicard from '../../assets/fuji-card.jpg';
import Goldencard from '../../assets/golden-card.png';
import McIntoshcard from '../../assets/McIntosh-card.png';
import { ThemeContext } from '../../contexts/ThemeContext'; // Ensure this path is correct

const Variety = () => {
  const [selectedApple, setSelectedApple] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { theme } = useContext(ThemeContext); // Get the current theme

  const appleCards = [
    { id: 1, name: 'Honey Crisp', variety_id: 'honey_crisp', image: Honeycard },
    { id: 2, name: 'Granny Smith', variety_id: 'granny_smith', image: Grannycard },
    { id: 3, name: 'Gala', variety_id: 'gala', image: Galacard },
    { id: 4, name: 'Fuji', variety_id: 'fuji', image: Fujicard },
    { id: 5, name: 'Golden', variety_id: 'golden', image: Goldencard },
    { id: 6, name: 'McIntosh', variety_id: 'mcintosh', image: McIntoshcard },
    // Additional cards
  ];

  const mostViewedApples = [
    { id: 1, name: 'Gala', type: 'Dessert', variety_id: 'gala', image: Gala },
    { id: 2, name: 'Granny Smith', type: 'Cooking', variety_id: 'granny_smith', image: Granny },
    { id: 3, name: 'Fuji', type: 'Snack', variety_id: 'fuji', image: Honey }, // Replace with Fuji image if available
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mostViewedApples.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [mostViewedApples.length]);

  const handleAppleClick = async (appleName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/apples/${appleName}`);
      const data = await response.json();
      setSelectedApple(data[0]);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching apple details:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => prevIndex === 0 ? mostViewedApples.length - 1 : prevIndex - 1);
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mostViewedApples.length);
  };

  // Define card title styles based on the theme
  const cardTitleStyle = {
    color: theme === 'light' ? '#000000' : '#ffffff',
  };

  return (
    <div className='variety-container'>
      <div className='banner'>
        <Header />
        <img src={Banner2} alt='Apple Banner' className='banner-image' />
        <div className='banner-text'>
          Discover the Best Apple Varieties - <span>Fresh</span>, <span>Crisp</span>, and <span>Delicious</span>!
        </div>
      </div>

      <Container className='apple-cards-section'>
        <h2>Apple Varieties</h2>
        <Row>
          {appleCards.map((apple) => (
            <Col key={apple.id} xs={12} md={4} lg={3}>
              <Card className='apple-card' onClick={() => handleAppleClick(apple.variety_id)}>
                <Card.Img variant='top' src={apple.image} alt={apple.name} className='apple-image' />
                <Card.Body>
                  <Card.Title style={cardTitleStyle}>{apple.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container className='most-viewed-apples-section'>
        <h2>Find out more...</h2>
        <div className='slider-wrapper'>
          <button className='arrow-button left' onClick={handlePrevClick}>
            &lt;
          </button>
          <div className='slider'>
            {mostViewedApples.map((apple, index) => (
              <div
                key={apple.id}
                className={`slider-item ${index === currentIndex ? 'active' : 'inactive'}`}
                onClick={() => handleAppleClick(apple.variety_id)}
                style={{ display: index === currentIndex ? 'block' : 'none' }}
              >
                <img src={apple.image} alt={apple.name} className='slider-image' />
                <div className='slider-name'>{apple.name}</div>
              </div>
            ))}
          </div>
          <button className='arrow-button right' onClick={handleNextClick}>
            &gt;
          </button>
        </div>
      </Container>

      <Footer />
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Apple Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedApple && (
            <div className='apple-detail'>
              <div className='apple-detail-name'>
                <h3>{selectedApple.name}</h3>
              </div>
              <div className='apple-detail-info'>
                <div className='apple-detail-section'>
                  <h3>History:</h3>
                  <p>{selectedApple.description}</p>
                </div>
                <div className='apple-detail-section'>
                  <h3>Culinary Uses:</h3>
                  <p>{selectedApple.culinary_uses}</p>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Variety;
