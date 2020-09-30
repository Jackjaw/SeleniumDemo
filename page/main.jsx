import Header from '@PUBLIC/component/header';
import Footer from '@PUBLIC/component/footer';
import '@PUBLIC/style/common.scss';

const TITLE = 'Selenium Test Demo';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: document.title
        };
    }
    componentDidMount() {
        this.setTitle(TITLE);
    }
    setTitle(title) {
        document.title = title;
        this.setState({
            title
        });
    }
    render() {
        return <>
            <Header />
            <main>
                <section>{ this.state.title }</section>
            </main>
            <Footer />
        </>;
    }
}