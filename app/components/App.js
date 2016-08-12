/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 25/07/2016
 * Time: 12:19
 */
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import actions from '../actions'
import Main from './Main'


function mapStateToProps(state) {
    return {
        auth: state.auth,
        drawer: state.drawer,
        notifications: state.notifications,
        message: state.message,
        imageUpload: state.imageUpload,
        projectsList: state.projectsList,
        errors: state.errors
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch)
}


const App = connect(mapStateToProps, mapDispatchToProps)(Main)


export default App