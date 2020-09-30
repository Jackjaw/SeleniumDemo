import '@PUBLIC/style/header.scss';

export default props => (
    <header id="header">
        <h1>
            <a href={props.link || '/'} title={props.title || 'Baldyellow'}>{props.title || 'Baldyellow'}</a>
        </h1>
    </header>
);