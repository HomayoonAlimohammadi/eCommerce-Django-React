import Header from './components/Header.js'
import Footer from './components/Footer.js'
import {Container} from 'react-bootstrap'


function App() {
  return (
    <div className="App">
      <Header />
      <Container>
      <main className='py-3'>
          <h1>ProShop</h1>
      </main>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
