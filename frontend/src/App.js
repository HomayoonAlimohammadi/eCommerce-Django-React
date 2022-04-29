import Header from './components/Header.js'
import Footer from './components/Footer.js'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen.js'


function App() {
  return (
    <div className="App">
      <Header />
      <Container>
      <main className='py-3'>
          <HomeScreen />
      </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
