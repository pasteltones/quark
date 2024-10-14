import './App.css'
import { Counter, SingleQuark, ParentComponent } from './components'

function App() {
  return (
    <>
      <h1>Hello Quark</h1>
      <div className='card'>
        <SingleQuark />
        <br />
        <hr />
        <br />
        <Counter />
      </div>
      <br />
      <hr />
      <br />
      <div className='card'>
        <ParentComponent />
      </div>
    </>
  )
}

export default App
