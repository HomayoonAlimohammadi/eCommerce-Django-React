import Header from './components/Header.js'
import Footer from './components/Footer.js'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import {BrowserRouter as Router,
        Route,
        Routes
      } from 'react-router-dom'


function App() {
  return (
    <Router>
        <Header />
          <main className='py-3'>
            <Container>
              <Routes>
                <Route exact path='/' element={<HomeScreen />} />
                <Route path='/products/:id' element={<ProductScreen />} />
              </Routes>
            </Container>
          </main>
        <Footer />
    </Router>
  );
}

export default App;
