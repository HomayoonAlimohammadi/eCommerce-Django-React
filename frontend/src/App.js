import Header from './components/Header.js'
import Footer from './components/Footer.js'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen.js'
import ProductScreen from './screens/ProductScreen.js'
import CartScreen from './screens/CartScreen.js'
import LoginScreen from './screens/LoginScreen.js'
import RegisterScreen from './screens/RegisterScreen.js'
import ProfileScreen from './screens/ProfileScreen.js'
import ShippingScreen from './screens/ShippingScreen.js'
import PaymentScreen from './screens/PaymentScreen.js'
import PlaceOrderScreen from './screens/PlaceOrderScreen.js'
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
                <Route path='/login' element={<LoginScreen />} />
                <Route path='/register' element={<RegisterScreen />} />
                <Route path='/profile' element={<ProfileScreen />} />
                <Route path='/shipping' element={<ShippingScreen />} />
                <Route path='/payment' element={<PaymentScreen />} />
                <Route path='/product/:id' element={<ProductScreen />} />
                <Route path='/cart/:id' element={<CartScreen />} />
                <Route path='/cart' element={<CartScreen />} />
                <Route path='/placeorder' element={<PlaceOrderScreen />} />
              </Routes>
            </Container>
          </main>
        <Footer />
    </Router>
  );
}

export default App;
