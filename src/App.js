import { Fragment } from 'react';
import { Layout } from 'antd';
import BookGrid from './component/BookGrid';
import SearchBar from './component/SearchBar';
import store from "./store/index";
import { Provider } from 'react-redux';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Provider store={store}>
      <Layout>
        <Header style={{background: "#3b5998", color: "white", fontSize: 25}}>Library System</Header>
        <Content>
          <SearchBar></SearchBar>
          <BookGrid></BookGrid>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Provider>
  );
}

export default App;
