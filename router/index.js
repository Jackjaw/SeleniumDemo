import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import Main from '../page/main';

const MainRouter = () => (
    <Router>
        <Switch>
            <Route path="/" component={Main} />
            <Route component={Nothing} />
        </Switch>
    </Router>
);
export default MainRouter;