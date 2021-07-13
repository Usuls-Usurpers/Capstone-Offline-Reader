import React, {Component} from 'react'
import { connect } from 'react-redux'
import {addArticleByURL} from '../store/articles'

class URLForm extends Component {
    constructor (props){
        super(props)
        this.state = {
            URL:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    async handleSubmit (event) {
        event.preventDefault()
        console.log(this.state.URL)
        console.log('handlesubmit', this.props)
        await this.props.addArticleByURL(this.state.URL)
        this.setState({URL:''})
    }
    render() {
        const {URL} =  this.state
        return (
            <div className="add-div" >
                <h3>Save an Article</h3>
                <form className="add-form" onSubmit={this.handleSubmit}>
                    <label htmlFor="URL">URL</label>
                    <input name="URL" onChange={this.handleChange} value={URL} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, { history }) => {
    return {
        addArticleByURL: (URL) => dispatch(addArticleByURL(URL, history))
    }
}
export default connect(null, mapDispatchToProps)(URLForm)

