import Card from './Card'
import UserInfo from './UserInfo'

function App() {
  return (
    <div>
      <h1>Моя первая React-структура</h1>
      <Card>
        <UserInfo name="Антон Сергеенков" profession="Старший фронтенд-разработчик" />
      </Card>
      
      <Card>
        <UserInfo name="Мария" profession="Студент" />
      </Card>
    </div>
  );
}

export default App;