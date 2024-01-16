import './App.css'
import Autocomplete from './components/autoComplete'

function App() {
  return (
    <div className='App'>
      <div className='title'>Pick User</div>
      <div className='inputbox'>
        <Autocomplete
          options={[
            {
              img: 'https://icons8.com/icon/52539/github',
              name: 'Deepak',
              id: 31311,
            },
            {
              img: 'https://icons8.com/icon/4Z2nCrz5iPY2/github',
              name: 'Ankit',
              id: 31312,
            },
            {
              img: 'https://icons8.com/icon/52539/github',
              name: 'Yogi',
              id: 31313,
            },
            {
              img: 'https://icons8.com/icon/4Z2nCrz5iPY2/github',
              name: 'Bupinder Jogi',
              id: 31314,
            },
            {
              img: 'https://icons8.com/icon/52539/github',
              name: 'Raj',
              id: 31315,
            },
            {
              img: 'https://icons8.com/icon/4Z2nCrz5iPY2/github',
              name: 'Ravi',
              id: 31316,
            },
            {
              img: 'https://icons8.com/icon/52539/github',
              name: 'Rajesh',
              id: 31317,
            },
            {
              img: 'https://icons8.com/icon/4Z2nCrz5iPY2/github',
              name: 'Rakesh',
              id: 31318,
            },
            {
              img: 'https://icons8.com/icon/52539/github',
              name: 'Jhon Sena',
              id: 31319,
            },
            {
              img: 'https://icons8.com/icon/4Z2nCrz5iPY2/github',
              name: 'Song Jun Ho',
              id: 31320,
            },
            {
              img: 'https://icons8.com/icon/52539/github',
              name: 'Tess',
              id: 31321,
            },
            {
              img: 'https://icons8.com/icon/4Z2nCrz5iPY2/github',
              name: 'Arthur',
              id: 31322,
            },
            {
              img: 'https://icons8.com/icon/4Z2nCrz5iPY2/github',
              name: 'Sanjiv',
              id: 31323,
            },
          ]}
        />
      </div>
    </div>
  )
}

export default App
