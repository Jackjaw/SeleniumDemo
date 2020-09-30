import '@PUBLIC/style/normalize.scss';
import ReactDOM from 'react-dom';
import MainRouter from './router';

class Main extends Component {
    componentDidCatch(err, info) {
        console.error(err);
    }
    render() {
        return <MainRouter />;
    }
}

ReactDOM.render(<Main />, document.getElementById('main'));