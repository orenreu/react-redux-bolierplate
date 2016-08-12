/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 14/06/2016
 * Time: 15:35
 */
var React = require('react');
import Message from './Message';



class Main extends React.Component {

    componentWillMount() {
        this.props.getUser()
    }

    render() {
        return (
            <div className="main-container">
                <div>
                    {React.cloneElement(this.props.children, {...this.props})}
                </div>
            </div>
        );
    }
}


export default Main;