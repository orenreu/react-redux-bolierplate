/**
 * Created by Benzo Media.
 * http://www.benzomedia.com
 * User: Oren Reuveni
 * Date: 06/07/2016
 * Time: 11:55
 */

import React from 'react'
import Dropzone from 'react-dropzone'
import CircularProgress from 'material-ui/CircularProgress';

class FileUpload extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            style: {background:`url("/images/dropImage.png") center center no-repeat`}
        }

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.preview == null){
            this.setState({
                style: {background:`url("/images/dropImage.png") center center no-repeat`}
            })
        } else {
            this.setState({
                style: {background:`url(${nextProps.preview}) center center / contain no-repeat`}
            })
        }
    }

    componentWillMount(){
        if(this.props.preview == null){
            this.setState({
                style: {background:`url("/images/dropImage.png") center center no-repeat`}
            })
        } else {
            this.setState({
                style: {background:`url(${this.props.preview}) center center / contain  no-repeat`}
            })
        }
    }
    render() {

        return (
            <div>
                <Dropzone className="dropzone" ref="dropzone" onDrop={this.props.onDrop} style={this.state.style}>
                    {this.props.imageLoading ?<div className="image-loading-div"><CircularProgress /></div>: null}
                </Dropzone>
            </div>
        );
    }
};

export default FileUpload;